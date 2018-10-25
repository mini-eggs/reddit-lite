import { h } from "wigly-jsx";
import "./_index.css";

export default class Search {
  render() {
    return (
      <div onclick={this.props.close} class="menu-container">
        <div onclick={e => e.stopPropagation()}>Search not yet implemented</div>
      </div>
    );
  }
}
