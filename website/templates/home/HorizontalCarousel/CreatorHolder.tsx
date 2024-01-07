import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import Boat2 from "@templates/boats/Boat2";

interface Props {
  creators: LeaderBoard[];
}

const CreatorHolder: React.FC<Props> = ({ creators }) => {
  return (
    <>
      {creators.map((item, index) => {
        // console.log("item", item);
        return (
          <div key={item.uid} className="pr-12">
            <div>
              <Boat2 boatData={item} paused={true} />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default CreatorHolder;
