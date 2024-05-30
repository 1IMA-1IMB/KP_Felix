import React, { useEffect, useState } from "react";
import Navbar from "../compontents/Navbar";
import Spinner from "../compontents/Spinner";
import Cookies from "js-cookie";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import { motion } from "framer-motion";
import { CopyToClipboard } from "react-copy-to-clipboard";

const Game: React.FC = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(true);
  const [setupGame, setSetupGame] = useState<boolean>(false);
  const [guild, setGuild] = useState<any>({});

  const [game, setGame] = useState<any>({})

  const [gameData, setGameData] = useState({
    gameName: "Name",
    currencyName: "$",
    gameEmoji: "✨",
    gameColor: "#a855f7",
  })

  const { guildId } = useParams();

  const emojiClass = "text-4xl relative bottom-0 transition-all duration-200 hover:cursor-pointer hover:bottom-2"

  const navigate = useNavigate();

  const createGame = () => {
    const token = Cookies.get("token");

    axios
      .post("http://localhost:3000/creategame", { token, gameData, guildId})
      .then((res: any) => {
        if(res.data.code === 200) {
          location.reload()
        } else {
          console.log(res.data.message);
          navigate('/')
        }
        console.log(res.data);
      })
      .catch((err: Error) => {
        console.log(err);
      });
  }



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
            gameColor: res.data.game.color
          })
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
                <div className="w-full flex flex-col items-center mt-10">
                  <h1 className="text-white text-3xl font-semibold">Welcome to your game!</h1> 
                  <p className="text-blue-500 text-xl font-light">Here you can edit your game</p>
                  <div className="grid grid-cols-2 gap-x-60 gap-y-32 mt-20 place-items-center">
                    <div>
                      <h1 className="text-white text-xl mb-5">Game Name</h1>
                    <input type="text" className="w-96 p-4 bg-transparent border-blue-500 border-2 rounded-xl focus:outline-none text-white" defaultValue={game.name} onChange={(e) => setGameData({...gameData, gameName: e.target.value})} />
                    </div>
                    <CopyToClipboard  text={`http://localhost:5173/play/${guild.id}`}>
                      <div className="url w-auto h-20 border-gray-700 border-2  rounded-md text-center flex flex-col justify-center cursor-pointer">
                      <p className="text-white text-xl ">Game-URL:</p>

                      <p className=" text-sm font-extralight text-white m-2 font-pixeltext">http://localhost:5173/play/{guild.id}</p>
                      </div>
                  </CopyToClipboard>
                    <div className="mb-10">
                      <h1 className="text-white text-xl mb-5">Currency</h1>
                      <input type="text" className="w-96 p-4 bg-transparent border-blue-500 border-2 rounded-xl focus:outline-none text-white" defaultValue={game.currency} onChange={(e) => setGameData({...gameData, currencyName: e.target.value})} />
                    </div> 
                    <div className="text-center">
                      <h1 className="text-white text-2xl mb-10">Current emoji: {gameData.gameEmoji}</h1>
                    <div className="grid grid-cols-4 w-96 content-center place-items-center mb-10 gap-10">
                      <h1 className={emojiClass} onClick={() => setGameData({...gameData, gameEmoji: "❤️"})}>❤️</h1>
                      <h1 className={emojiClass} onClick={() => setGameData({...gameData, gameEmoji: "🌙"})}>🌙</h1>
                      <h1 className={emojiClass} onClick={() => setGameData({...gameData, gameEmoji: "💰"})}>💰</h1>
                      <h1 className={emojiClass} onClick={() => setGameData({...gameData, gameEmoji: "💎"})}>💎</h1>
                      <h1 className={emojiClass} onClick={() => setGameData({...gameData, gameEmoji: "👑"})}>👑</h1>
                      <h1 className={emojiClass} onClick={() => setGameData({...gameData, gameEmoji: "🍔"})}>🍔</h1>
                      <h1 className={emojiClass} onClick={() => setGameData({...gameData, gameEmoji: "🍕"})}>🍕</h1>
                      <h1 className={emojiClass} onClick={() => setGameData({...gameData, gameEmoji: "💵"})}>💵</h1>
                      <h1 className={emojiClass} onClick={() => setGameData({...gameData, gameEmoji: "🥕"})}>🥕</h1>
                      <h1 className={emojiClass} onClick={() => setGameData({...gameData, gameEmoji: "🙉"})}>🙉</h1>
                      <h1 className={emojiClass} onClick={() => setGameData({...gameData, gameEmoji: "🥑"})}>🥑</h1>
                      <h1 className={emojiClass} onClick={() => setGameData({...gameData, gameEmoji: "🍄"})}>🍄</h1>
                    </div>
                    </div>
                    <div className="text-center">
                      <h1 className="text-white text-2xl mb-10 flex">Current Color: <div className={` w-10 h-10 relative ml-5 rounded-full`}  style={{ backgroundColor: `${gameData.gameColor}`}}></div></h1>
                      <div className="grid grid-cols-4 w-96 content-center place-items-center mb-10 gap-10">
                      <div className=" w-16 h-16 rounded-full bg-red-500 hover:cursor-pointer relative bottom-0 transition-all duration-300 ease-out hover:bottom-3" onClick={() => setGameData({...gameData, gameColor: "#ef4444"})}></div>
                      <div className=" w-16 h-16 rounded-full bg-blue-500 hover:cursor-pointer relative bottom-0 transition-all duration-300 ease-out hover:bottom-3" onClick={() => setGameData({...gameData, gameColor: "#3b82f6"})}></div>
                      <div className=" w-16 h-16 rounded-full bg-purple-500 hover:cursor-pointer relative bottom-0 transition-all duration-300 ease-out hover:bottom-3" onClick={() => setGameData({...gameData, gameColor: "#a855f7"})}></div>
                      <div className=" w-16 h-16 rounded-full bg-pink-500 hover:cursor-pointer relative bottom-0 transition-all duration-300 ease-out hover:bottom-3" onClick={() => setGameData({...gameData, gameColor: "#ec4899"})}></div>
                      <div className=" w-16 h-16 rounded-full bg-green-500 hover:cursor-pointer relative bottom-0 transition-all duration-300 ease-out hover:bottom-3"  onClick={() => setGameData({...gameData, gameColor: "#22c55e"})}></div>
                      <div className=" w-16 h-16 rounded-full bg-cyan-500 hover:cursor-pointer relative bottom-0 transition-all duration-300 ease-out hover:bottom-3" onClick={() => setGameData({...gameData, gameColor: "#14b8a6"})}></div>
                      <div className=" w-16 h-16 rounded-full bg-orange-500 hover:cursor-pointer relative bottom-0 transition-all duration-300 ease-out hover:bottom-3" onClick={() => setGameData({...gameData, gameColor: "#f97316"})}></div>
                      <div className=" w-16 h-16 rounded-full bg-yellow-500 hover:cursor-pointer relative bottom-0 transition-all duration-300 ease-out hover:bottom-3" onClick={() => setGameData({...gameData, gameColor: "#eab308"})}></div>                    
                    </div>
                    </div>
                    <div className="game-preview ">
                      <h1 className="text-white text-xl mb-5">Preview:</h1>
                      <div className={`w-96 h-40 mb-10 flex flex-col justify-center items-center rounded-lg`} style={{ backgroundColor: `${gameData.gameColor}`}}>
                      <h1 className="text-[10px] text-white font-semibold relative bottom-8 right-32">{gameData.gameName}</h1>
                      <p className="text-xl font-light text-white">You have 200 {gameData.currencyName}</p> 
                      <h1 className="text-4xl">{gameData.gameEmoji}</h1>
                    </div>
                    </div>
                  </div>
                  <div className="">
                  <button className="w-72 h-16 mb-10 bg-blue-500 text-white flex items-center justify-center mt-10 rounded-lg transition-all relative bottom-0 duration-200 hover:bg-blue-600 hover:bottom-2">Apply Changes</button>
                  </div>
                </div>
              ) : (
                <motion.div

                initial={{ height: 0}}
                animate={{ height: 'auto'}}
                transition={{ duration: 0.5, ease: "easeInOut"}}

                
                className="flex flex-col items-center">
                  <h1 className="text-white text-3xl font-semibold">
                    No game has been set up in this server
                  </h1>
                  <p className="text-blue-500 text-xl font-light">
                    Set one up to get started
                  </p>
                  <motion.div

                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  transition={{ duration: 0.5, delay:0.3, ease: "easeInOut"}}
                  
                  className="setup-form w-10/12 flex flex-col items-center gap-10 mt-10">
                    <input
                      type="text"
                      className=" w-96 p-4 bg-transparent border-blue-500 border-2 rounded-xl focus:outline-none text-white"
                      placeholder="Game-Name"
                      onChange={(e) => setGameData({...gameData, gameName: e.target.value})}
                    />
                    <input
                      type="text"
                      className="w-96 p-4 bg-transparent border-blue-500 border-2 rounded-xl focus:outline-none text-white"
                      placeholder="Currency Name"
                      onChange={(e) => setGameData({...gameData, currencyName: e.target.value})}
                    />
                    <div className="flex flex-col items-center justify-center">
                    <h1 className="text-3xl text-white font-semibold">Game Emoji ✨</h1>
                    <p className="text-white font-thin text-center text-xl mr-2">Choose an emoji for your game</p>
                    </div>
                    <div className="grid grid-cols-4 w-96 content-center place-items-center mb-10 gap-10">
                      <h1 className={emojiClass} onClick={() => setGameData({...gameData, gameEmoji: "❤️"})}>❤️</h1>
                      <h1 className={emojiClass} onClick={() => setGameData({...gameData, gameEmoji: "🌙"})}>🌙</h1>
                      <h1 className={emojiClass} onClick={() => setGameData({...gameData, gameEmoji: "💰"})}>💰</h1>
                      <h1 className={emojiClass} onClick={() => setGameData({...gameData, gameEmoji: "💎"})}>💎</h1>
                      <h1 className={emojiClass} onClick={() => setGameData({...gameData, gameEmoji: "👑"})}>👑</h1>
                      <h1 className={emojiClass} onClick={() => setGameData({...gameData, gameEmoji: "🍔"})}>🍔</h1>
                      <h1 className={emojiClass} onClick={() => setGameData({...gameData, gameEmoji: "🍕"})}>🍕</h1>
                      <h1 className={emojiClass} onClick={() => setGameData({...gameData, gameEmoji: "💵"})}>💵</h1>
                      <h1 className={emojiClass} onClick={() => setGameData({...gameData, gameEmoji: "🥕"})}>🥕</h1>
                      <h1 className={emojiClass} onClick={() => setGameData({...gameData, gameEmoji: "🙉"})}>🙉</h1>
                      <h1 className={emojiClass} onClick={() => setGameData({...gameData, gameEmoji: "🥑"})}>🥑</h1>
                      <h1 className={emojiClass} onClick={() => setGameData({...gameData, gameEmoji: "🍄"})}>🍄</h1>
                    </div>
                    <div className="flex items-center justify-center flex-col">
                    <h1 className="text-3xl text-white font-semibold">Game color</h1>
                    <p className="text-xl font-light text-white">Choose a background color for your game</p>
                    </div>
                    <div className="grid grid-cols-4 w-96 content-center place-items-center mb-10 gap-10">
                      <div className=" w-16 h-16 rounded-full bg-red-500 hover:cursor-pointer relative bottom-0 transition-all duration-300 ease-out hover:bottom-3" onClick={() => setGameData({...gameData, gameColor: "#ef4444"})}></div>
                      <div className=" w-16 h-16 rounded-full bg-blue-500 hover:cursor-pointer relative bottom-0 transition-all duration-300 ease-out hover:bottom-3" onClick={() => setGameData({...gameData, gameColor: "#3b82f6"})}></div>
                      <div className=" w-16 h-16 rounded-full bg-purple-500 hover:cursor-pointer relative bottom-0 transition-all duration-300 ease-out hover:bottom-3" onClick={() => setGameData({...gameData, gameColor: "#a855f7"})}></div>
                      <div className=" w-16 h-16 rounded-full bg-pink-500 hover:cursor-pointer relative bottom-0 transition-all duration-300 ease-out hover:bottom-3" onClick={() => setGameData({...gameData, gameColor: "#ec4899"})}></div>
                      <div className=" w-16 h-16 rounded-full bg-green-500 hover:cursor-pointer relative bottom-0 transition-all duration-300 ease-out hover:bottom-3"  onClick={() => setGameData({...gameData, gameColor: "#22c55e"})}></div>
                      <div className=" w-16 h-16 rounded-full bg-cyan-500 hover:cursor-pointer relative bottom-0 transition-all duration-300 ease-out hover:bottom-3" onClick={() => setGameData({...gameData, gameColor: "#14b8a6"})}></div>
                      <div className=" w-16 h-16 rounded-full bg-orange-500 hover:cursor-pointer relative bottom-0 transition-all duration-300 ease-out hover:bottom-3" onClick={() => setGameData({...gameData, gameColor: "#f97316"})}></div>
                      <div className=" w-16 h-16 rounded-full bg-yellow-500 hover:cursor-pointer relative bottom-0 transition-all duration-300 ease-out hover:bottom-3" onClick={() => setGameData({...gameData, gameColor: "#eab308"})}></div>                    
                    </div>
                    <h1 className="text-3xl text-white font-semibold">Game Preview</h1>
                    <div className={`w-96 h-40 mb-10 flex flex-col justify-center items-center rounded-lg`} style={{ backgroundColor: `${gameData.gameColor}`}}>
                      <h1 className="text-[10px] text-white font-semibold relative bottom-8 right-32">{gameData.gameName}</h1>
                      <p className="text-xl font-light text-white">You have 200 {gameData.currencyName}</p> 
                      <h1 className="text-4xl">{gameData.gameEmoji}</h1>
                    </div>
                    <button className="w-72 h-16 mb-10 bg-blue-500 text-white flex items-center justify-center mt-10 rounded-lg transition-all relative bottom-0 duration-200 hover:bg-blue-600 hover:bottom-2" onClick={createGame}>Create Game</button>
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
