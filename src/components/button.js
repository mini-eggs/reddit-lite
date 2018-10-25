import { h } from "wigly-jsx";
import "./button.css";

export default class BigButton {
  render() {
    return (
      <center>
        <button
          style={{
            display: "inline-block",
            margin: "25px auto",
            backgroundColor: "rgba(0,0,0,0.1)",
            padding: "10px 15px"
          }}
        >
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <span>{this.props.children}</span>
            <span style={{ marginLeft: "15px" }} class="icon">
              {this.props.icon || "arrow_forward"}
            </span>
          </div>
        </button>
      </center>
    );
  }
}
