import React, { useState, useEffect } from "react";
import Navbar from "../compontents/Navbar";
import Cookies from "js-cookie";
import Section1 from "../compontents/home/Section1";
import Section2 from "../compontents/home/Section2";

import axios from "axios";

const Home: React.FC = (): JSX.Element => {
  const [logedIn, setLogedIn] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      axios
        .post("http://localhost:3000/users", { token })
        .then((res: any) => {
          if (res.data.user) {
            setLogedIn(true);
          }
        })
        .catch((err: Error) => {
          console.log(err);
          Cookies.remove("token");
        });
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div className="home">
        <Section1 logedIn={logedIn} />
        <Section2 />
      </div>
    </div>
  );
};

export default Home;
