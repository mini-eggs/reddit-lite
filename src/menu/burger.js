import wigly from "wigly";
import Switch from "../components/switch";
import useOptions from "../containers/use-options";
import "./_index.css";

export default function Burger({ close }) {
  var [options, setOptions] = useOptions(opts => ({ theme: opts.theme.dark }));

  return (
    <div onclick={close} class="menu-container">
      <div onclick={e => e.stopPropagation()}>
        <ul>
          <li>
            <div>
              <Switch
                checked={options.theme}
                onchange={e => setOptions("theme", { dark: e.target.checked })}
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
