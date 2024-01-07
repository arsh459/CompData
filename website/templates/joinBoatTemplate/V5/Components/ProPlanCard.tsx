import React from "react";
import { PlanContent } from "@templates/joinBoatTemplate/utils";
import clsx from "clsx";

interface Props {
  plan: PlanContent;
}
const ProPlanCard: React.FC<Props> = ({ plan }) => {
  const { colors, currency, duration, price } = plan;
  const gradient = colors.length
    ? ` from-[${colors[0]}] to-[${colors[1]}]`
    : "";

  return (
    <div
      className={clsx(" rounded-xl border  ")}
      style={{
        width: "30%",
        borderColor: "#FFFFFF42",
        backgroundImage: `linear-gradient(96.17deg,${colors[0]}  16.81%, ${colors[1]} 85.08%)`,
        aspectRatio: 216 / 248,
      }}
    >
      <div
        className={clsx("backdrop-blur-3xl   items-center p-2 rounded-t-xl  ")}
        style={{
          backgroundColor: "#100F1A70",
        }}
      >
        <p
          style={{
            backgroundImage: `linear-gradient(96.17deg,${colors[0]}  16.81%, ${colors[1]} 85.08%)`,
          }}
          className={clsx(
            "font-baib text-transparent text-center text-2xl sm:text-3xl lg:text-4xl bg-clip-text  bg-gradient-to-b "
          )}
        >
          {currency}
        </p>
        <p
          style={{
            backgroundImage: `linear-gradient(96.17deg,${colors[0]}  16.81%, ${colors[1]} 85.08%)`,
          }}
          className={clsx(
            "font-baib text-transparent text-center text-3xl  sm:text-4xl lg:text-5xl bg-clip-text  "
          )}
        >
          {price}
        </p>
      </div>
      <div className={clsx("rounded-b-xl", gradient)}>
        <p className="text-center font-baiSb py-2  text-xs iphoneX:text-sm text-[#000000]">
          {duration}
        </p>
      </div>
    </div>
  );
};

export default ProPlanCard;
