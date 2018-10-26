import { h } from "wigly-jsx";
import "./_index.css";
import Switch from "../components/switch";
import withOptions from "../containers/with-options";

@withOptions(opts => ({ theme: opts.theme.dark }))
export default class Burger {
  handleThemeChange(event) {
    this.props.options.set("theme", { dark: event.target.checked });
  }

  render() {
    return (
      <div onclick={this.props.close} class="menu-container">
        <div onclick={e => e.stopPropagation()}>
          <ul>
            <li>
              <div>
                <Switch
                  checked={this.props.theme}
                  onchange={this.handleThemeChange}
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
