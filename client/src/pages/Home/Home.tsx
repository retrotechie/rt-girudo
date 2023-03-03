import Stories from "../../components/Stories/Stories";
import Posts from "../../components/Posts/Posts";

import "./home.scss";

const Home = (): JSX.Element => {
  return (
    <div className="home">
      <Stories />
      <Posts />
    </div>
  );
};

export default Home;
