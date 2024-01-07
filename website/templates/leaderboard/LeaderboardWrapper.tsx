import { scoreEntriesSample } from "@templates/listing/constants";
import Scoreboard from "@templates/listing/Scoreboard/Scoreboard";

interface Props {
  noHeading?: boolean;
  numEntries: number;
}

const LeaderboardWrapper: React.FC<Props> = ({ noHeading, numEntries }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg">
      <Scoreboard
        scoreEntries={scoreEntriesSample.slice(0, numEntries)}
        noHeading={noHeading}
      />
    </div>
  );
};

export default LeaderboardWrapper;
