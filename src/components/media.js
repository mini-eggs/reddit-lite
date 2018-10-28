import wigly from "wigly";
import { Component } from "wigly-class";
import Raw from "./raw";
import "./media.css";

var abs = {
  objectFit: "contain",
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "grey"
};

export default class Media  extends Component {
  mounted(el) {
    if (!this.props.media_embed.content) return;

    var frame = el.firstChild.firstChild;
    frame.style.width = "100%";
    frame.style.height = "100%";
    frame.style.position = "absolute";
    frame.style.top = "0";
    frame.style.left = "0";
  }

  isImage(str) {
    var last = str.split(".").pop();
    var rules = { jpg: true, jpeg: true, png: true, gif: true };
    return rules[last];
  }

  formatImageURL(str) {
    if (str.indexOf("imgur.com") === -1) {
      return str;
    }

    var parts = str.split(".");
    var last = parts.pop();

    return parts.join(".") + "m." + last;
  }

  render() {
    var { media_embed, url } = this.props;

    if (!media_embed.content && this.isImage(url)) {
      return (
        <div style={{ position: "relative", paddingTop: `${(9 / 16) * 100}%`, marginTop: "10px" }}>
          <img style={abs} src={this.formatImageURL(url)} />
        </div>
      );
    }

    if (!media_embed.content) {
      return;
    }

    var photo = { "imgur.com": true };

    return (
      <div style={{ position: "relative", paddingTop: `${(9 / 16) * 100}%`, marginTop: "10px" }}>
        {photo[this.props.media.type] || this.props.image ? (
          <a onclick={e => e.stopPropagation()} href={this.props.href || this.props.media.oembed.thumbnail_url}>
            <img style={abs} src={this.props.media.oembed.thumbnail_url} />
          </a>
        ) : (
          <Raw content={media_embed.content} />
        )}
      </div>
    );
  }
}
