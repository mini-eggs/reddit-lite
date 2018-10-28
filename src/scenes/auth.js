import wigly from "wigly";
import { Component } from "wigly-class";
import reddit from "../packages/reddit";
// import WithRouter from "../containers/with-router";
import "./auth.css";
import useMount from "../containers/use-mount";
import useRouter from "../containers/use-router";
import { useState } from "wigly-use";

function Auth({ access_token, refresh_token }) {
  var [router] = useRouter();
  var [success] = useState(!!access_token && !!refresh_token);

  useMount(() => {
    if (success) {
      reddit.setUser({ access_token, refresh_token });
    } else {
      router.route("/error");
    }
  });

  return (
    <div class="auth">
      <center style={{ padding: "50px" }}>
        <div>
          <span class="icon">error_outline</span>
          <h1 style={{ marginTop: "10px" }}>{success ? "Success" : "Failure"}</h1>
        </div>
        <a href="/">
          <span class="icon ring" style={{ marginTop: "50px", fontSize: "32px" }}>
            play_arrow
          </span>
          <span>Home</span>
        </a>
      </center>
    </div>
  );
}

// @WithRouter()
// class Auth  extends Component {
//   constructor({ access_token, refresh_token }) {
//     this.state = {
//       access_token,
//       refresh_token,
//       success: !!access_token && !!refresh_token
//     };
//   }

//   mounted() {
//     if (!this.state.success) {
//       this.props.router.route("/error");
//       return;
//     }

//     reddit.setUser(this.state);
//   }

//   render() {
//     return (
//       <div class="auth">
//         <center style={{ padding: "50px" }}>
//           <div>
//             <span class="icon">error_outline</span>
//             <h1 style={{ marginTop: "10px" }}>{this.state.success ? "Success" : "Failure"}</h1>
//           </div>
//           <a href="/">
//             <span class="icon ring" style={{ marginTop: "50px", fontSize: "32px" }}>
//               play_arrow
//             </span>
//             <span>Home</span>
//           </a>
//         </center>
//       </div>
//     );
//   }
// }

export default Auth;
