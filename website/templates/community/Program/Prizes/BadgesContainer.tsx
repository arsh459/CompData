import { EventInterface } from "@models/Event/Event";
import Loading from "@components/loading/Loading";
import usePrizes from "@hooks/badges/usePrizes";
import MediaTile from "@templates/listing/HeaderImage/MediaTile";
import { getHeight } from "../getAspectRatio";
import { useState } from "react";
import PrizesModal from "./PrizesV2/PrizesModal";
import clsx from "clsx";
// import WhatYouGainWidget from "./WhatYouGainWidget";
// import GameGoalContainer from "./GameGoalContainer/GameGoalContainer";
import BadgeSelector from "./PrizesV2/Badges/BadgeSelector";

interface Props {
  parentEvent: EventInterface;
  paddingTop?: boolean;
}

const BadgesContainer: React.FC<Props> = ({ parentEvent, paddingTop }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { badges, prizes, isFetched } = usePrizes(parentEvent.id, undefined);

  return (
    <>
      <h4 className="text-xl iphoneX:text-3xl font-bold px-4 pt-10 iphoneX:pt-20 text-center">
        What you can win?
      </h4>
      {/* <GameGoalContainer game={parentEvent} /> */}
      {/* <div className="bg-[#1F1F1F]/25 border border-[#373737] mx-4 my-7 iphoneX:my-14 p-2 iphoneX:p-4 rounded-xl relative z-0">
        <div className="flex justify-around items-centers text-[#EBEBEB]">
          {parentEvent.whoIsItFor?.slice(0, 3).map((item, index) => {
            return (
              <div key={`kp-${index}`}>
                <WhatYouGainWidget item={item} />
              </div>
            );
          })}
        </div>
        <p className="text-xs iphoneX:text-base p-2 iphoneX:p-4 text-[#D7D7D7]">
          Game is designed that you accomplish the above in the duration. In
          addition to this you can unlock exciting rewards and benefits
        </p>
      </div> */}
      <div className="mx-4 my-8 grid gap-2.5 iphoneX:gap-4">
        {badges.map((badge) => {
          if (badge.pinned) {
            return (
              <div
                key={badge.badgeId}
                className="flex items-center border border-[#CDCDCD] rounded-2xl p-2.5 iphoneX:p-4"
              >
                <div className="flex-[0.25] mr-2.5 iphoneX:mr-4">
                  <BadgeSelector badgeType={badge.badgeId} />
                </div>
                <div className="flex-[0.75] iphoneX:text-xl">
                  <p className="font-semibold">{badge.name}</p>
                  <p>{badge.description}</p>
                </div>
              </div>
            );
          } else {
            null;
          }
        })}
      </div>

      <h4 className="text-xl iphoneX:text-3xl font-bold px-4 pb-4 text-center">
        You can also win
      </h4>

      {isFetched ? (
        <div className="bg-[#1F1F1F]/25 my-4 py-2 iphoneX:py-4 border-y border-[#949494]">
          <div className="w-full no-scrollbar scrollbar-hide overflow-x-scroll">
            {(prizes.length > 3
              ? [
                  prizes.slice(0, Math.ceil(prizes.length / 2)),
                  prizes.slice(Math.ceil(prizes.length / 2)),
                ]
              : [prizes]
            ).map((each, index) => (
              <div
                key={`prize-array-${index}`}
                className={clsx(
                  "flex",
                  prizes.length < 5 && "justify-evenly",
                  index === 0 && "pb-2 iphoneX:pb-4"
                )}
              >
                {each.map((item, ind) => (
                  <div
                    key={`${item.name}-${ind}`}
                    className={clsx(
                      "flex flex-col py-2  justify-around items-center px-2 iphoneX:px-4"
                    )}
                  >
                    <div className="w-32 aspect-w-3 aspect-h-2 ">
                      <MediaTile
                        media={item.media}
                        alt="media"
                        width={400}
                        height={getHeight(item.media, 400)}
                        objectString="object-contain"
                      />
                    </div>
                    <p className="text-[10px] break-all text-center iphoneX:text-sm pt-2 line-clamp-1">
                      {item.name}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="h-px bg-[#949494] my-2 iphoneX:my-4" />
          <div className="flex justify-center items-center">
            <button
              className="text-[#F8F8F8] text-sm iphoneX:text-lg"
              onClick={() => setIsOpen(true)}
            >
              Explore All Rewards
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-56">
          <Loading fill="#ff735c" height={40} width={40} />
        </div>
      )}
      <PrizesModal isOpen={isOpen} setIsOpen={setIsOpen} prizes={prizes} />
    </>
  );
};

export default BadgesContainer;
