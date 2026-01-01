import Login from "./Auth/Login";
import Cookies from "js-cookie";
import Home from "./Home";

const App = () => {
  const token = Cookies.get("token");
  if (token) {
    return <Home />;
  } else {
    return <Login />;
  }
};

export default App;
