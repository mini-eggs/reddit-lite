import express from "express";
import "express-async-errors";
import path from "path";
import compression from "compression";
import request from "request";
import snoo from "snoowrap";

var errorHandler = (error, req, res, next) => {
  if (error.toString) error = error.toString();
  res.status(500);
  res.json({ error });
};

var creds = {
  client_id: process.env.REDDIT_CLIENT_ID,
  client_secret: process.env.REDDIT_CLIENT_SECRET,
  redirect_uri: process.env.REDDIT_REDIRECT_URI
};

var getRedditToken = (req, res) => {
  var Authorization = "Basic " + Buffer.from(creds.client_id + ":" + creds.client_secret).toString("base64");
  var headers = { Authorization };
  var body = `grant_type=authorization_code&code=${req.query.code}&redirect_uri=${creds.redirect_uri}`;

  request.post("https://www.reddit.com/api/v1/access_token", { headers, body }, (err, _, body) => {
    if (err) {
      res.redirect("/error");
      return;
    }

    try {
      var { access_token, refresh_token } = JSON.parse(body);
      if (!access_token || !refresh_token) throw new Error("No valid token.");
      res.redirect(`/oauth/success?access_token=${access_token}&refresh_token=${refresh_token}`);
    } catch (_) {
      res.redirect("/error");
    }
  });
};

var withSnoo = async (req, _, next) => {
  req.snoo = new snoo({
    userAgent: `Reddit Lite Bot ${Math.random() * 69}`,
    clientId: creds.client_id,
    clientSecret: creds.client_secret,
    refreshToken: req.query.refresh_token
  });

  next();
};

var redditAPI = new express.Router()
  .use(withSnoo)
  .get(["/hot", "/hot/:subreddit"], async (req, res) => {
    req.params.subreddit && (req.snoo = req.snoo.getSubreddit(req.params.subreddit));
    res.json(await req.snoo.getHot(req.query));
  })
  .get(["/new", "/new/:subreddit"], async (req, res) => {
    req.params.subreddit && (req.snoo = req.snoo.getSubreddit(req.params.subreddit));
    res.json(await req.snoo.getNew(req.query));
  })
  .get(["/rising", "/rising/:subreddit"], async (req, res) => {
    req.params.subreddit && (req.snoo = req.snoo.getSubreddit(req.params.subreddit));
    res.json(await req.snoo.getRising(req.query));
  })
  .get(["/controversial", "/controversial/:subreddit"], async (req, res) => {
    req.params.subreddit && (req.snoo = req.snoo.getSubreddit(req.params.subreddit));
    res.json(await req.snoo.getControversial(req.query));
  })
  .get(["/top", "/top/:subreddit"], async (req, res) => {
    req.params.subreddit && (req.snoo = req.snoo.getSubreddit(req.params.subreddit));
    res.json(await req.snoo.getTop(req.query));
  })
  .get("/comments/:subreddit/:post", async (req, res) => {
    res.json(await req.snoo.getSubmission(req.params.post).expandReplies({ limit: 0, depth: 0 }));
  })
  .get("/search", async (req, res) => {
    res.json(
      await req.snoo
        .search({ query: req.query.search, time: "month", sort: "new" })
        .fetchAll({ amount: 10, limit: 10, skipReplies: true })
    );
  });

new express()
  .use(compression())
  .get("/oauth/redirect/", getRedditToken)
  .use("/reddit", redditAPI)
  .use(errorHandler)
  .use("/", express.static(path.join(__dirname, "../dist")))
  .use("*", express.static(path.join(__dirname, "../dist")))
  .listen(process.env.PORT || 5050);
