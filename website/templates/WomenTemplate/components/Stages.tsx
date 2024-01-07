import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

const items: { img: string; text: string }[] = [
  {
    img: "https://ik.imagekit.io/socialboat/tr:w-400,c-maintain_ratio,fo-auto/1031_StrappyRacerbackTank_AngelFalls_32741_2_EEOl08Odf.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668177414310",
    text: "PCOS/PCOD Weight Gain",
  },
  {
    img: "https://ik.imagekit.io/socialboat/tr:w-400,c-maintain_ratio,fo-auto/L23_210914_LUX_PUFFERS_0041_1_647J5G_tC.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668258902675",
    text: "Body Toning & Fitness",
  },
  {
    img: "https://ik.imagekit.io/socialboat/tr:w-400,c-maintain_ratio,fo-auto/PDP_MatBikeShort_Plum1_2_sdu0aJsBh.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668177414414",
    text: "Post Pregnancy Mobility",
  },
  {
    img: "https://ik.imagekit.io/socialboat/tr:w-400,c-maintain_ratio,fo-auto/f9fac486b71fd8b21d69e8bb9d02ab58_1_Ai6DzFqVzJ.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668258901728",
    text: "40+Yrs Perimenopause",
  },
];

const Stages = () => {
  const controls = useAnimation();
  const ref = useRef<HTMLImageElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  useEffect(() => {
    const func = (length: number) => {
      setTimeout(async () => {
        await controls.start({
          opacity: [1, 0],
          translateX: [0, -250],
          transition: {
            duration: 1,
            ease: "easeInOut",
          },
        });
        setSelectedIndex((prev) => (prev + 1) % length);
        await controls.start({
          opacity: [0, 1],
          translateX: [250, 0],
          transition: {
            duration: 1,
            ease: "easeInOut",
          },
        });
        func(length);
      }, 3000);
    };
    func(items.length);
  }, [controls]);

  return (
    <div className="py-20 md:py-0 w-full flex flex-col justify-between items-center relative z-0 px-4 overflow-x-hidden">
      <div className="text-white text-4xl sm:text-5xl lg:text-6xl font-bold font-bail text-center pt-12 sm:pt-28">
        Get Customised Fitness & Nutrition <br className="hidden sm:block" />{" "}
        programs for
        <span className="text-[#FF4266]"> your health goal</span>
      </div>
      <div className="w-full pt-10 md:pt-20  max-w-screen-xl mx-auto flex-1 flex flex-col lg:flex-row justify-center items-center">
        <div className="lg:w-1/4 max-w-md grid grid-cols-2 lg:grid-cols-1 gap-4 md:gap-8">
          {items.map((item, index) => (
            <div
              key={item.text}
              className={clsx(
                "backdrop-blur-sm rounded-2xl lg:rounded-full p-4",
                selectedIndex === index
                  ? "bg-white text-black"
                  : "bg-white/10 text-white"
              )}
            >
              <p className="text-center font-popR text-base sm:text-lg lg:text-lg">
                {item.text}
              </p>
            </div>
          ))}
        </div>
        <div className="w-1/12 aspect-1" />
        <div className="lg:w-1/3 max-w-md relative z-0 flex justify-center items-center">
          <motion.img
            animate={controls}
            onAbort={() => console.log("here")}
            src={items[selectedIndex].img}
            className="w-2/3 object-contain"
            loading="lazy"
            ref={ref}
          />
          <div className="bg-white/10 rounded-full aspect-1 absolute inset-8 -z-10 p-5">
            <div className="bg-white/10 rounded-full aspect-1 p-5">
              <div className="bg-white/10 rounded-full aspect-1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stages;
