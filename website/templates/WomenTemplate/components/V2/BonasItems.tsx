import clsx from "clsx";
import { useEffect, useState } from "react";

const data = [
  {
    icon: "https://ik.imagekit.io/socialboat/tr:w-500,c-maintain_ratio,fo-auto/Frame_1360_0lOYTwXfjd.png?ik-sdk-version=javascript-1.4.3&updatedAt=1677072518616",
    text: "Healthy and tasty food recipe videos",
  },
  {
    icon: "https://ik.imagekit.io/socialboat/tr:w-500,c-maintain_ratio,fo-auto/Frame_1361_ZOToRBnkbs.png?ik-sdk-version=javascript-1.4.3&updatedAt=1677072518833",
    text: "Free offers from Healthcare brands",
  },
  {
    icon: "https://ik.imagekit.io/socialboat/tr:w-500,c-maintain_ratio,fo-auto/Frame_1362_-OIW27k5M.png?ik-sdk-version=javascript-1.4.3&updatedAt=1677072517908",
    text: "Mood & Period Tracking",
  },
  {
    icon: "https://ik.imagekit.io/socialboat/tr:w-500,c-maintain_ratio,fo-auto/Frame_1363_y7YY8QbCj.png?ik-sdk-version=javascript-1.4.3&updatedAt=1677073061623",
    text: "Steps counter",
  },
];

const BonasItems = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isUserPress, setIsUserPress] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isUserPress) {
        clearInterval(interval);
      } else {
        setSelectedIndex((p) => (p + 1) % data.length);
      }
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [isUserPress]);

  const onPress = (index: number) => {
    setSelectedIndex(index);
    setIsUserPress(true);
  };

  return (
    <div className="w-screen py-28 max-w-screen-lg mx-auto flex flex-col justify-center items-center p-5">
      <h2 className="w-full font-qsM sm:text-center text-white text-3xl sm:text-4xl lg:text-5xl">
        Bonus items you get
      </h2>
      <div className="w-12 aspect-1" />
      <div className="w-full flex flex-col lg:flex-row justify-center gap-8 bg-white/5 border border-white/30 rounded-2xl max-w-3xl p-5">
        <img
          src={data[selectedIndex].icon}
          alt={data[selectedIndex].text}
          className="w-2/3 lg:w-1/3 max-w-xs self-center aspect-1 object-contain"
        />
        <div className="flex-1 flex flex-col justify-evenly gap-5 lg:gap-0">
          {data.map((each, index) => (
            <p
              onClick={() => onPress(index)}
              key={`${each.text}-${index}`}
              className={clsx(
                "text-base text-white/80  p-2 rounded-xl cursor-pointer font-nunitoM",
                index === selectedIndex ? "bg-white/20" : "",
                isUserPress ? "hover:bg-white/20" : "hover:bg-white/5"
              )}
            >
              {each.text}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BonasItems;
