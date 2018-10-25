import { h } from "wigly-jsx";
import reddit from "../packages/reddit";
import "./post.css";
import Loader from "../components/loader";
import Comments from "../components/comments";
import withValidUser from "../containers/with-valid-user";

class PostContent {
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
    );
  }
}

@withValidUser()
export default class Post {
  constructor() {
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
            <div style={{ margin: "0 15px 15px 0" }}>
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
