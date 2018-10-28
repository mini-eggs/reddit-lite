import wigly from "wigly";
import { Component } from "wigly-class";
import "./raw.css";

export default class Raw  extends Component {
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
