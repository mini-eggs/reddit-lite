import wigly from "wigly";
import { Component } from "wigly-class";
import reddit from "../packages/reddit";

export default () => Child =>
  class WithUser extends Component {
    constructor() {
      super();
      var loggedin = !!reddit.user;

      this.state = {
        loggedin,
        details: reddit.user
      };
    }

    render() {
      delete this.props.tag; // fix in wigly later
      return <Child {...this.props} user={this.state} />;
    }
  };
