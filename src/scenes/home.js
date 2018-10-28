import wigly from "wigly";
import { Component } from "wigly-class";
import List from "../components/list";
import "./home.css";
import WithValidUser from "../containers/with-valid-user";

@WithValidUser()
class Home extends Component {
  render() {
    delete this.props.tag; // fix in wigly later
    return (
      <div>
        <List {...this.props} />
      </div>
    );
  }
}

export default Home;

// export default function Home(props) {
//   return (
//     <div>
//       <List sort={props.sort} subreddit={props.subreddit} />
//     </div>
//   );
// }
