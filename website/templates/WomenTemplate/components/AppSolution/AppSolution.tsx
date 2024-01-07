import { motion, useInView } from "framer-motion";
import { useRef } from "react";
// import { useEffect, useRef } from "react";

import clsx from "clsx";

const fitness360: {
  img: string;
  level: number;
  scale: number;
  tranlateX: number;
}[] = [
  {
    img: "https://ik.imagekit.io/socialboat/tr:w-400,c-maintain_ratio,fo-auto/Group_869_0wwJUyV_Kd.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668165646187",
    level: 3,
    scale: 0.7,
    tranlateX: 200,
  },
  {
    img: "https://ik.imagekit.io/socialboat/tr:w-400,c-maintain_ratio,fo-auto/Vectary_texture__2__jYHdWOFOn.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668165645895",
    level: 2,
    scale: 0.8,
    tranlateX: 100,
  },
  {
    img: "https://ik.imagekit.io/socialboat/tr:w-400,c-maintain_ratio,fo-auto/Vectary_texture_n4IvKXMGH.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668165646385",
    level: 1,
    scale: 0.9,
    tranlateX: 25,
  },
  {
    img: "https://ik.imagekit.io/socialboat/tr:w-400,c-maintain_ratio,fo-auto/Screenshot_2022-11-03_at_2.51_2_AvS-Kkt_T2.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668165646946",
    level: 0,
    scale: 1,
    tranlateX: 0,
  },
  {
    img: "https://ik.imagekit.io/socialboat/tr:w-400,c-maintain_ratio,fo-auto/Vectary_texture__1__jrb5nlWrM.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668165645731",
    level: 1,
    scale: 0.9,
    tranlateX: -25,
  },
  {
    img: "https://ik.imagekit.io/socialboat/tr:w-400,c-maintain_ratio,fo-auto/Vectary_texture__3__70ifPmlYN.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668165646712",
    level: 2,
    scale: 0.8,
    tranlateX: -100,
  },
  {
    img: "https://ik.imagekit.io/socialboat/tr:w-400,c-maintain_ratio,fo-auto/Group_869_0wwJUyV_Kd.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668165646187",
    level: 3,
    scale: 0.7,
    tranlateX: -200,
  },
];

const AppSolution = () => {
  const childRef = useRef(null);
  //   const { scrollY } = useScroll({ target: childRef });
  //   const opacity = useTransform(scrollY, [300, 1000], [0, 0.55]);

  const isInView = useInView(childRef, {
    once: true,
    margin: "0px 100px -50px 0px",
    amount: 0.75,
  });

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center overflow-hidden">
      <p className="text-4xl sm:text-5xl lg:text-6xl font-popR text-center py-20 px-4">
        We Designed An App <br className="hidden md:block" /> to solve
        <span className="text-[#FF4183] font-bair"> 360&#176; Fitness </span>
        for all <br className="hidden md:block" /> life stages of a woman
      </p>
      <div
        className="w-full flex-1 flex justify-center items-center relative z-0"
        ref={childRef}
      >
        {isInView ? (
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 -z-20"
            >
              <div className="w-full h-3/4">
                <div className="w-full aspect-1 bg-[#566BB6]/40 blur-3xl rounded-full" />
              </div>
            </motion.div>
            <motion.div
              initial={{ x: 0, y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 2 }}
              className="w-full flex-1 flex justify-center items-end pb-10 relative z-0"
            >
              {fitness360.map((item, index) => (
                <img
                  key={`app solution image ${index}`}
                  src={item.img}
                  className={clsx(
                    "object-contain",
                    item.level === 0
                      ? "w-3/4 sm:w-1/2 lg:w-1/5 -mx-32 lg:mx-auto -z-20 lg:z-20"
                      : "w-1/2 sm:w-1/3 lg:w-1/5"
                  )}
                  style={{
                    transform: `scale(${item.scale}) translate(${
                      item.tranlateX
                    }%, ${100 - 100 * item.scale}%)`,
                    zIndex: item.level === 0 ? undefined : -item.level,
                  }}
                  alt={`app solution image ${index}`}
                />
              ))}
            </motion.div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default AppSolution;
