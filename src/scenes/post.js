import wigly from "wigly";
import { Component } from "wigly-class";
import reddit from "../packages/reddit";
import "./post.css";
import Loader from "../components/loader";
import Button from "../components/button";
import Media from "../components/media";
import Comments from "../components/comments";
import withValidUser from "../containers/with-valid-user";

class Link extends Component {
  render() {
    var { url, domain, subreddit } = this.props;
    if (domain.toLowerCase() === `self.${subreddit.toLowerCase()}`) return;

    return (
      <a onclick={e => e.stopPropagation()} href={url}>
        <Button icon="link" style={{ margin: "10px 0 0" }}>
          {domain}
        </Button>
      </a>
    );
  }
}

class PostContent extends Component {
  render() {
    var { item } = this.props;

    return (
      <div class="post">
        <div class="item-header">
          <a href={`/r/${item.subreddit.toLowerCase()}`}>{`/r/${item.subreddit.toLowerCase()}`}</a>
          <span> - </span>
          <a href={`/u/${item.author}`}>{`/u/${item.author}`}</a>
        </div>
        <div class="item-main">
          <div>{item.title}</div>
          <Media {...item} />
          <Link {...item} />
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
    );
  }
}

@withValidUser()
export default class Post extends Component {
  constructor() {
    super();
    this.state = { item: undefined };
  }

  mounted() {
    this.fetch();
  }

  async fetch() {
    var { post, subreddit } = this.props;
    var item = await reddit.getPost({ post, subreddit });
    this.setState({ item });
  }

  render() {
    return (
      <div>
        {this.state.item ? (
          <div>
            <PostContent item={this.state.item} />
            <div style={{ margin: "0 10px 10px 0" }}>
              <Comments replies={this.state.item.comments} />
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    );

    // if (!this.state.item) {
    // return <Loader />;
    // }

    // return <div>todo {JSON.stringify(this.state.item) || "loading"}</div>;
  }
}
