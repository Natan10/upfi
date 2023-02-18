import type { NextPage } from "next";

import { Header } from "../components/Header";
import { PhotoCardContainer } from "../components/PhotoCardContainer";

const Home: NextPage = () => {
  return (
    <div className="w-full min-h-screen bg-main">
      <Header />
      <PhotoCardContainer />
    </div>
  );
};

export default Home;
