import { h } from "wigly-jsx";
import "./switch.css";

export default class Switch {
  render() {
    return (
      <div>
        <input type="checkbox" class="ios8-switch" id={this.props.name} {...this.props} />
        <label for={this.props.name}>{this.props.label || "no label prop"}</label>
      </div>
    );
  }
}
