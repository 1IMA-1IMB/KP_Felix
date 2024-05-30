import React, { useEffect, useState } from "react";
import Navbar from "../compontents/Navbar";
import Spinner from "../compontents/Spinner";
import Cookies from "js-cookie";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import { motion } from "framer-motion";

const Game: React.FC = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(true);
  const [setupGame, setSetupGame] = useState<boolean>(false);
  const [guild, setGuild] = useState<any>({});

  const { guildId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");

    axios
      .post("http://localhost:3000/game", { token, guildId })
      .then((res: any) => {
        console.log(res.data);
        if (res.data.code === 200) {
          setLoading(false);
          setSetupGame(true);
          const guild = res.data.guild;
          setGuild(guild[0]);
          console.log(res.data.guild);
        } else if (res.data.code === 202) {
          setLoading(false);
          setSetupGame(false);
          const guild = res.data.guild;
          setGuild(guild[0]);
          console.log(res.data.guild);
        } else if (!res.data.code) {
          navigate("/");
        }
      })
      .catch((err: Error) => {
        console.log(err);
        navigate("/");
      });
  }, []);

  return (
    <div>
      <Navbar />
      {loading ? (
        <Spinner />
      ) : (
        <div className="min-h-screen flex flex-col items-center ">
          <div className="game w-10/12 mt-10 bg-[#121b2f] rounded-xl flex flex-col justify-center">
            <div className="top w-full flex gap-5 p-5 items-center justify-between">
              <a href="/dashboard">
                <motion.div className="flex gap-2 items-center hover:cursor-pointer">
                  <FaArrowLeft color="white" size={40}></FaArrowLeft>
                  <p className="text-white text-2xl mb-2 font-bold">return</p>
                </motion.div>
              </a>
              <div className="flex gap-5 items-center">
                <h1 className="text-white text-3xl font-bold">{guild.name}</h1>
                <img
                  src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
                  alt=""
                  className="w-14 h-14 rounded-full"
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src =
                      "https://static-00.iconduck.com/assets.00/no-image-icon-512x512-lfoanl0w.png";
                  }}
                />
              </div>
            </div>
            <div>
              {setupGame ? (
                <h1>Game</h1>
              ) : (
                <div className="flex flex-col items-center">
                  <h1 className="text-white text-3xl font-semibold">
                    No game has been set up in this server
                  </h1>
                  <p className="text-blue-500 text-xl font-light">
                    Set one up to get started
                  </p>
                  <div className="setup-form w-10/12 flex flex-col items-center gap-10 mt-10">
                    <input
                      type="text"
                      className=" w-96 p-4 bg-transparent border-blue-500 border-2 rounded-xl focus:outline-none text-white"
                      placeholder="Game-Name"
                    />
                    <input
                      type="text"
                      className="w-96 p-4 bg-transparent border-blue-500 border-2 rounded-xl focus:outline-none text-white"
                      placeholder="Currency Name"
                    />
                    <input type="" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
