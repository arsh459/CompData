import WaveBtn from "@components/WaveBtn";
import { Badge, BadgeAward } from "@models/Prizes/PrizeV2";
import { useState } from "react";
import BadgeSelector from "./Badges/BadgeSelector";
import ClaimModal from "./ClaimModal";
import FPMeater from "./FPMeater";
import AllPrizes from "./AllPrizes";
import WinningFP from "./WinningFP";
import Link from "next/link";
import { weEventTrack } from "@analytics/webengage/user/userLog";
// import { useCompetition } from "@hooks/activities/useCompetition";
import { useCompetition } from "@hooks/activities/useCompetition";
// import { getBadgeUserType } from "./Badges/utils";
import { CoachRank, UserRank } from "@models/Activities/Activity";
import { getCompetitionParams, getPtsAndProgress } from "./utils";
import { UserInterface } from "@models/User/User";
import clsx from "clsx";
import { GameKPITarget, gameTypes } from "@models/Event/Event";

interface Props {
  badge: BadgeAward | Badge;
  // totalPoints?: number;
  signedInUserId?: string;
  // myPoints?: number;
  gameId: string;
  leaderKey: string;
  eventKey: string;
  roundId?: string;
  sprintId?: string;
  userRank?: UserRank;
  teamRank?: CoachRank;
  user: UserInterface;
  hidePrizes?: boolean;
  isGoalWidget?: boolean;
  hidePlayNow?: boolean;
  gameKPIs?: GameKPITarget[];
  gameType?: gameTypes;
}

