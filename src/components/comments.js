import "./comments.css";
import { Component } from "wigly-class";
import wigly from "wigly";
import Raw from "./raw";

class Comment extends Component {
  constructor() {
    super();
    this.state = {
      active: true,
      arrowStyle: { transform: "rotate(90deg)" }
    };
  }

  toggleActive(event) {
    event.stopPropagation();
    event.preventDefault();
    this.setState(({ active }) => {
      var arrowStyle = active ? { transform: "rotate(0deg)" } : { transform: "rotate(90deg)" };
      return { active: !active, arrowStyle };
    });
  }

  render() {
    var { reply } = this.props;

    return (
      <div style={{ paddingLeft: "10px", paddingBottom: "10px" }}>
        <button class="comment" onclick={this.toggleActive}>
          <div>
            <div style={{}}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <button style={{ ...this.state.arrowStyle, marginRight: "5px" }} class="icon">
                  arrow_forward
                </button>
                <a href={`/u/${reply.author}`}>{`/u/${reply.author}`}</a>
              </div>
              <div class="overflow">{this.state.active && <Raw content={reply.body_html} />}</div>
            </div>
            {this.state.active && (
              <div class="reply-container" style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                <Comments replies={reply.replies} />
              </div>
            )}
          </div>
        </button>
      </div>
    );
  }
}

export default class Comments extends Component {
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
