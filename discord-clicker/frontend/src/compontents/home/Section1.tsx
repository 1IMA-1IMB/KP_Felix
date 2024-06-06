import React from "react";
import Navbar from "../Navbar";
import {
  motion,
  useMotionTemplate,
  useAnimation,
  useInView,
} from "framer-motion";
import { useEffect, useRef } from "react";
import { FaDiscord } from "react-icons/fa";

const Section1 = (logedIn: any) => {
  const ref: any = useRef();

  const isInView = useInView(ref, { once: true });

  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("vissible");
      console.log(logedIn.logedIn);
    }
  }, [isInView]);

  const backgroundImage = useMotionTemplate``;

  return (
    <>
    <div className="bg-[linear-gradient(to_right_bottom,rgba(0,0,0,0.6),rgba(0,0,0,0.6)),url('https://glafyr.com/ClickerCord/bg-2.jpeg')] bg-cover bg-center h-screen ">
    <Navbar />
    <motion.div
      className="section 1 overflow-x-hidden flex flex-col items-center w-screen "
      ref={ref}
      style={{
        backgroundImage,
      }}
    >
      <motion.h1
        variants={{
          vissible: {
            opacity: 1,
            y: 0,
          },
          hidden: {
            opacity: 0,
            y: -100,
          },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.5 }}
        className=" text-3xl sm:text-4xl md:text-5xl 2xl:text-7xl text-white font-semibold z-10 w-10/12 sm:w-8/12 text-center mt-20 2xl:mt-32"
      >
        Discord games for you and for everyone in your community
      </motion.h1>
      <motion.p
        variants={{
          vissible: {
            opacity: 1,
          },
          hidden: {
            opacity: 0,
          },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.3, delay: 0.3 }}
        className=" text-xl sm:text-2xl mt-5 2xl:mt-10 2xl:text-4xl font-light text-gray-200 z-10 text-center"
      >
        Click, Earn and spend with
        <span className="text-blue-500 z-10"> Clicker cord</span>
      </motion.p>
      <div className="flex flex-col sm:flex-row gap-10 mt-10 2xl:mt-20 z-10">
        <motion.a
          variants={{
            vissible: {
              opacity: 1,
              y: 0,
            },
            hidden: {
              opacity: 0,
              y: -50,
            },
          }}
          initial="hidden"
          animate={mainControls}
          transition={{ duration: 0.5, delay: 0.3 }}
          href={
            logedIn.logedIn
              ? "/dashboard"
              : "https://discord.com/oauth2/authorize?client_id=1243668312597074021&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fdiscord%2Foauth%2Fauthenticate%2F&scope=identify+connections+guilds.join+gdm.join+email+guilds+guilds.members.read"
          }
        >
          <button className="w-56 h-14 2xl:w-80 2xl:h-20 rounded-xl text-xl bg-blue-500 flex items-center justify-center gap-5 text-white transition-all duration-300 hover:bg-blue-600">
            <FaDiscord size={30} />
            Add to discord
          </button>
        </motion.a>
        <motion.a
          variants={{
            vissible: {
              opacity: 1,
              y: 0,
            },
            hidden: {
              opacity: 0,
              y: 50,
            },
          }}
          initial="hidden"
          animate={mainControls}
          transition={{ duration: 0.3, delay: 0.3 }}
          href="#"
          className="w-56 h-14 2xl:w-80 2xl:h-20 rounded-xl text-xl bg-gray-700 mb-20 xl:mb-32 2xl:mb-40 flex items-center justify-center gap-5 text-white transition-all duration-300 hover:bg-opacity-90 hover:bg-gray-500  bg-opacity-90"
        >
          <button>How to use</button>
        </motion.a>
      </div>
    </motion.div>
    </div>
    </>
  );
};

export default Section1;
