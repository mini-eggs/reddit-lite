import wigly from "wigly";
import { useState } from "wigly-use";
import getQueryParams from "./packages/get-query-params";
import Header from "./components/header";
import Home from "./scenes/home";
import useRouter from "./containers/use-router";
import useMount from "./containers/use-mount";

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

function App() {
  var [state, set] = useState({ component: null, options: {} });
  var [router] = useRouter();

  useMount(() => {
    for (let route of routes) {
      router.on(route.href, async params => {
        set({ component: null, options: {} });
        var file = await route.component();
        set({ component: file.default, options: { ...params, ...getQueryParams() } });
      });
    }

    router.listen();
  }, true);

  return (
    <main>
      <Header />
      {state.component && <state.component {...state.options} />}
    </main>
  );
}

export default App;
