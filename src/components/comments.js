import "./comments.css";
import { h } from "wigly-jsx";
import Raw from "./raw";

class Comment {
  constructor() {
    this.state = { active: true };
  }

  toggleActive(event) {
    event.stopPropagation();
    event.preventDefault();
    this.setState(({ active }) => ({ active: !active }));
  }

  render() {
    var { reply } = this.props;

    return (
      <button style={{ marginLeft: "15px" }} onclick={this.toggleActive}>
        {this.state.active ? (
          <div>
            <div style={{ marginBottom: "15px" }}>
              <Raw content={reply.body_html} />
            </div>
            <div style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
              <Comments replies={reply.replies} />
            </div>
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: "15px" }}>Closed</div>
          </div>
        )}
      </button>
    );
  }
}

export default class Comments {
  render() {
    return (
      <div>
        <div>
          {this.props.replies.map((reply, index) => (
            <Comment reply={reply} />
          ))}
        </div>
      </div>
    );
  }
}
