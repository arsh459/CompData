// import { period } from "@hooks/community/v2/useCommunityParamsV3";
// import { UserRank, CoachRank } from "@models/Activities/Activity";
// import { getUserRank } from "./utils";

interface Props {
  activeRank?: number | string;
  activeTeamRank?: number | string;
}

const UserLeaderboardRank: React.FC<Props> = ({
  activeRank,
  activeTeamRank,
}) => {
  return (
    <div className="flex font-extrabold bg-gradient-to-b from-[#EEEEEE] to-[#C4C4C4] p-4">
      <h3 className="flex-1 flex flex-col justify-center items-center ">
        <span className="text-[#788289] iphoneX:text-xl whitespace-nowrap">
          Your Rank
        </span>
        <span className="text-[#FD6F6F]/75 text-3xl iphoneX:text-5xl italic">
          {activeRank ? `#${activeRank}` : "--"}
        </span>
      </h3>
      <div className="w-0.5 mx-4 bg-[#c7c7c7]" />
      <h3 className="flex-1 flex flex-col justify-center items-center ">
        <span className="text-[#788289] iphoneX:text-xl whitespace-nowrap">
          Team Rank
        </span>
        <span className="text-[#FD6F6F]/75 text-3xl iphoneX:text-5xl italic">
          {activeTeamRank ? `#${activeTeamRank}` : "--"}
        </span>
      </h3>
    </div>
  );
};

export default UserLeaderboardRank;
