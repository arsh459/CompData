import { useState } from "react";
import { Link } from "@mui/material";
import clsx from "clsx";
import {
  fitChallenges,
  freeTriaCalender,
  goldenCrown,
  moneyBagWhite,
} from "@constants/icons/iconURLs";
const whatWillYouGet = [
  {
    icon: freeTriaCalender,
    text: "Initial 3 Day Free Trial",
  },
  {
    icon: moneyBagWhite,
    text: "Win your money back if you complete your goal",
  },
  {
    icon: fitChallenges,
    text: "1000+ fitness challenges & programs designed by Top influencers",
  },
];

const SubscriptionContentV3 = () => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  // const [scrolledDown, setScrolledDown] = useState<boolean>(false);
  return (
    <div className="  w-full h-screen overflow-hidden bg-black flex flex-col max-w-md relative mx-auto">
      <div
        className="flex-1   bg-no-repeat  "
        style={{
          backgroundImage:
            "url(https://ik.imagekit.io/socialboat/Screenshot_2022-07-25_at_2.01_1__1__BZFt09JHN.png?ik-sdk-version=javascript-1.4.3&updatedAt=1658838777384)",

          backgroundSize: "contain",
        }}
      >
        <div
          className="fixed left-0 right-0  top-0 flex items-center p-2 iphoneX:p-4 justify-between z-50  "
          style={{
            background: `linear-gradient(180deg, rgba(0, 0, 0, 0.53) 1.79%, rgba(0, 0, 0, 0.21) 58.04%, rgba(0, 0, 0, 0) 100%)`,
          }}
        >
          <img
            src={
              "https://ik.imagekit.io/socialboat/Vector__16__TCdE80hiL.png?ik-sdk-version=javascript-1.4.3&updatedAt=1658907677488"
            }
            className="w-2 h-4 iphoneX:w-3 iphoneX:h-7"
          />

          <Link
            href={"https://api.whatsapp.com/send?phone=919958730020&text=Hi!"}
          >
            <div className="w-20 h-6  iphoneX:w-24 iphoneX:h-8 flex items-center justify-center backdrop-blur-[11px] border rounded-full border-[#D1D1D1] ">
              <img
                src={
                  "https://ik.imagekit.io/socialboat/Vector__3__VvwOQQYVf.svg?ik-sdk-version=javascript-1.4.3&updatedAt=1657004613434"
                }
                alt="help message"
              />
              <span className="text-xs iphoneX:text-sm font-semibold text-[#D1D1D1] pl-1 ">
                HELP
              </span>
            </div>
          </Link>
        </div>
        <div
          className={clsx(
            "flex-1 bg-black/80 backdrop-blur-[14px] rounded-3xl rounded-b-none   absolute bottom-0 left-0 right-0 ",
            "transform-all duration-1000",
            isClicked ? "h-5/6 " : "h-1/2 "
          )}
        >
          <div
            className="text-center  mx-auto mt-2"
            onClick={() => setIsClicked((prev) => !prev)}
          >
            <img
              src={
                isClicked
                  ? "https://ik.imagekit.io/socialboat/Rectangle_1022__1__D4UtCL7j3.png?ik-sdk-version=javascript-1.4.3&updatedAt=1658908964012"
                  : "https://ik.imagekit.io/socialboat/tr:w-20,c-maintain_ratio/Rectangle_1022_ud3tBklhm.png?ik-sdk-version=javascript-1.4.3&updatedAt=1658908800812"
              }
              className={clsx(
                "w-11 h-3  mx-auto mt-4",
                !isClicked ? "animate-pulse " : ""
              )}
              alt=""
            />
          </div>
          <div className="overflow-y-scroll h-5/6 ">
            <div className=" flex flex-col justify-around flex-1 px-10 py-2">
              <div className="text-[#FF5970] text-2xl iphoneX:text-4xl py-5 iphoneX:py-11 font-semibold">
                Are you the Fittest Athlete?
              </div>
              <p className="text-[#F5F5F7]  iphoneX:text-lg pb-4 iphoneX:pb-8">
                Unlock all games for INR 999/month Win rewards upto{" "}
                <span className="text-[#FF5970] iphoneX:text-xl">
                  {" "}
                  INR 1,00,000
                </span>
              </p>
              <div
                className={clsx(
                  "flex flex-row items-center",
                  isClicked ? "pb-1 iphoneX:pb-2" : "pb-4 phoneX:pb-8"
                )}
              >
                <img
                  src={goldenCrown}
                  className="h-5 w-5 object-contain"
                  alt="crown"
                />
                <div
                  className={clsx(
                    "text-[#f5f5f7]  font-medium flex-1 pl-2 ",
                    isClicked ? "iphoneX:text-2xl" : "iphoneX:text-xl"
                  )}
                >
                  What will you get ?
                </div>
              </div>
            </div>
            <div className="flex justify-center flex-col  px-10  ">
              {isClicked
                ? whatWillYouGet.map((item) => {
                    return (
                      <div
                        className="flex flex-row  justify-center py-2 iphoneX:py-4"
                        key={item.text}
                      >
                        <img
                          src={item.icon}
                          className="h-5 w-5  object-contain"
                          alt="crown"
                        />
                        <div className="text-[#f5f5f7] text-base iphoneX:text-xl font-medium flex-1 pl-4">
                          {item.text}
                        </div>
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
          <div
            className=" bg-[#FF556C] text-white py-2 iphoneX:py-4
fixed  left-4 right-4 bottom-4         
          border rounded-full text-center mx-3 text-sm iphoneX:text-base font-medium "
          >
            Start Free & Subscribe Now!
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionContentV3;
