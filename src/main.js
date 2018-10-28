import wigly from "wigly";
import { classer } from "wigly-class";
import { use } from "wigly-use";
import { apply } from "./containers/use-options";
import App from "./app";
import "./packages/reset.css";
import "./main.css";

apply();

var el = wigly.render(App, document.body, classer, use);

if (process.env.NODE_ENV !== "production" && module.hot) {
  module.hot.accept();
  module.hot.dispose(() => el.parentElement.removeChild(el));
}
