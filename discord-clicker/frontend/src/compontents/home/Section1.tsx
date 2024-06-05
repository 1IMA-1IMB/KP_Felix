import React from "react";
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
    }
  }, [isInView]);

  const backgroundImage = useMotionTemplate``;

  return (
    <motion.div
      className="section 1 flex flex-col items-center h-auto"
      ref={ref}
      style={{
        backgroundImage,
      }}
    >
      <img
        src="./ai-hero.png"
        alt=""
        className="absolute top-0 left-0 z-0 h-screen min-w-max overflow-hidden"
      />
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
        className=" text-3xl sm:text-4xl md:text-5xl text-white font-semibold z-10 w-10/12 sm:w-8/12 text-center mt-20"
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
        className=" text-xl sm:text-2xl mt-5 font-light text-gray-200 z-10 text-center"
      >
        Click, Earn and spend with
        <span className="text-blue-500 z-10"> Clicker cord</span>
      </motion.p>
      <div className="flex flex-col sm:flex-row gap-10 mt-10 z-10">
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
            logedIn
              ? "/dashboard"
              : "https://discord.com/oauth2/authorize?client_id=1243668312597074021&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fdiscord%2Foauth%2Fauthenticate%2F&scope=identify+connections+guilds.join+gdm.join+email+guilds+guilds.members.read"
          }
        >
          <button className="w-56 h-14 rounded-xl text-xl bg-blue-500 flex items-center justify-center gap-5 text-white transition-all duration-300 hover:bg-blue-600">
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
          className="w-56 h-14 rounded-xl text-xl bg-gray-700 mb-20 flex items-center justify-center gap-5 text-white transition-all duration-300 hover:bg-gray-500  opacity-40"
        >
          <button>How to use</button>
        </motion.a>
      </div>
    </motion.div>
  );
};

export default Section1;
