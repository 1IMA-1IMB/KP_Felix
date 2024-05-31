import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../compontents/Navbar";
import Spinner from "../compontents/Spinner";
import { FaTrash, FaArrowLeft } from "react-icons/fa";

const Delete: React.FC = (): JSX.Element => {
  const { guildId } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(true);

  const [guild, setGuild] = useState<any>({});

  const deleteGame = () => {
    const token = Cookies.get("token");

    axios
      .post("http://localhost:3000/deletegame", { token, guildId })
      .then((res: any) => {
        if (res.data.code === 200) {
          navigate("/");
        } else {
          console.log(res.data.message);
        }
      })
      .catch((err: Error) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const token = Cookies.get("token");

    axios
      .post("http://localhost:3000/game", { token, guildId })
      .then((res: any) => {
        console.log(res.data);
        if (res.data.code === 200) {
          setLoading(false);
          const guild = res.data.guild;
          setGuild(guild[0]);
        } else if (res.data.code === 202) {
          navigate("/");
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
        <div className=" min-h-screen flex items-center flex-col">
          <div className="card h-auto w-80 bg-[#121b2f] mt-20 rounded-xl flex flex-col items-center">
            <div className="top w-full flex justify-between">
              <h1 className="text-white font-bold italic mt-4 ml-4">
                {guild.name}
              </h1>
              <img
                className="w-10 h-10 mr-4 mt-2 rounded-full"
                src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
                alt=""
              />
            </div>
            <div className="text p-4">
              <h1 className="text-center text-white font-semibold mt-5 ">
                Are you sure you want to delete this guilds game?
              </h1>
              <p className="mt-2 text-sm text-center text-white font-extralight">
                This will also delete all players progress
              </p>
            </div>
            <div className="buttons">
              <button
                onClick={deleteGame}
                className="w-72 h-16 mb-10 bg-gray-600 text-white flex items-center justify-center gap-5 mt-10 rounded-lg transition-all relative bottom-0 duration-200 hover:bg-red-500 hover:bottom-2 "
              >
                <FaTrash />
                <h1>Confirm Delete</h1>
              </button>
              <a href={`/game/guild/${guildId}`}>
                <button className="w-72 h-16 mb-3 bg-blue-500 text-white flex items-center justify-center gap-5 mt-10 rounded-lg transition-all relative bottom-0 duration-200 hover:bg-blue-600 hover:bottom-2 ">
                  <FaArrowLeft />
                  <h1>Return</h1>
                </button>
              </a>
            </div>
            <p className="text-white font-extralight text-sm mb-16">
              This action can not be undone
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Delete;
