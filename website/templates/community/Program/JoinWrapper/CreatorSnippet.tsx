// import { useLeaderboard } from "@hooks/user/useLeaderboard";
import { profileClick } from "@analytics/click/wrappers";
import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import clsx from "clsx";
import UserPhoto from "../Feed/PostView/UserPhoto";

interface Props {
  numStudents?: number;
  selected?: boolean;

  leader?: LeaderBoard;
}

const CreatorSnippet: React.FC<Props> = ({ selected, leader, numStudents }) => {
  return (
    <div>
      <div className="flex">
        <div>
          <UserPhoto
            name={leader?.name}
            onImgClick={() => {
              profileClick();
            }}
            img={leader?.profileImage}
            leftPadding="pl-2"
            size="xs"
          >
            <p
              className={clsx("text-gray-500 pl-2", "text-xs", "font-semibold")}
            >
              {selected
                ? "Your team"
                : numStudents
                ? `${numStudents} participants`
                : "Be first to join"}
            </p>
          </UserPhoto>
        </div>
      </div>
    </div>
  );
};

export default CreatorSnippet;
