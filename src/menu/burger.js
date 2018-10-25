import { h } from "wigly-jsx";
import "./_index.css";
import Switch from "../components/switch";
import withOptions from "../containers/with-options";

@withOptions()
export default class Burger {
  handleThemeChange(event) {
    var dark = event.target.checked;
    var theme = this.props.options.values.theme;
    this.props.options.set("theme", { ...theme, dark });
  }

  render() {
    return (
      <div onclick={this.props.close} class="menu-container">
        <div onclick={e => e.stopPropagation()}>
          <ul>
            <li>
              <div>
                <Switch
                  checked={this.props.options.values.theme.dark}
                  oninput={this.handleThemeChange}
                  name="theme"
                  label="Night theme"
                />
              </div>
            </li>
            <li>More options coming soon</li>
            <li>More options coming soon</li>
            <li>More options coming soon</li>
            <li>More options coming soon</li>
            <li>More options coming soon</li>
            <li>More options coming soon</li>
          </ul>
        </div>
      </div>
    );
  }
}
