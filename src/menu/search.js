import wigly from "wigly";
import { useState } from "wigly-use";
import Loader from "../components/loader";
import reddit from "../packages/reddit";
import { ListWithData as List } from "../components/list";
import "./_index.css";

function Form({ oninput }) {
  var submit = event => {
    event.stopPropagation();
    event.preventDefault();
    oninput(new FormData(event.target).get("search"));
  };

  return (
    <form onsubmit={submit}>
      <div>
        <input name="search" type="text" placeholder="Search" autofocus />
        <input type="submit" value="GO" />
      </div>
    </form>
  );
}

function Search({ close }) {
  var [state, set] = useState({ component: Form, items: [] });

  var oninput = async str => {
    set({ component: Loader, items: [] });
    set({ component: List, items: await reddit.search(str) });
  };

  return (
    <div onclick={close} class="menu-container search-menu-container">
      <div onclick={e => e.stopPropagation()}>
        <state.component oninput={oninput} items={state.items} />
      </div>
    </div>
  );
}

export default Search;
