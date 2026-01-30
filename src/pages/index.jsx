import Home from "./Home";
import Landing from "./Landing";

const App = ({ tokenn }) => {
  const token = tokenn;
  if (!token) {
    return <Landing />;
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
