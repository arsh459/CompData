import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Badges = () => {
  const childRef = useRef(null);

  const isInView = useInView(childRef, {
    once: true,
    margin: "0px 100px -50px 0px",
    amount: 0.5,
  });

  return (
    <div
      ref={childRef}
      className="w-full relative z-0 my-20 md:my-32 flex flex-col justify-center items-center"
    >
      <div className="w-full flex flex-col items-center px-4 relative lg:absolute inset-0 z-10">
        <div className="text-white text-4xl md:text-6xl font-bold font-bail text-center max-w-screen-lg">
          <span className="text-[#FF4266]">SocialBoat Pays </span>
          for being healthy
        </div>
        <p className="text-white text-xl md:text-2xl font-bail text-center py-3 max-w-screen-lg">
          Earn FPs as you workout | Redeem them for cash and prizes
        </p>
      </div>
      <motion.img
        initial={{ x: 0, y: -40, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : undefined}
        transition={{ duration: 1 }}
        src={
          "https://ik.imagekit.io/socialboat/tr:w-1000,c-maintain_ratio,fo-auto/Component_20__5__bxJDnLCys.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668235911486"
        }
        className="w-full max-w-screen-xl object-contain mx-auto"
        loading="lazy"
        alt="badges"
      />
    </div>
  );
};

export default Badges;
