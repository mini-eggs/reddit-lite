import { h } from "wigly-jsx";
import "./raw.css";

export default class Raw {
  mounted(el) {
    el.innerHTML = this.props.content;
  }

  updated(el) {
    el.innerHTML = this.props.content;
  }

  render() {
    var el = this.props.el || <div />;
    return el;
  }
}
