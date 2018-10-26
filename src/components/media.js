import { h } from "wigly-jsx";
import Raw from "./raw";
import "./media.css";

export default class Media {
  mounted(el) {
    if (!this.props.media_embed.content) return;

    var frame = el.firstChild.firstChild;
    frame.style.width = "100%";
    frame.style.height = "100%";
    frame.style.position = "absolute";
    frame.style.top = "0";
    frame.style.left = "0";
  }

  render() {
    var { media_embed } = this.props;
    if (!media_embed.content) return;

    var photo = { "imgur.com": true };

    return (
      <div style={{ position: "relative", paddingTop: `${(9 / 16) * 100}%`, marginTop: "10px" }}>
        {photo[this.props.media.type] || this.props.image ? (
          <a onclick={e => e.stopPropagation()} href={this.props.href || this.props.media.oembed.thumbnail_url}>
            <img style={{ objectFit: "cover" }} src={this.props.media.oembed.thumbnail_url} />
          </a>
        ) : (
          <Raw content={media_embed.content} />
        )}
      </div>
    );
  }
}
