import { h } from "wigly-jsx";
import storage from "../packages/storage";

var past = storage.get("app-options");
var def = { theme: { dark: false } };
var current = { ...def, ...past };

export var apply = (options = current) => {
  current = options;
  var bodyClass = options.theme.dark ? "dark" : "light";
  document.body.className = bodyClass;
};

export default (f = opts => opts) => Component => {
  class WithOptions {
    constructor() {
      this.state = { options: { ...current } };
    }

    get(key) {
      return options[key];
    }

    set(key, value) {
      var options = { ...this.state.options, [key]: value };
      this.setState({ options });
      storage.set("app-options", options);
      apply(options);
    }

    render() {
      return <Component {...this.props} options={{ get: this.get, set: this.set }} {...f(this.state.options)} />;
    }
  }

  return WithOptions;
};
