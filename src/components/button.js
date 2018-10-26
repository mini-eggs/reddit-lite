import { h } from "wigly-jsx";
import "./button.css";

export default class BigButton {
  render() {
    return (
      <button class="btn-container" style={this.props.style || {}}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <span>{this.props.children}</span>
          <span style={{ marginLeft: "10px" }} class="icon">
            {this.props.icon || "arrow_forward"}
          </span>
        </div>
      </button>
    );
  }
}
