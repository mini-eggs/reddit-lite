import { h } from "wigly-jsx";
import navaid from "navaid";

var router = new navaid("/");

export default () => Component =>
  class WithRouter {
    render() {
      return <Component {...this.props} router={router} />;
    }
  };
