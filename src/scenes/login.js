import wigly from "wigly";
import { Component } from "wigly-class";
import reddit from "../packages/reddit";
import "./login.css";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      url: reddit.getAuthURL()
    };
  }

  render() {
    return (
      <div class="login">
        <center style={{ padding: "50px" }}>
          <div>
            <span class="icon">error_outline</span>
            <h1 style={{ marginTop: "10px" }}>Click below to login to your existing Reddit account.</h1>
          </div>
          <a onclick={event => event.stopPropagation()} href={this.state.url}>
            <span class="icon ring" style={{ marginTop: "50px", marginBottom: "10px", fontSize: "32px" }}>
              play_arrow
            </span>
            <span>Login</span>
          </a>
        </center>
      </div>
    );
  }
}

export default Login;
