import { weEventTrack } from "@analytics/webengage/user/userLog";
import WaveBtn from "@components/WaveBtn";
import { CoachRank } from "@models/Activities/Activity";
import Arrow from "@templates/community/LeaderboardWrapper/Arrow";
// import { EventInterface } from "@models/Event/Event";
import UserPhoto from "@templates/community/Program/Feed/PostView/UserPhoto";
import {
  getPointsToShow,
  getRank,
  // getPointsToShow,
} from "@templates/community/Program/MemberStrip/utils";

interface Props {
  team: CoachRank;
  month?: string;
  week?: string;
  yesterday: string;
  dayBefore: string;
}

const TeamCard: React.FC<Props> = ({
  team,
  month,
  week,
  yesterday,
  dayBefore,
}) => {
  const rank = getRank(team, week, month);
  const pts = getPointsToShow(team, week, month);

  // console.log("team", team.teamName);

  return (
    <div className="rounded-2xl p-2 relative bg-gray-100 w-full">
      <div className="flex rounded-2xl p-2 shadow-sm bg-white">
        <div className="flex justify-center items-center">
          <UserPhoto
            name={team.authorName}
            img={team.authorImg}
            nameInvisible={true}
            // size="medium"
            onImgClick={() => {}}
          />
        </div>
        <div className="flex-[2]">
          <div className="flex items-center pl-2 iphoneX:pl-4">
            <Arrow
              size="small"
              each={team}
              yesterday={yesterday}
              dayBefore={dayBefore}
            />
            <p className="pl-2 text-gray-700 text-base font-medium text-left line-clamp-1">
              {team.teamName ? team.teamName : "Influencer Team"}
            </p>
          </div>
          <p className="pl-2 iphoneX:pl-4 text-xs iphoneX:text-sm text-gray-700 text-left line-clamp-1">
            {team.authorName}
          </p>

          <p className="pl-2 iphoneX:pl-4 text-blue-500 font-medium text-left text-sm iphoneX:text-base">
            {pts ? `${pts} FPs` : "yet to start"}
          </p>
        </div>
        <div className="flex-1 flex flex-col items-end">
          <p className="text-right italic font-semibold text-sm iphoneX:text-base">
            Rank {rank}
          </p>
        </div>
      </div>

      <div className="absolute right-0 bottom-0 bg-gray-100 rounded-2xl">
        <div className="flex h-full p-2 justify-end items-center w-full">
          <a
            href={`/joinBoatV3/${encodeURI(team.teamKey ? team.teamKey : "")}`}
            className="w-24 iphoneX:w-32 text-xs iphoneX:text-sm"
          >
            <WaveBtn
              text="Join"
              gotoComponent={() => {
                weEventTrack("game_join_team", {
                  team_name: team.teamName ? team.teamName : "no_team_name",
                  leader_name: team.authorName ? team.authorName : "no_name",
                  rank: rank ? rank : -1,
                });
              }}
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
