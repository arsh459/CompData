// import { ROUND_LENGTH, SPRINT_LENGTH } from "@constants/gameStats";
import { ListItem } from "@templates/listing/NumberedList/NumberedList";
// import LeaderWrapper from "../MemberStrip/LeaderWrapper";
import PrizesWrapper from "../Prizes/PrizesWrapper";

interface Props {
  parentId: string;
  communityId: string;
  prizes?: ListItem[];
}

const LeaderboardPost: React.FC<Props> = ({
  parentId,
  communityId,
  prizes,
}) => {
  // console.log("prizes", prizes);
  return (
    <div className="bg-gray-50 p-2 sm:p-4 rounded-lg">
      <div className="pb-4">
        <p className="text-xl text-gray-600 font-semibold text-center">
          Leaderboard
        </p>
      </div>
      {/* <LeaderWrapper
        // selectedLeaderboard="calories"
        leaderboardWeek="overall"
        onLeaderboardWeekChange={() => {}}
        // leaderDescription={[]}
        eventKey={""}
        onLeaderboardMonthChange={() => {}}
        leaderboardMonth=""
        // onLeaderboardChange={() => {}}
        parentId={parentId}
        // sprintLength={SPRINT_LENGTH}
        // roundLength={ROUND_LENGTH}
        communityId={communityId}
        savedList={[]}
        isAdmin={false}
      /> */}

      {prizes && prizes.length > 0 ? (
        <div className="pb-4 pt-4">
          <PrizesWrapper
            heading="🏆 Weekly Fitness Prizes 🏆"
            prizes={prizes}
            setPostRequest={() => {}}
            size="small"
          />
        </div>
      ) : null}
    </div>
  );
};

export default LeaderboardPost;
