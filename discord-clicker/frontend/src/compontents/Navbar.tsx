import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import Cookies from "js-cookie";
import axios from "axios";
import { RiMenu3Fill, RiCloseFill } from "react-icons/ri";
import { motion } from "framer-motion";

const Navbar: React.FC = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [logedIn, setLogedIn] = useState<boolean>(false);

  const [user, setUser] = useState({
    username: "",
    avatar: "",
    id: "",
  });

  const changeUserOpen = () => {
    if (!logedIn) {
      window.location.href =
        "https://discord.com/oauth2/authorize?client_id=1243668312597074021&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fdiscord%2Foauth%2Fauthenticate%2F&scope=identify+connections+guilds.join+gdm.join+email+guilds+guilds.members.read";
    } else {
      setUserOpen(!userOpen);
    }
  };

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
      <a href="/" className="z-30">
        {/* <h1 className="logo text-white font-bold text-5xl">
          Clicker <span className="italic text-blue-500">Cord</span>
        </h1> */}
        <img src="./Logo.png" alt="" className="sm:h-24 h-16 " />
      </a>
      <div className="flex h-full items-center gap-5 sm:gap-10">
        <div className="links hidden md:flex h-full items-center gap-10">
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
        </div>
        <div className="md:hidden flex ">
          {open ? (
            <RiCloseFill
              size={60}
              className="z-30"
              color="white"
              onClick={() => setOpen(!open)}
            />
          ) : (
            <RiMenu3Fill
              size={50}
              className="z-30"
              color="white"
              onClick={() => setOpen(!open)}
            />
          )}
        </div>
        <motion.div
          variants={{
            hidden: { width: 0, opacity: 0, pointerEvents: "none" },
            show: { width: "100vw", opacity: 1},
          }}
          initial="hidden"
          animate={open ? "show" : "hidden"}
          exit="hidden"
          className=" absolute top-0 left-0 h-screen bg-gray-950 z-20 flex flex-col items-center justify-center text-white"
        >
          <h1 className="text-5xl font-bold italic">Menu</h1>
          <motion.div
          variants={{
            hidden: { width: 0},
            show: { width: 200, transition: { duration: 0.3, delay: 0.3} },
          }}
          initial="hidden"
          animate={open ? "show" : "hidden"}
          exit={"hidden"}

          className="mb-10 mt-2 h-1 bg-[#27aafb]"
          ></motion.div>
          <a href="#" className="text-3xl font-light mb-10 hover:unterline decoration-2 decoration-white">Link 1</a>
          <a href="#" className="text-3xl font-light mb-10">Link 2</a>
          <a href="#" className="text-3xl font-light mb-10">Link 3</a>
        </motion.div>
        <a
          onClick={changeUserOpen}
          className={
            logedIn
              ? "rounded-full overflow-hidden h-14 w-14 flex items-center justify-center cursor-pointer z-20"
              : "user bg-blue-500 p-1 rounded-full overflow-hidden cursor-pointer z-20"
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
        <motion.div
          variants={{
            hidden: { height: 0, opacity: 0, pointerEvents: "none" },
            show: { height: "auto", opacity: 1, pointerEvents: "all" },
          }}
          initial="hidden"
          animate={userOpen ? "show" : "hidden"}
          exit="hidden"
          className={
            "flex flex-col absolute bg-gray-900 right-6 top-28 w-44 items-center rounded-xl z-40"
          }
        >
          <h1 className="text-xl mt-4 font-bold text-white">User</h1>
          <a href="#" className="text-center text-[#c8c8c8] font-extralight">
            logged in as {user.username}
          </a>
          <a href="/profile" className=" text-white text-xl font-light mt-5 hover:underline underline-offset-4 decoration-2">
            Profile
          </a>
          <a
            href="/dashboard"
            className="mt-10 mb-10 text-white text-xl font-light hover:underline underline-offset-4 decoration-2"
          >
            Dashboard
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Navbar;
