import wigly from "wigly";
import { useState } from "wigly-use";
import reddit from "../packages/reddit";
import Loader from "./loader";
import useRouter from "../containers/use-router";
import useMount from "../containers/use-mount";
import Media from "./media";
import Button from "./button";
import "./list.css";

var ListItem = ({ item }) => (
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

export function ListWithData(props) {
  var nextURL = () => {
    var base = `/sort/${props.sort}/after/${props.items[props.items.length - 1].name}`;
    return props.subreddit ? `/r/${props.subreddit}${base}` : base;
  };

  return (
    <div class="list">
      {props.children}
      {props.loading ? (
        <Loader />
      ) : (
        <div>
          <ul>
            {props.items.map(item => (
              <li>
                <ListItem item={item} />
              </li>
            ))}
          </ul>
          {props.next && (
            <a href={nextURL()}>
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

function List({ sort = "hot", ...props }) {
  var options = ["hot", "new", "rising", "controversial", "top"];
  var [state, set] = useState({ loading: true, items: [] });
  var [router] = useRouter();

  var onSortChange = e => {
    var base = `/sort/${e.target.value}`;
    var url = props.subreddit ? `/r/${props.subreddit}${base}` : base;
    router.route(url);
  };

  useMount(async () => {
    set({ loading: false, items: await reddit.getPage({ sort, ...props }) });
  });

  return (
    <ListWithData sort={sort} subreddit={props.subreddit} {...state} next={true}>
      <select onchange={onSortChange} value={sort}>
        {options.map(item => (
          <option value={item}>{item}</option>
        ))}
      </select>
    </ListWithData>
  );
}

export default List;
