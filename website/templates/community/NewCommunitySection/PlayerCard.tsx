import { getLevelColor } from "@templates/LandingPage/levelColor";
import UserImage from "@templates/listing/Header/UserImage";
// import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import clsx from "clsx";
// import { UserInterface } from "@models/User/User";
import { UserRank } from "@models/Activities/Activity";

interface Props {
  player: UserRank;
  month: string;
}

const PlayerCard: React.FC<Props> = ({ player, month }) => {
  const levelColor: string = getLevelColor(
    player.userLevelV2 ? player.userLevelV2 : 0
  ).colorPrimary;

  // console.log("player", player.userLevelV2, player.progressV2);

  return (
    <div
      className={clsx(
        "grid gap-x-5 gap-y-3 py-2 px-8 bg-white/70",
        "text-[#203C51] italic items-center mb-2"
      )}
      style={{ gridTemplateColumns: "max-content auto" }}
    >
      <div
        className="w-max h-max mx-auto p-0.5 rounded-full"
        style={{
          backgroundColor: levelColor,
        }}
      >
        <UserImage
          image={player.authorImg}
          name={player.authorName}
          pointer="cursor-default"
          unknown={!player.authorImg && !player.authorName}
        />
      </div>
      <div className="grid gap-4">
        <div className="flex items-end">
          <h3 className="flex-1 font-bold text-2xl">{player.authorName}</h3>
          <p className="text-xl whitespace-nowrap">
            Lvl {player.userLevelV2 ? player.userLevelV2 : 0}
          </p>
        </div>
        {/* <div className="border border-[#203C51] rounded-full">
          <div
            className="h-1.5 m-0.5 bg-[#203C51] rounded-full"
            style={{
              width: `${
                player.progressV2 ? Math.round(player.progressV2 * 100) : 0
              }%`,
            }}
          />
        </div> */}
      </div>

      <p className="font-bold text-lg">Rank {player.rank ? player.rank : 0}</p>
      <p className="font-bold text-lg justify-self-end">
        Earned {player?.monthPointObj ? player.monthPointObj[month] : 0} FP
      </p>
    </div>
  );
};

export default PlayerCard;
