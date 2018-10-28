import wigly from "wigly";
import { useState } from "wigly-use";
import useRouter from "../containers/use-router";
import "./header.css";

var links = [
  { title: "create", component: () => import("../menu/create") },
  { title: "search", component: () => import("../menu/search") },
  { title: "menu", component: () => import("../menu/burger") }
];

export default () => {
  var [Menu, setMenu] = useState(null);
  var [router] = useRouter();

  var handleMenuIconClick = link => async () => {
    var file = await link.component();
    if (Menu === file.default) return close();
    setMenu(file.default);
    document.body.style.overflow = "hidden";
  };

  var close = () => {
    setMenu(null);
    document.body.style.overflow = "initial";
  };

  return (
    <div>
      <header>
        <nav>
          <button onclick={() => router.route("/")}>Reddit Lite</button>
          <ul>
            {links.map(link => (
              <li onclick={handleMenuIconClick(link)}>
                <button class="icon">{link.title}</button>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      {Menu && <Menu close={close} />}
    </div>
  );
};
