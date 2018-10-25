import { h } from "wigly-jsx";
import reddit from "../packages/reddit";

export default () => Component =>
  class WithUser {
    constructor() {
      var loggedin = !!reddit.user;

      this.state = {
        loggedin,
        details: reddit.user
      };
    }

    render() {
      return <Component {...this.props} user={this.state} />;
    }
  };
