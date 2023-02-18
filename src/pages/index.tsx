import type { NextPage } from "next";
import { useState } from "react";

import { Header } from "../components/Header";
import { PhotoCardContainer } from "../components/PhotoCardContainer";
import { UploadModal } from "../components/UploadModal";

const Home: NextPage = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="w-full min-h-screen bg-main">
      <Header triggerUploadPhoto={() => setVisible(true)} />
      <PhotoCardContainer />

      <UploadModal visible={visible} setVisible={setVisible} />
    </div>
  );
};

export default Home;
