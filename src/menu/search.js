import { h } from "wigly-jsx";
import Loader from "../components/loader";
import reddit from "../packages/reddit";
import { ListWithData as List } from "../components/list";
import "./_index.css";

class Form {
  mounted(el) {
    setTimeout(() => {
      el.focus();
    }, 1);
  }

  handleSubmit(event) {
    event.stopPropagation();
    event.preventDefault();
    this.props.withInput(new FormData(event.target).get("search"));
  }

  render() {
    return (
      <form onsubmit={this.handleSubmit}>
        <div>
          <input name="search" type="text" placeholder="Search" autofocus />
          <input type="submit" value="GO" />
        </div>
      </form>
    );
  }
}
export default class Search {
  constructor() {
    this.state = {
      component: Form,
      items: []
    };
  }

  async withInput(str) {
    this.setState({ component: Loader });
    var items = await reddit.search(str);
    this.setState({ component: List, items });
  }

  render() {
    return (
      <div onclick={this.props.close} class="menu-container search-menu-container">
        <div onclick={e => e.stopPropagation()}>
          <this.state.component withInput={this.withInput} items={this.state.items} />
        </div>
      </div>
    );
  }
}
