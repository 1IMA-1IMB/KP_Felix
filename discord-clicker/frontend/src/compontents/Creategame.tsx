import React from "react";
import { motion } from "framer-motion";

const Creategame = (props): any => {
  const emojiClass =
    "text-4xl relative bottom-0 transition-all duration-200 hover:cursor-pointer hover:bottom-2";

  return (
    <motion.div
      initial={{ height: 0 }}
      animate={{ height: "auto" }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="flex flex-col items-center"
    >
      <h1 className="text-white text-3xl font-semibold">
        No game has been set up in this server
      </h1>
      <p className="text-blue-500 text-xl font-light">
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
          className=" w-96 p-4 bg-transparent border-blue-500 border-2 rounded-xl focus:outline-none text-white"
          placeholder="Game-Name"
          onChange={(e) =>
            setGameData({ ...gameData, gameName: e.target.value })
          }
        />
        <input
          type="text"
          className="w-96 p-4 bg-transparent border-blue-500 border-2 rounded-xl focus:outline-none text-white"
          placeholder="Currency Name"
          onChange={(e) =>
            setGameData({
              ...gameData,
              currencyName: e.target.value,
            })
          }
        />
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl text-white font-semibold">Game Emoji ✨</h1>
          <p className="text-white font-thin text-center text-xl mr-2">
            Choose an emoji for your game
          </p>
        </div>
        <div className="grid grid-cols-4 w-96 content-center place-items-center mb-10 gap-10">
          <h1
            className={emojiClass}
            onClick={() => setGameData({ ...gameData, gameEmoji: "❤️" })}
          >
            ❤️
          </h1>
          <h1
            className={emojiClass}
            onClick={() => setGameData({ ...gameData, gameEmoji: "🌙" })}
          >
            🌙
          </h1>
          <h1
            className={emojiClass}
            onClick={() => setGameData({ ...gameData, gameEmoji: "💰" })}
          >
            💰
          </h1>
          <h1
            className={emojiClass}
            onClick={() => setGameData({ ...gameData, gameEmoji: "💎" })}
          >
            💎
          </h1>
          <h1
            className={emojiClass}
            onClick={() => setGameData({ ...gameData, gameEmoji: "👑" })}
          >
            👑
          </h1>
          <h1
            className={emojiClass}
            onClick={() => setGameData({ ...gameData, gameEmoji: "🍔" })}
          >
            🍔
          </h1>
          <h1
            className={emojiClass}
            onClick={() => setGameData({ ...gameData, gameEmoji: "🍕" })}
          >
            🍕
          </h1>
          <h1
            className={emojiClass}
            onClick={() => setGameData({ ...gameData, gameEmoji: "💵" })}
          >
            💵
          </h1>
          <h1
            className={emojiClass}
            onClick={() => setGameData({ ...gameData, gameEmoji: "🥕" })}
          >
            🥕
          </h1>
          <h1
            className={emojiClass}
            onClick={() => setGameData({ ...gameData, gameEmoji: "🙉" })}
          >
            🙉
          </h1>
          <h1
            className={emojiClass}
            onClick={() => setGameData({ ...gameData, gameEmoji: "🥑" })}
          >
            🥑
          </h1>
          <h1
            className={emojiClass}
            onClick={() => setGameData({ ...gameData, gameEmoji: "🍄" })}
          >
            🍄
          </h1>
        </div>
        <div className="flex items-center justify-center flex-col">
          <h1 className="text-3xl text-white font-semibold">Game color</h1>
          <p className="text-xl font-light text-white">
            Choose a background color for your game
          </p>
        </div>
        <div className="grid grid-cols-4 w-96 content-center place-items-center mb-10 gap-10">
          <div
            className=" w-16 h-16 rounded-full bg-red-500 hover:cursor-pointer relative bottom-0 transition-all duration-300 ease-out hover:bottom-3"
            onClick={() => setGameData({ ...gameData, gameColor: "#ef4444" })}
          ></div>
          <div
            className=" w-16 h-16 rounded-full bg-blue-500 hover:cursor-pointer relative bottom-0 transition-all duration-300 ease-out hover:bottom-3"
            onClick={() => setGameData({ ...gameData, gameColor: "#3b82f6" })}
          ></div>
          <div
            className=" w-16 h-16 rounded-full bg-purple-500 hover:cursor-pointer relative bottom-0 transition-all duration-300 ease-out hover:bottom-3"
            onClick={() => setGameData({ ...gameData, gameColor: "#a855f7" })}
          ></div>
          <div
            className=" w-16 h-16 rounded-full bg-pink-500 hover:cursor-pointer relative bottom-0 transition-all duration-300 ease-out hover:bottom-3"
            onClick={() => setGameData({ ...gameData, gameColor: "#ec4899" })}
          ></div>
          <div
            className=" w-16 h-16 rounded-full bg-green-500 hover:cursor-pointer relative bottom-0 transition-all duration-300 ease-out hover:bottom-3"
            onClick={() => setGameData({ ...gameData, gameColor: "#22c55e" })}
          ></div>
          <div
            className=" w-16 h-16 rounded-full bg-cyan-500 hover:cursor-pointer relative bottom-0 transition-all duration-300 ease-out hover:bottom-3"
            onClick={() => setGameData({ ...gameData, gameColor: "#14b8a6" })}
          ></div>
          <div
            className=" w-16 h-16 rounded-full bg-orange-500 hover:cursor-pointer relative bottom-0 transition-all duration-300 ease-out hover:bottom-3"
            onClick={() => setGameData({ ...gameData, gameColor: "#f97316" })}
          ></div>
          <div
            className=" w-16 h-16 rounded-full bg-yellow-500 hover:cursor-pointer relative bottom-0 transition-all duration-300 ease-out hover:bottom-3"
            onClick={() => setGameData({ ...gameData, gameColor: "#eab308" })}
          ></div>
        </div>
        <h1 className="text-3xl text-white font-semibold">Game Preview</h1>
        <div
          className={`w-96 h-40 mb-10 flex flex-col justify-center items-center rounded-lg`}
          style={{ backgroundColor: `${gameData.gameColor}` }}
        >
          <h1 className="text-[10px] text-white font-semibold relative bottom-8 right-32">
            {gameData.gameName}
          </h1>
          <p className="text-xl font-light text-white">
            You have 200 {gameData.currencyName}
          </p>
          <h1 className="text-4xl">{gameData.gameEmoji}</h1>
        </div>
        <button
          className="w-72 h-16 mb-10 bg-blue-500 text-white flex items-center justify-center mt-10 rounded-lg transition-all relative bottom-0 duration-200 hover:bg-blue-600 hover:bottom-2"
          onClick={createGame}
        >
          Create Game
        </button>
      </motion.div>
    </motion.div>
  );
};

export default Creategame;
