import { badgeTypes } from "@models/Prizes/PrizeV2";
import clsx from "clsx";
import { useState } from "react";
import { getbadgeColor } from "./Badges/utils";

interface Props {
  isSwiped: boolean;
  setIsSwiped: (val: boolean) => void;
  badgeType: badgeTypes;
  setShowPrize: () => void;
}

const SlideToOpen: React.FC<Props> = ({
  isSwiped,
  setIsSwiped,
  badgeType,
  setShowPrize,
}) => {
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);

  const handleTouchStart = (e: any) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleMouseDown = (e: any) => {
    setTouchStart(e.clientX);
  };

  const handleTouchMove = (e: any) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleMouseMove = (e: any) => {
    setTouchEnd(e.clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 150) {
      setIsSwiped(false);
    }

    if (touchStart - touchEnd < -150) {
      setIsSwiped(true);
      setTimeout(() => {
        setShowPrize();
      }, 2000);
    }
  };

  return (
    <div className="w-80 h-60 rounded-2xl flex flex-col">
      <div
        className={clsx(
          "h-16 bg-[#131313] rounded-t-2xl border-x border-t border-[#3B3B3B] transition-all",
          isSwiped && "-translate-x-8 -translate-y-16 -rotate-12"
        )}
      />
      {isSwiped ? (
        <div
          className="h-5 blur-md relative -z-10"
          style={{ backgroundColor: getbadgeColor(badgeType).color1 }}
        />
      ) : null}
      <div
        className={clsx("h-16", !isSwiped && "py-px")}
        style={{
          background:
            "linear-gradient(269.84deg, rgba(104, 27, 245, 0) 0.85%, #681BF5 11.31%, #FD6F6F 34.91%, #F29C39 49.79%, #CCDB2C 62.94%, #60C5D9 88.24%, rgba(96, 197, 217, 0) 99.12%)",
        }}
      >
        <div
          className="h-full bg-gradient-to-b from-[#4A4A4A] to-[#323232] flex justify-center items-center select-none"
          onTouchStart={(e) => handleTouchStart(e)}
          onTouchMove={(e) => handleTouchMove(e)}
          onTouchEnd={() => handleTouchEnd()}
          onMouseDown={(e) => handleMouseDown(e)}
          onMouseMove={(e) => handleMouseMove(e)}
          onMouseUp={() => handleTouchEnd()}
        >
          <p
            className={clsx(
              "italic text-2xl pr-4",
              isSwiped && "bg-clip-text text-transparent transition-all"
            )}
            style={
              isSwiped
                ? {
                    background:
                      "linear-gradient(269.84deg, rgba(104, 27, 245, 0) 0.85%, #681BF5 11.31%, #FD6F6F 34.91%, #F29C39 49.79%, #CCDB2C 62.94%, #60C5D9 88.24%, rgba(96, 197, 217, 0) 99.12%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }
                : {}
            }
          >
            Slide to open
          </p>
          <img
            src={`https://ik.imagekit.io/socialboat/Group_179_PcKi-7QFC.png?ik-sdk-version=javascript-1.4.3&updatedAt=1654091214274`}
            alt="slide right icon"
          />
        </div>
      </div>
      <div className="h-48 bg-black rounded-b-2xl border-x border-b border-[#3B3B3B] flex justify-center items-center">
        <img
          src={`https://ik.imagekit.io/socialboat/Group_137_yt_0LRbvf.png?ik-sdk-version=javascript-1.4.3&updatedAt=1654095701548`}
          alt="socialboat icon"
          className="w-20"
        />
      </div>
    </div>
  );
};

export default SlideToOpen;
