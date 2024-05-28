import React from "react";
import Navbar from "../compontents/Navbar";

const Home: React.FC = (): JSX.Element => {
  return (
    <div>
      <Navbar />
      <h1 className="text-5xl">Home</h1>
    </div>
  );
};

export default Home;
