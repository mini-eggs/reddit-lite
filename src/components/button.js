import wigly from "wigly";
import "./button.css";

function Button(props) {
  return (
    <button class="btn-container" style={props.style || {}}>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <span>{props.children}</span>
        <span style={{ marginLeft: "10px" }} class="icon">
          {props.icon || "arrow_forward"}
        </span>
      </div>
    </button>
  );
}

export default Button;