const PrizeCard: React.FC<Props> = ({
  badge,
  // totalPoints,
  signedInUserId,
  gameType,
  gameId,
  leaderKey,
  eventKey,
  roundId,
  sprintId,
  userRank,
  teamRank,
  user,
  hidePrizes,
  isGoalWidget,
  hidePlayNow,
  gameKPIs,
}) => {
  // const isWoned: boolean = badge.hasOwnProperty("state") ? true : false;
  const isWoned: boolean = false;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [prizesHidden, setHidePrizes] = useState<boolean>(
    hidePrizes ? true : false
  );

  const { badgeTypes, rank, frequency } = getCompetitionParams(badge);

  const { competition } = useCompetition(
    gameId,
    rank,
    rank,
    badgeTypes,
    roundId ? roundId : "overall",
    sprintId,
    frequency
  );

  // console.log("frequency", frequency);

  const { progress, pts, total, percent } = getPtsAndProgress(
    user,
    userRank,
    teamRank,
    competition,
    badge.badgeId,
    roundId,
    sprintId,
    gameKPIs,
    frequency === "week" ? "weekly" : "monthly",
    gameType
  );

  // console.log(
  //   gameKPIs,
  //   badge.badgeId,
  //   badge.frequency,
  //   badge.name,
  //   userRank?.authorName,
  //   userRank?.kpiScoresV2,

  //   sprintId,
  //   roundId,
  //   // sprintId,
  //   competition?.weeklyRank,
  //   "progress:",
  //   progress,
  //   "pts",
  //   pts,
  //   "total",
  //   total
  // );
  // console.log("g", userRank?.kpiScores);

  // console.log(
  //   "pr",
  //   progress,
  //   pts,
  //   total,
  //   // competition,
  //   // userRank,
  //   badge.badgeId,
  //   roundId,
  //   sprintId
  // );

  return (
    <div className="bg-[#434343] rounded-xl text-white">
      <div
        className={clsx(
          "grid gap-2 iphoneX:gap-4 place-items-center p-2 iphoneX:p-4"
        )}
        style={{ gridTemplateColumns: isGoalWidget ? "1fr 3fr" : "2fr 4fr" }}
      >
        <BadgeSelector badgeType={badge.badgeId} />
        <div className="w-full self-start">
          {isWoned ? (
            <p
              className={clsx(
                isGoalWidget ? "text-xs iphoneX:text-sm" : "iphoneX:text-xl",
                "p-2"
              )}
            >
              Congatutions you have earned the{" "}
              <span className="font-bold capitalize ">{badge.name}</span> Badge.
            </p>
          ) : badge.winner ? (
            <WinningFP
              badgeType={badge.badgeId}
              name={badge.winner.winnerName}
              points={badge.winner.points}
              myPoints={0}
              isMe={badge.winner.uid === signedInUserId}
              isGoalWidget={isGoalWidget}
            />
          ) : (
            <FPMeater
              progress={progress < 10 ? 10 : progress > 100 ? 100 : progress}
              total={total}
              pts={pts}
              canFinish={competition ? false : true}
              percent={percent}
              description={badge.description}
              isGoalWidget={isGoalWidget}
            />
          )}
        </div>

        <p
          className={clsx(
            isGoalWidget
              ? "text-[8px] xs:text-[10px] iphoneX:text-xs"
              : "text-sm iphoneX:text-base font-bold",
            "text-center"
          )}
        >
          {badge.name}
        </p>
        <div
          className={clsx(
            isGoalWidget
              ? "text-[8px] xs:text-[10px] iphoneX:text-xs"
              : "text-xs iphoneX:text-sm",
            "justify-self-end flex items-center"
          )}
        >
          {hidePrizes === true ? (
            <div
              className={clsx(
                isGoalWidget ? "px-2 iphoneX:px-4" : "px-4 iphoneX:px-8",
                " py-0.5 iphoneX:py-1.5 rounded-full cursor-pointer bg-white/80 flex justify-center items-center"
              )}
              onClick={() => setHidePrizes((p) => !p)}
            >
              <img
                src={`https://ik.imagekit.io/socialboat/Vector_WZherwDVk.png?ik-sdk-version=javascript-1.4.3&updatedAt=1656661183191`}
                alt="show icon"
              />
              <p className="text-black pl-1 iphoneX:pl-2 whitespace-nowrap">
                {prizesHidden ? "Show Prizes" : "Hide Prizes"}
              </p>
            </div>
          ) : null}
          {progress === 100 && !competition ? (
            <div className="w-28 iphoneX:w-32">
              {
                <WaveBtn
                  text="Claim Now"
                  gotoComponent={() => setIsOpen(true)}
                  color1="#6AA0D1"
                  color2="#5FABC2"
                />
              }
            </div>
          ) : hidePlayNow ? null : (
            <Link href={`/${leaderKey}/${eventKey}/workout`} passHref>
              <button
                className={clsx(
                  isGoalWidget ? "px-2 iphoneX:px-4" : "px-4 iphoneX:px-8",
                  "ml-1 iphoneX:ml-2 py-0.5 iphoneX:py-1.5 bg-gradient-to-r from-[#6AA0D1] to-[#5FABC2] rounded-full flex justify-center items-center"
                )}
                onClick={() => {
                  weEventTrack("gamePrizes_playNow", { prizeName: badge.name });
                }}
              >
                <img
                  src={`https://ik.imagekit.io/socialboat/Polygon_164_WmeSsYsnw.png?ik-sdk-version=javascript-1.4.3&updatedAt=1656661183222`}
                  alt="play icon"
                />
                <p className="pl-1 iphoneX:pl-2 whitespace-nowrap">Play Now</p>
              </button>
            </Link>
          )}
        </div>
      </div>
      {badge.prizes.length > 0 && !prizesHidden ? (
        <div className="p-2">
          <AllPrizes
            prizes={badge.prizes}
            badgeName={badge.name}
            isGoalWidget={isGoalWidget}
          />
        </div>
      ) : null}
      <ClaimModal
        isOpen={isOpen}
        onCloseModal={() => setIsOpen(false)}
        badgeType={badge.badgeId}
        prizes={badge.prizes}
      />
    </div>
  );
};

export default PrizeCard;
