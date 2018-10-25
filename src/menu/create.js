import { h } from "wigly-jsx";
import "./_index.css";

export default class Create {
  render() {
    return (
      <div onclick={this.props.close} class="menu-container">
        <div onclick={e => e.stopPropagation()}>Create not yet implemented</div>
      </div>
    );
  }
}
