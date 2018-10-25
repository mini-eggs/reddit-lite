import { h } from "wigly-jsx";
import getQueryParams from "./packages/get-query-params";
import WithRouter from "./containers/with-router";
import Header from "./components/header";
import Home from "./scenes/home";

var routes = [
  { href: "/", component: () => Promise.resolve({ default: Home }) },
  { href: "/sort/:sort", component: () => Promise.resolve({ default: Home }) },
  { href: "/after/:after", component: () => Promise.resolve({ default: Home }) },
  { href: "/sort/:sort/after/:after", component: () => Promise.resolve({ default: Home }) },

  { href: "/r/:subreddit", component: () => Promise.resolve({ default: Home }) },
  { href: "/r/:subreddit/sort/:sort", component: () => Promise.resolve({ default: Home }) },
  { href: "/r/:subreddit/after/:after", component: () => Promise.resolve({ default: Home }) },
  { href: "/r/:subreddit/sort/:sort/after/:after", component: () => Promise.resolve({ default: Home }) },

  { href: "/r/:subreddit/comments/:post", component: () => import("./scenes/post") },
  { href: "/r/:subreddit/comments/:post/:slug", component: () => import("./scenes/post") },

  { href: "/u/:username", component: () => import("./scenes/user") },

  { href: "/login", component: () => import("./scenes/login") },
  { href: "/oauth/success", component: () => import("./scenes/auth") }
];

@WithRouter()
class App {
  constructor() {
    this.state = {
      component: undefined,
      params: {}
    };
  }

  mounted() {
    for (let route of routes) {
      this.props.router.on(route.href, async params => {
        this.setState({ component: undefined, params: {} });
        var file = await route.component();
        this.setState({ component: file.default, params: { ...params, ...getQueryParams() } });
      });
    }

    this.props.router.listen();
  }

  render() {
    var Scene = this.state.component;

    return (
      <main>
        <Header />
        {Scene && <Scene {...this.state.params} />}
      </main>
    );
  }
}

export default App;
