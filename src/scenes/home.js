import { h } from "wigly-jsx";
import List from "../components/list";
import "./home.css";
import WithValidUser from "../containers/with-valid-user";

@WithValidUser()
class Home {
  render() {
    return (
      <div>
        <List {...this.props} />
      </div>
    );
  }
}

export default Home;
