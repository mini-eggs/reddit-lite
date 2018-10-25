import { h } from "wigly-jsx";
import reddit from "../packages/reddit";
import Loader from "./loader";
import "./list.css";
import withRouter from "../containers/with-router";
import Button from "../components/button";

class ListItem {
  render() {
    var item = this.props.item;

    return (
      <a href={item.permalink}>
        <div class="item">
          <div class="item-header">
            <a href={`/r/${item.subreddit.toLowerCase()}`}>{`/r/${item.subreddit.toLowerCase()}`}</a>
            <span> - </span>
            <a href={`/u/${item.author}`}>{`/u/${item.author}`}</a>
          </div>
          <div class="item-main">
            <div>{item.title}</div>
          </div>
          <div class="item-stats">
            <div>
              <div class="icon">comment</div>
              <div style={{ marginLeft: "15px" }}>{item.num_comments}</div>
            </div>
            <div>
              <button onclick={() => alert("NOT YET IMPLEMENTED")} class="icon">
                thumb_up
              </button>
              <div style={{ margin: "0 15px" }}>{item.score}</div>
              <button onclick={() => alert("NOT YET IMPLEMENTED")} class="icon">
                thumb_down
              </button>
            </div>
          </div>
        </div>
      </a>
    );
  }
}

@withRouter()
class List {
  constructor(props) {
    this.state = {
      items: [],
      sort: ["hot", "new", "rising", "controversial", "top"],
      sortSelected: props.sort || "hot",
      loading: true
    };
  }

  mounted() {
    this.fetch();
  }

  async fetch() {
    var sort = this.state.sortSelected;
    var { subreddit, after } = this.props;
    var items = await reddit.getPage({ sort, after, subreddit });
    this.setState({ items, loading: false });
  }

  handleSortChange(event) {
    var base = `/sort/${event.target.value}`;
    var url = this.props.subreddit ? `/r/${this.props.subreddit}${base}` : base;
    this.props.router.route(url);
  }

  getNextURL() {
    var base = `/sort/${this.state.sortSelected}/after/${this.state.items[this.state.items.length - 1].name}`;
    return this.props.subreddit ? `/r/${this.props.subreddit}${base}` : base;
  }

  render() {
    return (
      <div class="list">
        <div>
          <select oninput={this.handleSortChange} value={this.state.sortSelected}>
            {this.state.sort.map(sort => (
              <option value={sort.toLowerCase()}>{sort}</option>
            ))}
          </select>
        </div>
        {this.state.loading ? (
          <Loader />
        ) : (
          <div>
            <ul>
              {this.state.items.map(item => (
                <li>
                  <ListItem item={item} />
                </li>
              ))}
            </ul>
            <a href={this.getNextURL()}>
              <Button>NEXT</Button>
            </a>
          </div>
        )}
      </div>
    );
  }
}

export default List;
