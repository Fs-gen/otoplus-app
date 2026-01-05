import Login from "./Auth/Login";
import Cookies from "js-cookie";
import Home from "./Home";

const App = () => {
  const token = Cookies.get("token");

  if (!token) {
    return <Login />;
  } else {
    return <Home />;
  }
};

export default App;
