// import Divider from "@components/divider/Divider";
import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import clsx from "clsx";
import Boat2 from "./Boat2";

interface Props {
  boats: LeaderBoard[];
}

const BoatsTemplate: React.FC<Props> = ({ boats }) => {
  //   console.log("boats", boats);
  return (
    <div className="">
      <div className="min-h-screen p-12 rounded-b-xl">
        <div className="pb-10">
          <h1 className="text-5xl font-medium text-gray-700 text-center ">
            Our boats
          </h1>
          <p className="text-gray-500 text-xl font-light text-center">
            Discover creator communities
          </p>
        </div>
        <div
          className={clsx(
            // "bg-green-50",

            "gap-y-10",
            "justify-items-center",
            "max-w-screen-xl mx-auto",
            "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          )}
        >
          {boats.map((item, index) => {
            if (item.userKey) {
              return (
                <div key={item.uid}>
                  <Boat2 boatData={item} paused={index > 3} />
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default BoatsTemplate;
