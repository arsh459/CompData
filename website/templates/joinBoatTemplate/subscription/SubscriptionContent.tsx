// import { backButton } from "@constants/icons";
import MediaCard from "@components/MediaCard";
import { completedIconRedTick } from "@constants/icons/iconURLs";
import { subscriptionStatus } from "@hooks/subscription/useSubscription";
import { Link } from "@mui/material";
import { EventInterface } from "@models/Event/Event";
import clsx from "clsx";
import BackIcon from "public/icons/BackIcon";
import { useState } from "react";
import { getGamePricingHandler } from "server/payments/getSubscriptionPlan";

interface Props {
  onSubscribe: () => void;
  onFreeTrial: () => void;
  onClose?: () => void;
  subStatus: subscriptionStatus;
  game: EventInterface;
  isUserOnTrial: boolean;
  // trialExpired: boolean;
}

const SubscriptionContent: React.FC<Props> = ({
  onClose,
  onSubscribe,
  onFreeTrial,
  game,
  subStatus,
  isUserOnTrial,
  // trialExpired,
}) => {
  // console.log("game", game);
  const { cost, moneyBackDays, freeAccessDays } = getGamePricingHandler(game);
  const [isPaused, setIsPaused] = useState<boolean>(true);

  return (
    <div className="w-full h-full flex flex-col   overflow-y-scroll">
      {/* <div
          className="absolute inset-0 top-1/4 right-0 left-0 w-full 
          bg-gradient-to-b from-black/10 via-black/10 to-transparent/20"
        /> */}

      <div
        className="fixed left-0 right-0  top-0 flex items-center p-4 justify-between z-50  "
        style={{
          background: `linear-gradient(180deg, rgba(0, 0, 0, 0.53) 1.79%, rgba(0, 0, 0, 0.21) 58.04%, rgba(0, 0, 0, 0) 100%)`,
        }}
      >
        {/* <h2 className="text-2xl italic font-extrabold text-white"> */}
        {onClose ? (
          <div
            className="p-1 cursor-pointer border-2  border-[#D1D1D1] backdrop-blur-[11px] rounded-full"
            onClick={onClose}
          >
            <BackIcon style={{ height: "26", width: "26", fill: "#D1D1D1" }} />
          </div>
        ) : (
          <div />
        )}
        {/* </h2> */}
        <Link
          href={"https://api.whatsapp.com/send?phone=919958730020&text=Hi!"}
        >
          <div className="w-24 h-8 flex items-center justify-center backdrop-blur-[11px] border rounded-full border-[#D1D1D1] ">
            <img
              src={
                "https://ik.imagekit.io/socialboat/Vector__3__VvwOQQYVf.svg?ik-sdk-version=javascript-1.4.3&updatedAt=1657004613434"
              }
              alt="help message"
            />
            <span className="text-sm font-semibold text-[#D1D1D1] pl-1 ">
              HELP
            </span>
          </div>
        </Link>
      </div>
      {/* <div className="h-px bg-[#515151]" /> */}
      {/* <div className="py-4" /> */}
      {/* <div
          className="absolute inset-0 top-1/4 right-0 left-0 w-full -z-10"
          style={{
            background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 1.9%, #000000 14.31%, rgba(0, 0, 0, 0.99) 25.8%)`,
          }}
        /> */}
      <div
        className={clsx(
          "w-full max-h-60 iphoneX:max-h-max relative z-0",
          !game.media[0] && "aspect-w-4 aspect-h-3"
        )}
      >
        {game.media[0] ? (
          <MediaCard
            media={game.media[0]}
            thumbnail={game.thumbnail}
            setIsPaused={setIsPaused}
            HWClassStr="h-full w-fit mx-auto"
          />
        ) : (
          <video
            preload="auto"
            autoPlay
            playsInline
            loop
            muted={true}
            controls={false}
            src={"https://d2cjy81ufi4f1m.cloudfront.net/videolg.mp4"}
            className={clsx("w-full h-full object-cover rounded-t-0 ")}
            poster="https://ik.imagekit.io/socialboat/pexels-zakaria-boumliha-2827400_1_6w7U2-XSo.png?ik-sdk-version=javascript-1.4.3&amp;updatedAt=1655234361614"
          />
        )}

        {isPaused ? (
          <div className=" absolute inset-0 flex items-end z-10  pointer-events-none">
            <h1
              className="text-[#EB4E64] text-lg iphoneX:text-2xl font-semibold py-4 text-center  absolute left-0 -bottom-4 px-4 "
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 1.25%, rgba(1, 1, 1, 0.31) 9.29%, rgba(1, 1, 1, 0.53) 19.7%, rgba(2, 2, 2, 0.72) 33.78%, rgba(3, 3, 3, 0.85) 47.1%, rgba(3, 3, 3, 0.96) 67.59%, #040404 89.81%)`,
              }}
            >
              {game.courseGoal} {game.courseGoalPrimary}
            </h1>
          </div>
        ) : null}
      </div>

      <div className="px-4 flex-1 flex flex-col text-sm iphoneX:text-base justify-around z-10 ">
        <div
          className="p-1 iphoneX:p-4 my-4 flex text-center   justify-between rounded-2xl border-solid border-[3px] text-[#F0F0F0] bg-gradient-to-b from-[#D4B76A]  to-[#BF953F] "
          style={{ borderColor: `#A98E54` }}
        >
          <div className="bg-clip-text textReflection w-full flex items-center">
            <p className="text-sm iphoneX:text-lg font-medium leading-snug flex-1 self-center px-2  ">
              {freeAccessDays
                ? `First ${freeAccessDays} Days Free`
                : moneyBackDays
                ? `Money back in ${moneyBackDays} days`
                : "Join the game to win rewards"}
            </p>
            {/* <div className=" p-px mx-4  bg-[#E3E3E3] " /> */}
            <p className="leading-[12px] mx-2.5 text-[16px] ">
              |
              <br />
              |
              <br />
              |
              <br />|
            </p>
            <p className="flex-1 self-center text-center font-semibold text-2xl bg-clip-text  ">
              {cost ? `INR ${cost}/-` : "Free"}
            </p>
          </div>
        </div>

        {game.programDetails?.map((item, index) => {
          return (
            <div
              className="text-white flex font-normal text-left py-2 "
              key={`li-${index}`}
            >
              <img src={completedIconRedTick} className="h-5 w-5" />{" "}
              <span className="flex-1 pl-2 ">{item.text}</span>
            </div>
          );
        })}

        <div className="h-20" />

        <div className="bg-black fixed shadow-sm bottom-0 left-0 right-0 flex flex-col justify-center">
          {/* <div className="py-2 px-8 ring-1 ring-white  w-full">
            <p className="text-white text-xl">2 Day Free Trial</p>
          </div> */}
          <div className="flex shadow-sm border-t-white w-full z-10">
            {!isUserOnTrial && freeAccessDays ? (
              <div
                onClick={onFreeTrial}
                className={clsx(
                  "flex-1 flex justify-center items-center py-4 bg-[#D74559] cursor-pointer"
                )}
              >
                <p className="text-center text-white font-bold text-lg">
                  Start Free Trial
                </p>
              </div>
            ) : isUserOnTrial && subStatus !== "SUBSCRIBED" ? (
              <div
                onClick={onSubscribe}
                className={clsx(
                  "flex-1 flex justify-center items-center py-4 bg-[#D74559] cursor-pointer"
                )}
              >
                <p className="text-center text-white font-bold text-lg">
                  Subscribe Now
                </p>
              </div>
            ) : (
              <div
                onClick={onClose}
                className={clsx(
                  "flex-1 flex justify-center items-center py-4 bg-[#D74559] cursor-pointer"
                )}
              >
                <p className="text-center text-white font-bold text-lg">
                  Go to your team
                </p>
              </div>
            )}

            {/* {isUserOnTrial && freeAccessDays ? null : trialExpired ? (
              <div
                onClick={onFreeTrial}
                className="flex-1 flex flex-col shadow-sm border-white justify-center items-center cursor-pointer py-4"
              >
                <p className="text-center line-through text-white text-lg">{`Free ${freeAccessDays} Day Trial`}</p>
                <p className="text-center text-white text-sm">Trial Expired</p>
              </div>
            ) : freeAccessDays && !isUserOnTrial ? (
              <div
                onClick={onFreeTrial}
                className="flex-1 flex  justify-center items-center cursor-pointer py-4"
              >
                <p className="text-center underline font-semibold text-white text-lg">{`Free ${freeAccessDays} Day Trial`}</p>
              </div>
            ) : null}
            {subStatus === "SUBSCRIBED" ? (
              <div
                onClick={onClose}
                className={clsx(
                  "flex-1 flex justify-center items-center py-4 bg-[#D74559] cursor-pointer"
                )}
              >
                <p className="text-center text-white font-bold text-lg">
                  Already in Team
                </p>
              </div>
            ) : (
              <div
                onClick={onSubscribe}
                className={clsx(
                  "flex-1 flex justify-center items-center py-4 bg-[#D74559] cursor-pointer"
                )}
              >
                <p className="text-center text-white font-bold text-lg">
                  Subscribe Now
                </p>
              </div>
            )} */}
          </div>
        </div>

        {/* <div className="fixed bg-black  shadow-sm bottom-0 left-0 right-0  flex flex-col justify-center cursor-pointer">
          {freeAccessDays === 0 && subStatus !== "SUBSCRIBED" ? (
            <div className="cursor-pointer py-2">
              <p className="text-gray-200 text-sm underline text-center font-medium">
                Subscription expired
              </p>
            </div>
          ) : null}

          <div className="px-4 pb-4">
            <div
              onClick={onSubscribe}
              className="bg-[#D74559] border-solid border-2 rounded-full border-[#FF93A2] h-14 flex justify-center items-center"
            >
              <p className="text-base whitespace-nowrap iphoneX:text-xl font-medium text-center text-white">
                Subscribe Now!
              </p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default SubscriptionContent;
