import { h } from "wigly-jsx";
import withRouter from "../containers/with-router";
import "./header.css";

@withRouter()
class Header {
  constructor() {
    this.state = {
      links: [
        { title: "create", component: () => import("../menu/create") },
        { title: "search", component: () => import("../menu/search") },
        { title: "menu", component: () => import("../menu/burger") }
      ],
      activeMenu: undefined,
      menu: undefined
    };
  }

  handleMenuIconClick(link) {
    return async () => {
      if (link.title === this.state.activeMenu) {
        this.onClose();
        return;
      }

      var file = await link.component();
      this.setState({ activeMenu: link.title, menu: file.default });
      document.body.style.overflow = "hidden";
    };
  }

  onClose() {
    this.setState({ activeMenu: undefined, menu: undefined });
    document.body.style.overflow = "initial";
  }

  onLogoClick() {
    this.onClose();
    this.props.router.route("/");
  }

  render() {
    var Menu = this.state.menu;

    return (
      <div>
        <header>
          <nav>
            <button onclick={this.onLogoClick}>Reddit Lite</button>
            <ul>
              {this.state.links.map(link => (
                <li onclick={this.handleMenuIconClick(link)}>
                  <button class="icon">{link.title}</button>
                </li>
              ))}
            </ul>
          </nav>
        </header>
        {Menu && <Menu close={this.onClose} />}
      </div>
    );
  }
}

export default Header;
