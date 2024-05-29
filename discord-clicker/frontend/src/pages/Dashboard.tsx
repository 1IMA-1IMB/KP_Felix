import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Navbar from "../compontents/Navbar";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = (): JSX.Element => {
  const navigate = useNavigate();

  const [guilds, setGuilds] = useState([]);

  useEffect(() => {
    const token = Cookies.get("token");

    const data = {
      token: token,
    };

    if (!token) return navigate("/");

    axios
      .post("http://localhost:3000/users", data)
      .then((res: any) => {
        if (res.data.message === "Invalid token") return navigate("/");

        console.log(res.data.message);
      })
      .catch((err: Error) => {
        console.log(err);
        Cookies.remove("token");
        navigate("/");
      });
  }, []);

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) return navigate("/");

    axios
      .post("http://localhost:3000/guilds/owned", { token })
      .then((res: any) => {
        if (res.data.guilds) {
          setGuilds(res.data.guilds);
          console.log(res.data.guilds);
        } else {
          Cookies.remove("token");
          navigate("/");
        }
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="dashboard min-h-screen w-full flex flex-col items-center">
        <h1 className="text-4xl mt-10 font-bold italic text-white">
          Dashboard
        </h1>
        <div className="w-10/12 grid grid-cols-3 gap-20 mt-20 ">
          {guilds.map((data: any, index: number) => (
            <div
              key={index}
              className=" bg-[#142D46] h-80 flex flex-col items-center justify-center rounded-xl text-center"
            >
              <img
                src={`https://cdn.discordapp.com/icons/${data.id}/${data.icon}.png`}
                alt="Imae not found"
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src =
                    "https://static-00.iconduck.com/assets.00/no-image-icon-512x512-lfoanl0w.png";
                }}
                className=" h-24 w-24 rounded-full"
              />
              <h1 className="text-white font-bold mt-5">{data.name}</h1>
              <a
                className="button bg-blue-500 w-9/12 h-12 text-white flex items-center justify-center mt-10 rounded-lg transition-all bottom-0 duration-200 hover:bg-blue-600 relative hover:bottom-2"
                href={`https://discord.com/oauth2/authorize?client_id=1243668312597074021&permissions=8&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fdiscord%2Foauth%2Fauthenticate%2F&scope=bot&guild_id=${data.id}`}
              >
                <button className="">Setup</button>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;