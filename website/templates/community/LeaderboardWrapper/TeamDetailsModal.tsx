import CreateModal from "@templates/community/Program/CreateModal/CreateModal";
import CloseBtn from "../Program/Feed/CloseBtn";
import TeamMembers from "./TeamMembers";
import { CoachRank } from "@models/Activities/Activity";
import { getCalTolFP } from "../NewCommunitySection/utils";
import ChallangePointsDetails from "./ChallangePointsDetails";
import { SprintObject } from "@models/Event/Event";
import Arrow from "./Arrow";

interface Props {
  isOpen: boolean;
  onCloseModal: () => void;
  coachRank: CoachRank;
  tamRank: number;
  gameStarts?: number;
  sprints?: SprintObject[];
  leaderboardMonth?: string;
  yesterday: string;
  dayBefore: string;
}

const TeamDetailsModal: React.FC<Props> = ({
  isOpen,
  onCloseModal,
  coachRank,
  tamRank,
  gameStarts,
  leaderboardMonth,
  sprints,
  yesterday,
  dayBefore,
}) => {
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
        <div className="flex items-center">
          <TeamMembers
            eventId={coachRank.coachEventId}
            pxSize={30}
            hideMemberCount={true}
          />
          <h1 className="text-[#203C51] iphoneX:text-xl font-bold px-2 flex-1 line-clamp-1">
            {coachRank.teamName}
          </h1>
          <CloseBtn onCloseModal={onCloseModal} tone="dark" />
        </div>
        <div className="bg-gradient-to-b from-[#811a37] to-[#74112d] rounded-lg my-4">
          <div className="flex justify-center p-4 text-sm iphoneX:text-base">
            <p className="flex-1 flex justify-between items-center">
              <span className="font-extrabold pr-2">Team Rank</span>
              <span>#{tamRank}</span>
            </p>
            <div className="mx-4 w-px bg-white/25" />
            <div className="flex-1 flex justify-end items-center">
              <Arrow
                each={coachRank}
                yesterday={yesterday}
                dayBefore={dayBefore}
              />
              <p>
                <span className="font-extrabold px-2">
                  {getCalTolFP(
                    coachRank.totalCalories ? coachRank.totalCalories : 0
                  )}
                </span>
                FitPoints
              </p>
            </div>
          </div>
          <div className="h-px bg-white/25" />
          <div className="flex items-center p-2 flex-wrap text-sm iphoneX:text-base">
            <p className="p-2">Acheivements</p>
            {coachRank.prizes.map((each, index) => (
              <p key={`${each}-${index}`} className="m-2">
                {each}
              </p>
            ))}
          </div>
        </div>
        <ChallangePointsDetails
          name={coachRank.teamName}
          gameStarts={gameStarts}
          leaderboardMonth={leaderboardMonth}
          sprints={sprints}
          totalPoints={
            coachRank?.monthPointObj &&
            leaderboardMonth &&
            coachRank?.monthPointObj[leaderboardMonth]
              ? coachRank?.monthPointObj[leaderboardMonth]
              : 0
          }
          dayPointObj={coachRank.dayPointObj}
          bgColor="from-[#811a37] to-[#74112d]"
        />
      </div>
    </CreateModal>
  );
};

export default TeamDetailsModal;
