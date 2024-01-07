import clsx from "clsx";
import { useEffect } from "react";
// import { number } from "yup";
import { iosFrame, miBand, flexBike, flexRow } from "../../constants";
import RewardsDesc from "./RewardsDesc";

interface Props {}

const RewardsIllustration: React.FC<Props> = ({}) => {
  useEffect(() => {
    const target = document.getElementById("target");
    if (target) {
      target.scrollLeft = Math.round(
        Math.round(target.scrollWidth / 2 - target.clientWidth / 2)
      );
    }
  }, []);

  return (
    <div
      id="target"
      className="flex items-center overflow-x-scroll w-screen md:w-full scrollbar-hide"
    >
      {/* <div className="w-48 h-48 md:w-0 border" /> */}
      {[flexBike, miBand, flexRow].map((item, i) => {
        return (
          <div
            key={`reward-${i}`}
            className={clsx(
              "relative my-16",
              // i === 0 ? "ml-60" : i === 2 ? "mr-60" : "",
              i === 1 ? "" : "px-2"
            )}
          >
            <div
              className={clsx("relative", i === 1 ? "h-96 w-72" : "h-72 w-44")}
            >
              {i === 1 ? (
                <img
                  src={iosFrame}
                  className={clsx(
                    // i === 1 ? "h-96" : "h-72",
                    "object-cover w-full"
                  )}
                />
              ) : (
                <>
                  <div className="absolute top-0 left-0 right-0 bottom-0 rounded-2xl bg-[#BD00FF] opacity-20 z-10" />
                  {/* <div className="bg-gradient-to-b z-10 from-transparent to-smoke-750 absolute top-0 right-0 left-0 bottom-0 rounded-2xl" /> */}
                </>
              )}

              <div className="absolute top-8 left-0 right-0 flex flex-col items-center">
                <img
                  src={item}
                  className={clsx(
                    "z-20",
                    // i === 1 ? "h-60" : "h-12",
                    "object-cover w-5/6 max-h-28"
                  )}
                  alt="reward"
                />
                <div className="pt-2">
                  <RewardsDesc
                    size={i === 1 ? "lg" : "md"}
                    text={
                      i === 0 ? "FLEX BIKE" : i === 1 ? "MI BAND" : "FLEX ROW"
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RewardsIllustration;
