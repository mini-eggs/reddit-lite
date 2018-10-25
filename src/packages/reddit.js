import query from "./query";
import id from "./id";
import storage from "./storage";
import xhr from "./xhr";

class Reddit {
  constructor({ client_id, redirect_uri }) {
    this.client_id = client_id;
    this.redirect_uri = redirect_uri;
    this.randomVerificationString = id();
    this.user = storage.get("reddit-user");
  }

  getAuthURL() {
    var options = {
      client_id: this.client_id,
      response_type: "code",
      state: this.randomVerificationString,
      redirect_uri: this.redirect_uri,
      duration: "permanent",
      scope:
        "identity edit flair history modconfig modflair modlog modposts modwiki mysubreddits privatemessages read report save submit subscribe vote wikiedit wikiread"
    };

    return `https://www.reddit.com/api/v1/authorize${query(options)}`;
  }

  setUser({ access_token, refresh_token }) {
    this.user = { access_token, refresh_token };
    storage.set("reddit-user", { access_token, refresh_token });
  }

  getPage({ sort, after, subreddit }) {
    var options = { ...this.user, after };
    var url = subreddit ? `/reddit/${sort}/${subreddit}${query(options)}` : `/reddit/${sort}${query(options)}`;
    return xhr({ url, method: "get" });
  }

  getPost({ post, subreddit }) {
    var options = { ...this.user };
    return xhr({ url: `/reddit/comments/${subreddit}/${post}${query(options)}`, method: "get" });
  }
}

export default new Reddit({
  client_id: process.env.REDDIT_CLIENT_ID,
  redirect_uri: process.env.REDDIT_REDIRECT_URI
});
