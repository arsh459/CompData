import CreateModal from "@templates/community/Program/CreateModal/CreateModal";
import CloseBtn from "../Program/Feed/CloseBtn";
import CirclePercent from "@components/CirclePercent";
import UserImage from "@templates/listing/Header/UserImage";
import { getLevelColor } from "@templates/LandingPage/levelColor";
import { UserRank } from "@models/Activities/Activity";
import { getCalTolFP } from "../NewCommunitySection/utils";
import ChallangePointsDetails from "./ChallangePointsDetails";
import { SprintObject } from "@models/Event/Event";
import Arrow from "./Arrow";
// import Link from "next/link";

interface Props {
  isOpen: boolean;
  onCloseModal: () => void;
  userRank: UserRank;

  gameStarts?: number;
  sprints?: SprintObject[];
  leaderboardMonth?: string;
  yesterday: string;
  dayBefore: string;
}

const PlayerDetailsModal: React.FC<Props> = ({
  isOpen,
  onCloseModal,
  userRank,
  gameStarts,
  sprints,
  leaderboardMonth,
  yesterday,
  dayBefore,
}) => {
  const userLvl: number = userRank.userLevelV2 ? userRank.userLevelV2 : 0;
  const levelColor: string = getLevelColor(userLvl).colorPrimary;

  return (
    <CreateModal
      onBackdrop={onCloseModal}
      onButtonPress={onCloseModal}
      isOpen={isOpen}
      heading=""
      onCloseModal={onCloseModal}
      bgData="bg-gradient-to-b from-white/40 to-[#C8C8C8]/40 backdrop-blur-2xl fixed inset-0 z-50 w-full h-full mx-auto"
    >
      <div className="w-full h-full flex flex-col justify-center text-white p-4">
        <div className="flex items-center justify-between">
          <a href={`/p/${userRank.uid}`}>
            <div className="flex items-center">
              <CirclePercent
                percent={
                  userRank.userProgress ? userRank.userProgress * 100 : 0
                }
                circleSize={50}
                color={{ colorPrimary: levelColor, colorSecondary: levelColor }}
              >
                <div className="p-[15%]">
                  <UserImage
                    image={userRank.authorImg}
                    name={userRank.authorName}
                    pointer="cursor-default"
                    boxWidth="w-full"
                    boxHeight="h-full"
                  />
                </div>
              </CirclePercent>

              <h1 className="text-[#203C51] iphoneX:text-xl font-bold px-2 flex-1 line-clamp-1">
                {userRank.authorName}
              </h1>
            </div>
          </a>
          <div className="">
            <CloseBtn onCloseModal={onCloseModal} tone="dark" />
          </div>
        </div>
        <div className="bg-gradient-to-b from-[#0A568C] to-[#002D4D] rounded-xl my-4">
          <div className="flex justify-center p-4">
            <p className="flex-[40%] place-self-start text-xs iphoneX:text-sm">
              @{userRank.teamName}
            </p>
            <div className="w-px bg-white/25" />
            <p className="flex-[30%] place-self-center text-center font-bold text-sm iphoneX:text-base">
              Lvl {userLvl}
            </p>
            <div className="w-px bg-white/25" />
            <div className="flex-[30%] flex justify-end items-center font-bold">
              <Arrow
                each={userRank}
                yesterday={yesterday}
                dayBefore={dayBefore}
              />
              <p className="pl-2 text-sm iphoneX:text-base">
                {getCalTolFP(
                  userRank.totalCalories ? userRank.totalCalories : 0
                )}
                FP
              </p>
            </div>
          </div>
          <div className="h-px bg-white/25" />
          <div className="flex items-center p-2 flex-wrap text-sm iphoneX:text-base">
            <p className="p-2">Acheivements</p>
            {userRank.prizes.map((each, index, arr) => (
              <p key={`${each}-${index}`} className="m-2">
                {each}
              </p>
            ))}
          </div>
        </div>
        <ChallangePointsDetails
          name={userRank.authorName}
          totalPoints={
            userRank?.monthPointObj &&
            leaderboardMonth &&
            userRank?.monthPointObj[leaderboardMonth]
              ? userRank?.monthPointObj[leaderboardMonth]
              : 0
          }
          dayPointObj={userRank.dayPointObj}
          bgColor="from-[#0A568C] to-[#002D4D]"
          leaderboardMonth={leaderboardMonth}
          sprints={sprints}
          gameStarts={gameStarts}
        />
      </div>
    </CreateModal>
  );
};

export default PlayerDetailsModal;
