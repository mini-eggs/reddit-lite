import { h } from "wigly-jsx";
import WithUser from "./with-user";
import Login from "../scenes/login";

export default options => Component => {
  @WithUser()
  class WithValidUser {
    render() {
      if (this.props.user.loggedin) {
        return <Component {...this.props} />;
      }

      return <Login />;
    }
  }

  return WithValidUser;
};
