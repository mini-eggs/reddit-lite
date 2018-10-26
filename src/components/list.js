import { h } from "wigly-jsx";
import reddit from "../packages/reddit";
import Loader from "./loader";
import Media from "./media";
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
            <Media href={item.permalink} image={true} {...item} />
          </div>
          <div class="item-stats">
            <div>
              <div class="icon">comment</div>
              <div style={{ marginLeft: "10px" }}>{item.num_comments}</div>
            </div>
            <div>
              <button onclick={() => alert("NOT YET IMPLEMENTED")} class="icon">
                thumb_up
              </button>
              <div style={{ margin: "0 10px" }}>{item.score}</div>
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

export class ListWithData {
  getNextURL() {
    var base = `/sort/${this.props.sortSelected}/after/${this.props.items[this.props.items.length - 1].name}`;
    return this.props.subreddit ? `/r/${this.props.subreddit}${base}` : base;
  }

  render() {
    return (
      <div class="list">
        {this.props.children}
        {this.props.loading ? (
          <Loader />
        ) : (
          <div>
            <ul>
              {this.props.items.map(item => (
                <li>
                  <ListItem item={item} />
                </li>
              ))}
            </ul>
            {this.props.next && (
              <a href={this.getNextURL()}>
                <center>
                  <Button>NEXT</Button>
                </center>
              </a>
            )}
          </div>
        )}
      </div>
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

  render() {
    return (
      <ListWithData {...this.props} {...this.state} next={true}>
        <div>
          <select oninput={this.handleSortChange} value={this.state.sortSelected}>
            {this.state.sort.map(sort => (
              <option value={sort.toLowerCase()}>{sort}</option>
            ))}
          </select>
        </div>
      </ListWithData>
    );
  }
}

export default List;
