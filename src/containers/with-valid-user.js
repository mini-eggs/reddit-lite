import wigly from "wigly";
import { Component } from "wigly-class";
import WithUser from "./with-user";
import Login from "../scenes/login";

export default options => Child => {
  @WithUser()
  class WithValidUser extends Component {
    render() {
      delete this.props.tag; // fix in wigly later
      if (this.props.user.loggedin) {
        return <Child {...this.props} />;
      }

      return <Login />;
    }
  }

  return WithValidUser;
};
