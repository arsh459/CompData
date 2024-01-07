import clsx from "clsx";
import React from "react";
import Button from "@components/button/index";
import ProgressBar from "./progressbar";
import { formatWithCommas } from "utils/number";
// import { getCloudinaryURLWithParams } from "@utils/cloudinary";

interface Props {
  url: string;
  name: string;
  live: boolean;
  numCardsInWidth?: number;
  cost?: number;
  currency?: string;
  campaign?: boolean;
  funded?: number;
  paused?: boolean;
  imgMode?: boolean;
}

const VideoCard: React.FC<Props> = ({
  url,
  name,
  live,
  numCardsInWidth,
  cost,
  currency,
  campaign,
  funded,
  paused,
  imgMode,
}) => {
  return (
    <div className={clsx("")}>
      {!imgMode ? (
        <video
          preload="auto"
          autoPlay={!paused}
          loop
          muted={true}
          controls={false}
          src={url}
          className={clsx(
            "object-cover z-0 rounded-xl shadow-2xl",
            "w-full",
            // "h-24"
            // "w-60",
            "",
            numCardsInWidth && numCardsInWidth === 2 ? "w-48 h-48" : ""
          )}
          playsInline
        />
      ) : (
        <img
          loading="lazy"
          alt={`img-${name}`}
          src={url}
          className={clsx(
            "object-cover z-0 rounded-xl shadow-2xl",
            // "h-24"
            // "w-60",
            "",
            numCardsInWidth && numCardsInWidth === 2 ? "w-48 h-48" : ""
          )}
        />
      )}
      <div className={clsx("flex justify-between pt-1")}>
        <p className={clsx("text-gray-800 font-medium text-sm")}>{name}</p>
        {live ? (
          <div className={clsx("flex")}>
            <p
              className={clsx(
                "text-red-500 text-right text-xs font-black pr-0.5"
              )}
            >
              ·
            </p>
            <p
              className={clsx("text-red-500 text-right text-xs font-semibold")}
            >
              Live
            </p>
          </div>
        ) : null}
      </div>
      {live ? (
        <div className={clsx("flex justify-start pt-1")}>
          <Button appearance="contained" size="small">
            <p className={clsx("capitalize text-right text-xs")}>Join</p>
          </Button>
        </div>
      ) : null}
      {cost && currency && !campaign ? (
        <div className={clsx("flex")}>
          <p className={clsx("text-sm text-gray-600 pr-2")}>Join for</p>
          <p className={clsx("text-xs text-orange-500 font-light")}>
            {currency}
          </p>
          <p className={clsx("text-sm text-gray-700 font-semibold")}>{cost}</p>
        </div>
      ) : cost && funded && currency && campaign ? (
        <div>
          <ProgressBar currency={currency} total={cost} funded={funded} />
          <p className={clsx("text-sm text-gray-600 pt-1")}>
            {currency}
            {formatWithCommas(cost - funded)} left | 2 days left
          </p>
          <p className={clsx("text-sm text-gray-600 italic")}>
            Learn, contribute & help
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default VideoCard;
