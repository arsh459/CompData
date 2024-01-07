import { Link } from "@mui/material";
// import { format } from "date-fns";
// import { usePlayers } from "@hooks/players/usePlayers";
import UserImage from "@templates/listing/Header/UserImage";
import { UserRank } from "@models/Activities/Activity";
import { useLeaderboard } from "@hooks/user/useLeaderboard";

interface Props {
  rank: UserRank;
}

const Player: React.FC<Props> = ({ rank }) => {
  const { leader } = useLeaderboard(rank.coachCommunityId);
  return (
    <div className="">
      <div className="flex flex-wrap">
        <Link href={`/p/${rank.uid}`}>
          <div>
            <UserImage image={rank.authorImg} />
            <p className="font-semibold text-lg">{rank.authorName}</p>

            <p className="font-medium text-red-500 capitalize pt-1">
              {rank.teamName}
            </p>
            <p>Coach: {leader?.name}</p>
            <p className="font-medium">TeamId: {rank.eventId}</p>
            <div className="flex flex-wrap">
              {rank.dayPointObj &&
                Object.keys(rank.dayPointObj).map((item) => {
                  return (
                    <div className="p-4" key={item}>
                      <p className="text-center font-medium">
                        {rank.dayPointObj && rank.dayPointObj[item]}FP
                      </p>
                      <p className="text-sm">{item}</p>
                    </div>
                  );
                })}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Player;
