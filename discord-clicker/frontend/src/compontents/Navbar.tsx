import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import Cookies from "js-cookie";
import axios from "axios";

const Navbar: React.FC = (): JSX.Element => {
  const [logedIn, setLogedIn] = useState<boolean>(false);

  const [user, setUser] = useState({
    username: "",
    avatar: "",
    id: "",
  });

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      axios
        .post("http://localhost:3000/users", { token })
        .then((res: any) => {
          if (res.data.user) {
            setUser({
              username: res.data.user.username,
              avatar: res.data.user.avatar,
              id: res.data.user.id,
            });
            setLogedIn(true);
          }
        })
        .catch((err: Error) => {
          console.log(err);
          Cookies.remove("token");
        });
    }
    return;
  }, []);

  return (
    <div className="nav flex items-center justify-between p-4">
      <a href="/">
        <h1 className="logo text-white font-bold text-5xl">
          Clicker <span className="italic text-blue-500">Cord</span>
        </h1>
      </a>
      <div className="links flex h-full items-center gap-10">
        <a
          href="#"
          className="text-2xl text-white hover:underline underline-offset-4"
        >
          Link1
        </a>
        <a
          href="#"
          className="text-2xl text-white hover:underline underline-offset-4"
        >
          Link2
        </a>
        <a
          href="#"
          className="text-2xl text-white hover:bg-blue-600 transition-all duration-300 ease-out w-32 rounded-lg flex items-center justify-center h-14 bg-blue-500"
        >
          Link3
        </a>
        <a
          href={
            logedIn
              ? "/dashboard"
              : "https://discord.com/oauth2/authorize?client_id=1243668312597074021&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fdiscord%2Foauth%2Fauthenticate%2F&scope=identify+connections+guilds.join+gdm.join+email+guilds+guilds.members.read"
          }
          className={
            logedIn
              ? "rounded-full overflow-hidden h-14 w-14 flex items-center justify-center"
              : "user bg-blue-500 p-1 rounded-full overflow-hidden"
          }
        >
          {logedIn ? (
            <img
              src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
              alt=""
            />
          ) : (
            <FaUser size={45} color="white" className="relative top-1" />
          )}
        </a>
      </div>
    </div>
  );
};

export default Navbar;
