import wigly from "wigly";
// import { Component } from "wigly-class";
import "./_index.css";

export default function Create({ close }) {
  return (
    <div onclick={close} class="menu-container">
      <div onclick={e => e.stopPropagation()}>Create not yet implemented</div>
    </div>
  );
}

// export default class Create  extends Component {
//   render() {
//     return (
//       <div onclick={this.props.close} class="menu-container">
//         <div onclick={e => e.stopPropagation()}>Create not yet implemented</div>
//       </div>
//     );
//   }
// }
