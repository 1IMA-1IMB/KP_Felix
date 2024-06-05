import React, { useEffect, useState } from "react";
import Navbar from "../compontents/Navbar";
import Spinner from "../compontents/Spinner";
import Cookies from "js-cookie";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaTrash } from "react-icons/fa";
import axios from "axios";
import { motion } from "framer-motion";
import { CopyToClipboard } from "react-copy-to-clipboard";

const Game: React.FC = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(true);
  const [setupGame, setSetupGame] = useState<boolean>(false);
  const [guild, setGuild] = useState<any>({});

  const [game, setGame] = useState<any>({});

  const [gameData, setGameData] = useState({
    gameName: "Name",
    currencyName: "$",
    gameEmoji: "✨",
    gameColor: "#a855f7",
  });

  const { guildId } = useParams();

  const emojiClass =
    "text-4xl relative bottom-0 transition-all duration-200 hover:cursor-pointer hover:bottom-2";

  const navigate = useNavigate();

  const editGame = () => {
    const token = Cookies.get("token");

    axios
      .post("http://localhost:3000/editgame", { token, guildId, gameData })
      .then((res: any) => {
        if (res.data.code === 200) {
          location.reload();
        }
      })
      .catch((err: Error) => {
        console.log(err);
      });
  };

  const createGame = () => {
    const token = Cookies.get("token");

    axios
      .post("http://localhost:3000/creategame", { token, gameData, guildId })
      .then((res: any) => {
        if (res.data.code === 200) {
          location.reload();
        } else {
          console.log(res.data.message);
          navigate("/");
        }
        console.log(res.data);
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
          setSetupGame(true);
          const guild = res.data.guild;
          setGuild(guild[0]);
          setGame(res.data.game);
          setGameData({
            ...gameData,
            gameName: res.data.game.name,
            currencyName: res.data.game.currency,
            gameEmoji: res.data.game.emoji,
            gameColor: res.data.game.color,
          });
        } else if (res.data.code === 202) {
          setLoading(false);
          setSetupGame(false);
          const guild = res.data.guild;
          setGuild(guild[0]);
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
          <div className="game w-11/12 sm:w-10/12 mt-10 bg-secondarycolor rounded-xl flex flex-col justify-center">
            <div className="top w-full flex gap-5 p-5 items-center justify-between">
              <a href="/dashboard">
                <motion.div className="flex gap-1 sm:gap-2 items-center hover:cursor-pointer">
                  <FaArrowLeft color="white" size={40}></FaArrowLeft>
                  <p className="text-white text-xl sm:text-2xl mb-2 font-bold">
                    return
                  </p>
                </motion.div>
              </a>
              <div className="flex gap-2 sm:gap-5 items-center">
                <h1 className="text-white text-xl sm:text-3xl font-bold">
                  {guild.name}
                </h1>
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
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="w-full flex flex-col items-center mt-10"
                >
                  <h1 className="text-white text-center text-3xl font-semibold">
                    Welcome to your game!
                  </h1>
                  <p className="text-blue-500 text-xl font-light text-center">
                    Here you can edit your game
                  </p>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.3,
                      ease: "easeInOut",
                    }}
                    className="grid grid-cols-1 xl:grid-cols-2 xl:gap-x-20 sm:gap-y-32 gap-y-20 mt-20 place-items-center"
                  >
                    <div>
                      <h1 className="text-white text-xl mb-5">Game Name</h1>
                      <input
                        type="text"
                        className=" w-64 sm:w-96 p-4 bg-transparent border-blue-500 border-2 rounded-xl focus:outline-none text-white"
                        defaultValue={game.name}
                        onChange={(e) =>
                          setGameData({ ...gameData, gameName: e.target.value })
                        }
                      />
                    </div>
                    <CopyToClipboard
                      text={`http://localhost:5173/play/${guild.id}`}
                    >
                      <div className="url w-64 sm:w-auto h-20 border-gray-700 border-2  rounded-md text-center flex flex-col justify-center cursor-pointer">
                        <p className="text-white text-xl ">Game-URL:</p>

                        <p className=" text-sm font-extralight text-white m-2 truncate font-pixeltext ">
                          http://localhost:5173/play/{guild.id}
                        </p>
                      </div>
                    </CopyToClipboard>
                    <div className="mb-10">
                      <h1 className="text-white text-xl mb-5">Currency</h1>
                      <input
                        type="text"
                        className="w-64 sm:w-96 p-4 bg-transparent border-blue-500 border-2 rounded-xl focus:outline-none text-white"
                        defaultValue={game.currency}
                        onChange={(e) =>
                          setGameData({
                            ...gameData,
                            currencyName: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="text-center">
                      <h1 className="text-white text-2xl mb-10">
                        Current emoji: {gameData.gameEmoji}
                      </h1>
                      <div className="grid sm:grid-cols-4 grid-cols-2 sm:w-96 w-full content-center place-items-center mb-10 gap-10">
                        <h1
                          className={emojiClass}
                          onClick={() =>
                            setGameData({ ...gameData, gameEmoji: "❤️" })
                          }
                        >
                          ❤️
                        </h1>
                        <h1
                          className={emojiClass}
                          onClick={() =>
                            setGameData({ ...gameData, gameEmoji: "🌙" })
                          }
                        >
                          🌙
                        </h1>
                        <h1
                          className={emojiClass}
                          onClick={() =>
                            setGameData({ ...gameData, gameEmoji: "💰" })
                          }
                        >
                          💰
                        </h1>
                        <h1
                          className={emojiClass}
                          onClick={() =>
                            setGameData({ ...gameData, gameEmoji: "💎" })
                          }
                        >
                          💎
                        </h1>
                        <h1
                          className={emojiClass}
                          onClick={() =>
                            setGameData({ ...gameData, gameEmoji: "👑" })
                          }
                        >
                          👑
                        </h1>
                        <h1
                          className={emojiClass}
                          onClick={() =>
                            setGameData({ ...gameData, gameEmoji: "🍔" })
                          }
                        >
                          🍔
                        </h1>
                        <h1
                          className={emojiClass}
                          onClick={() =>
                            setGameData({ ...gameData, gameEmoji: "🍕" })
                          }
                        >
                          🍕
                        </h1>
                        <h1
                          className={emojiClass}
                          onClick={() =>
                            setGameData({ ...gameData, gameEmoji: "💵" })
                          }
                        >
                          💵
                        </h1>
                        <h1
                          className={emojiClass}
                          onClick={() =>
                            setGameData({ ...gameData, gameEmoji: "🥕" })
                          }
                        >
                          🥕
                        </h1>
                        <h1
                          className={emojiClass}
                          onClick={() =>
                            setGameData({ ...gameData, gameEmoji: "🍪" })
                          }
                        >
                          🍪
                        </h1>
                        <h1
                          className={emojiClass}
                          onClick={() =>
                            setGameData({ ...gameData, gameEmoji: "🥑" })
                          }
                        >
                          🥑
                        </h1>
                        <h1
                          className={emojiClass}
                          onClick={() =>
                            setGameData({ ...gameData, gameEmoji: "🍄" })
                          }
                        >
                          🍄
                        </h1>
                      </div>
                    </div>
                    <div className="text-center">
                      <h1 className="text-white text-2xl mb-10 flex">
                        Current Color:{" "}
                        <div
                          className={` w-10 h-10 relative ml-5 rounded-full`}
                          style={{ backgroundColor: `${gameData.gameColor}` }}
                        ></div>
                      </h1>
                      <div className="grid sm:grid-cols-4 sm:w-96 grid-cols-2 w-full content-center place-items-center mb-10 gap-10">
                        <div
                          className=" w-16 h-16 rounded-full bg-red-500 hover:cursor-pointer relative bottom-0 transition-all duration-300 ease-out hover:bottom-3"
                          onClick={() =>
                            setGameData({ ...gameData, gameColor: "#ef4444" })
                          }
                        ></div>
                        <div
                          className=" w-16 h-16 rounded-full bg-blue-500 hover:cursor-pointer relative bottom-0 transition-all duration-300 ease-out hover:bottom-3"
                          onClick={() =>
                            setGameData({ ...gameData, gameColor: "#3b82f6" })
                          }
                        ></div>
                        <div
                          className=" w-16 h-16 rounded-full bg-purple-500 hover:cursor-pointer relative bottom-0 transition-all duration-300 ease-out hover:bottom-3"
                          onClick={() =>
                            setGameData({ ...gameData, gameColor: "#a855f7" })
                          }
                        ></div>
                        <div
                          className=" w-16 h-16 rounded-full bg-pink-500 hover:cursor-pointer relative bottom-0 transition-all duration-300 ease-out hover:bottom-3"
                          onClick={() =>
                            setGameData({ ...gameData, gameColor: "#ec4899" })
                          }
                        ></div>
                        <div
                          className=" w-16 h-16 rounded-full bg-green-500 hover:cursor-pointer relative bottom-0 transition-all duration-300 ease-out hover:bottom-3"
                          onClick={() =>
                            setGameData({ ...gameData, gameColor: "#22c55e" })
                          }
                        ></div>
                        <div
                          className=" w-16 h-16 rounded-full bg-cyan-500 hover:cursor-pointer relative bottom-0 transition-all duration-300 ease-out hover:bottom-3"
                          onClick={() =>
                            setGameData({ ...gameData, gameColor: "#14b8a6" })
                          }
                        ></div>
                        <div
                          className=" w-16 h-16 rounded-full bg-orange-500 hover:cursor-pointer relative bottom-0 transition-all duration-300 ease-out hover:bottom-3"
                          onClick={() =>
                            setGameData({ ...gameData, gameColor: "#f97316" })
                          }
                        ></div>
                        <div
                          className=" w-16 h-16 rounded-full bg-yellow-500 hover:cursor-pointer relative bottom-0 transition-all duration-300 ease-out hover:bottom-3"
                          onClick={() =>
                            setGameData({ ...gameData, gameColor: "#eab308" })
                          }
                        ></div>
                      </div>
                    </div>
                    <div className="game-preview ">
                      <h1 className="text-white text-xl mb-5">Preview:</h1>
                      <div
                        className={`sm:w-96 sm:h-40 w-64 h-32 mb-10 flex flex-col justify-center items-center rounded-lg`}
                        style={{ backgroundColor: `${gameData.gameColor}` }}
                      >
                        <h1 className="text-[10px] text-white font-semibold relative sm:bottom-8 sm:right-32 right-20 bottom-3">
                          {gameData.gameName}
                        </h1>
                        <p className="text-xl font-light text-white">
                          You have 200 {gameData.currencyName}
                        </p>
                        <h1 className="text-4xl">{gameData.gameEmoji}</h1>
                      </div>
                    </div>
                  </motion.div>
                  <div className="flex sm:flex-row flex-col gap-10 justify-center items-center">
                    <button
                      className="sm:w-72 w-64 h-16 mb-10 bg-blue-500 text-white flex items-center justify-center mt-10 rounded-lg transition-all relative bottom-0 duration-200 hover:bg-blue-600 hover:bottom-2"
                      onClick={editGame}
                    >
                      Apply Changes
                    </button>
                    <a href={`/game/delete/${guildId}`}>
                      <button className="sm:w-72 w-64 h-16 mb-10 bg-gray-600 text-white flex items-center justify-center gap-5 mt-10 rounded-lg transition-all relative bottom-0 duration-200 hover:bg-red-500 hover:bottom-2 ">
                        <FaTrash />
                        <h1>Delete Game</h1>
                      </button>
                    </a>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="flex flex-col items-center"
                >
                  <h1 className="text-white text-2xl p-1 sm:text-3xl font-semibold text-center">
                    No game has been set up in this server
                  </h1>
                  <p className="text-blue-500 text-xl font-light text-center">
                    Set one up to get started
                  </p>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.3,
                      ease: "easeInOut",
                    }}
                    className="setup-form w-10/12 flex flex-col items-center gap-10 mt-10"
                  >
                    <input
                      type="text"
                      className=" w-11/12 sm:w-96 p-4 bg-transparent border-blue-500 border-2 rounded-xl focus:outline-none text-white"
                      placeholder="Game-Name"
                      onChange={(e) =>
                        setGameData({ ...gameData, gameName: e.target.value })
                      }
                    />
                    <input
                      type="text"
                      className="w-11/12 sm:w-96 p-4 bg-transparent border-blue-500 border-2 rounded-xl focus:outline-none text-white"
                      placeholder="Currency Name"
                      onChange={(e) =>
                        setGameData({
                          ...gameData,
                          currencyName: e.target.value,
                        })
                      }
                    />
                    <div className="flex flex-col items-center justify-center">
                      <h1 className="text-2xl text-center text-white font-semibold  sm:text-3xl">
                        Game Emoji ✨
                      </h1>
                      <p className="text-white font-thin text-center text-xl mr-2">
                        Choose an emoji for your game
                      </p>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 w-10/12 sm:w-96 content-center place-items-center mb-10 gap-10">
                      <h1
                        className={emojiClass}
                        onClick={() =>
                          setGameData({ ...gameData, gameEmoji: "❤️" })
                        }
                      >
                        ❤️
                      </h1>
                      <h1
                        className={emojiClass}
                        onClick={() =>
                          setGameData({ ...gameData, gameEmoji: "🌙" })
                        }
                      >
                        🌙
                      </h1>
                      <h1
                        className={emojiClass}
                        onClick={() =>
                          setGameData({ ...gameData, gameEmoji: "💰" })
                        }
                      >
                        💰
                      </h1>
                      <h1
                        className={emojiClass}
                        onClick={() =>
                          setGameData({ ...gameData, gameEmoji: "💎" })
                        }
                      >
                        💎
                      </h1>
                      <h1
                        className={emojiClass}
                        onClick={() =>
                          setGameData({ ...gameData, gameEmoji: "👑" })
                        }
                      >
                        👑
                      </h1>
                      <h1
                        className={emojiClass}
                        onClick={() =>
                          setGameData({ ...gameData, gameEmoji: "🍔" })
                        }
                      >
                        🍔
                      </h1>
                      <h1
                        className={emojiClass}
                        onClick={() =>
                          setGameData({ ...gameData, gameEmoji: "🍕" })
                        }
                      >
                        🍕
                      </h1>
                      <h1
                        className={emojiClass}
                        onClick={() =>
                          setGameData({ ...gameData, gameEmoji: "💵" })
                        }
                      >
                        💵
                      </h1>
                      <h1
                        className={emojiClass}
                        onClick={() =>
                          setGameData({ ...gameData, gameEmoji: "🥕" })
                        }
                      >
                        🥕
                      </h1>
                      <h1
                        className={emojiClass}
                        onClick={() =>
                          setGameData({ ...gameData, gameEmoji: "🍪" })
                        }
                      >
                        🍪
                      </h1>
                      <h1
                        className={emojiClass}
                        onClick={() =>
                          setGameData({ ...gameData, gameEmoji: "🥑" })
                        }
                      >
                        🥑
                      </h1>
                      <h1
                        className={emojiClass}
                        onClick={() =>
                          setGameData({ ...gameData, gameEmoji: "🍄" })
                        }
                      >
                        🍄
                      </h1>
                    </div>
                    <div className="flex items-center justify-center flex-col">
                      <h1 className="text-3xl text-white font-semibold text-center">
                        Game color
                      </h1>
                      <p className="text-xl font-light text-white text-center">
                        Choose a background color for your game
                      </p>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 w-10/12 sm:w-96 content-center place-items-center mb-10 gap-10">
                      <div
                        className=" w-16 h-16 rounded-full bg-red-500 hover:cursor-pointer relative bottom-0 transition-all duration-300 ease-out hover:bottom-3"
                        onClick={() =>
                          setGameData({ ...gameData, gameColor: "#ef4444" })
                        }
                      ></div>
                      <div
                        className=" w-16 h-16 rounded-full bg-blue-500 hover:cursor-pointer relative bottom-0 transition-all duration-300 ease-out hover:bottom-3"
                        onClick={() =>
                          setGameData({ ...gameData, gameColor: "#3b82f6" })
                        }
                      ></div>
                      <div
                        className=" w-16 h-16 rounded-full bg-purple-500 hover:cursor-pointer relative bottom-0 transition-all duration-300 ease-out hover:bottom-3"
                        onClick={() =>
                          setGameData({ ...gameData, gameColor: "#a855f7" })
                        }
                      ></div>
                      <div
                        className=" w-16 h-16 rounded-full bg-pink-500 hover:cursor-pointer relative bottom-0 transition-all duration-300 ease-out hover:bottom-3"
                        onClick={() =>
                          setGameData({ ...gameData, gameColor: "#ec4899" })
                        }
                      ></div>
                      <div
                        className=" w-16 h-16 rounded-full bg-green-500 hover:cursor-pointer relative bottom-0 transition-all duration-300 ease-out hover:bottom-3"
                        onClick={() =>
                          setGameData({ ...gameData, gameColor: "#22c55e" })
                        }
                      ></div>
                      <div
                        className=" w-16 h-16 rounded-full bg-cyan-500 hover:cursor-pointer relative bottom-0 transition-all duration-300 ease-out hover:bottom-3"
                        onClick={() =>
                          setGameData({ ...gameData, gameColor: "#14b8a6" })
                        }
                      ></div>
                      <div
                        className=" w-16 h-16 rounded-full bg-orange-500 hover:cursor-pointer relative bottom-0 transition-all duration-300 ease-out hover:bottom-3"
                        onClick={() =>
                          setGameData({ ...gameData, gameColor: "#f97316" })
                        }
                      ></div>
                      <div
                        className=" w-16 h-16 rounded-full bg-yellow-500 hover:cursor-pointer relative bottom-0 transition-all duration-300 ease-out hover:bottom-3"
                        onClick={() =>
                          setGameData({ ...gameData, gameColor: "#eab308" })
                        }
                      ></div>
                    </div>
                    <h1 className="text-3xl text-white font-semibold">
                      Game Preview
                    </h1>
                    <div
                      className={`sm:w-96 sm:h-40 w-64 h-32 mb-10 flex flex-col justify-center items-center rounded-lg`}
                      style={{ backgroundColor: `${gameData.gameColor}` }}
                    >
                      <h1 className="text-[10px] text-white font-semibold relative sm:bottom-8 sm:right-32 right-20 bottom-3">
                        {gameData.gameName}
                      </h1>
                      <p className="text-xl font-light text-white">
                        You have 200 {gameData.currencyName}
                      </p>
                      <h1 className="text-4xl">{gameData.gameEmoji}</h1>
                    </div>
                    <button
                      className="sm:w-72 w-10/12 h-16 mb-10 bg-blue-500 text-white flex items-center justify-center mt-10 rounded-lg transition-all relative bottom-0 duration-200 hover:bg-blue-600 hover:bottom-2"
                      onClick={createGame}
                    >
                      Create Game
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
