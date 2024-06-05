import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { LuPaintbrush2, LuSwords, LuMousePointerClick } from "react-icons/lu";

const Section2 = () => {
  const ref: any = useRef();

  const isInView = useInView(ref, { once: true });

  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("vissible");
    }
  }, [isInView]);

  return (
    <div className="section 2  text-white flex flex-col items-center ">
      <div className="mt-10 grid xl:grid-cols-3 placespace-x-20  ">
        <motion.div
          whileHover={{
            height: "350px",
            borderWidth: "3px",
            borderColor: "#3b82f6",
            y: -60,
          }}
          variants={{
            vissible: {
              x: 0,
              opacity: 1,
              transition: { duration: 0.5 },
            },
            hidden: {
              x: -100,
              opacity: 0,
            },
          }}
          initial="hidden"
          animate={mainControls}
          className="card1 h-80 w-72 m-10 p-5 flex flex-col items-center text-center rounded-xl border-[#69f740] border-[2px] bg-black bg-opacity-20"
        >
          <LuPaintbrush2 size={50} color="#69f740" className="mt-4" />
          <h1 className="text-2xl font-bold">Customisability</h1>
          <p ref={ref} className=" font-extralight text-xl mt-4 text-white">
            Our game services offer a wide variety of customization options. All
            accessible for completely free!
          </p>
        </motion.div>
        <motion.div
          whileHover={{
            height: "350px",
            borderWidth: "3px",
            borderColor: "#3b82f6",
            y: -60,
          }}
          variants={{
            vissible: {
              top: 0,
              opacity: 1,
              transition: { duration: 0.5 },
            },
            hidden: {
              top: -200,
              opacity: 0,
            },
          }}
          initial="hidden"
          animate={mainControls}
          className="card2 h-80 w-72 m-10 p-5 flex flex-col border-[#27acfe]  items-center text-center rounded-xl border-[2px] relative bg-black bg-opacity-20"
        >
          <LuSwords size={50} color="#27acfe" />
          <h1 className="text-2xl font-bold">Compete</h1>
          <p className="font-extralight text-xl mt-4">
            Compete against your friends to become the richest player in your
            server, and buy items such as roles and other custom items.
          </p>
        </motion.div>
        <motion.div
          whileHover={{
            height: "350px",
            borderWidth: "3px",
            borderColor: "#3b82f6",
            y: -60,
          }}
          variants={{
            vissible: {
              x: 0,
              opacity: 1,
              transition: { duration: 0.5 },
            },
            hidden: {
              x: 100,
              opacity: 0,
            },
          }}
          initial="hidden"
          animate={mainControls}
          className="card3 h-80 w-72 m-10 p-5 flex flex-col items-center text-center rounded-xl border-[#f74ef3] border-[2px] bg-black bg-opacity-20"
        >
          <LuMousePointerClick size={50} color="#f74ef3" />
          <h1 className="text-2xl font-bold">Easy to use</h1>
          <p className="font-extralight text-xl mt-4">
            Our setup is easy and straight forward, just register and setup the
            game for your server. if this seems hard you can follow our{" "}
            <a href="#">setup guide</a> to set up your game.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Section2;
