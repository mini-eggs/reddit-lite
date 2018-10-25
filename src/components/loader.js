import { h } from "wigly-jsx";
import "./loader.css";

export default class Loader {
  render() {
    return (
      <center style={{ padding: "50px" }}>
        <div>
          <span class="icon">error_outline</span>
          <h1 style={{ marginTop: "10px" }}>Loading</h1>
        </div>
      </center>
    );
  }
}
