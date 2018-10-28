import wigly from "wigly";
import "./switch.css";

export default props => (
  <div>
    <input type="checkbox" class="ios8-switch" id={props.name} onchange={props.onchange} checked={props.checked} />
    <label for={props.name}>{props.label || "no label prop"}</label>
  </div>
);
