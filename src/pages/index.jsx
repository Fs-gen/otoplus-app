import Login from "./Auth/Login";
import Cookies from "js-cookie";
import Home from "./Home";

const App = ({ tokenn }) => {
  const token = tokenn;
  if (!token) {
    return <Login />;
  } else {
    return <Home />;
  }
};

export default App;

export const getServerSideProps = (context) => {
  const { req } = context;
  const token = req.cookies.token || null;
  return {
    props: {
      tokenn: token,
    },
  };
};
