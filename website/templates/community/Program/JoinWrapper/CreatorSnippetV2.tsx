// import { useLeaderboard } from "@hooks/user/useLeaderboard";
// import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import clsx from "clsx";
// import UserPhoto from "../Feed/PostView/UserPhoto";

interface Props {
  numStudents?: number;
  selected?: boolean;

  // leader?: LeaderBoard;
  teamName: string;
}

const CreatorSnippetV2: React.FC<Props> = ({
  selected,
  // leader,
  numStudents,
  teamName,
}) => {
  return (
    <div>
      <div className="flex flex-col items-center">
        <div>
          <p className="text-gray-700 font-semibold text-sm text-center">
            {teamName}
          </p>
          <p
            className={clsx(
              "text-gray-500 text-center",
              "text-xs"
              // "font-semibold"
            )}
          >
            {selected
              ? "Your team"
              : numStudents
              ? `${numStudents} participants`
              : ""}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreatorSnippetV2;
