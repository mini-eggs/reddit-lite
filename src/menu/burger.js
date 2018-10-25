import { h } from "wigly-jsx";
import WithUser from "../containers/with-user";
import withRouter from "../containers/with-router";
import "./_index.css";

@WithUser()
@withRouter()
export default class Burger {
  onLoginClick() {
    this.props.close();
    this.props.router.route("/login");
  }

  onLogoutClick() {
    alert("NOT YET IMPLEMENTED");
  }

  render() {
    return (
      <div onclick={this.props.close} class="menu-container">
        <div>
          <ul>
            {this.props.user.loggedin ? (
              <li onclick={e => e.stopPropagation()}>
                <button onclick={this.onLogoutClick}>Logout</button>
              </li>
            ) : (
              <li onclick={e => e.stopPropagation()}>
                <button onclick={this.onLoginClick}>Sign up / login</button>
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  }
}
