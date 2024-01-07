import Button from "@components/button";
import { UserRank } from "@models/Activities/Activity";
import ActivityHolder from "@templates/community/PersonalKPIs/ActivityHolder";
// import { getFatBurn } from "@templates/community/PersonalKPIs/utils";
import { formatWithCommas } from "@utils/number";

interface Props {
  savedList: string[];
  userRank?: UserRank;
  dayCalObj?: { [day: string]: number };
  wearableConnected: boolean;
  onNewPostRequest: () => void;
  onTerraWidget: () => void;
  onSeeAll: () => void;
  nowIndex: number;
}

const WorkoutPostSection: React.FC<Props> = ({
  savedList,
  dayCalObj,
  userRank,
  wearableConnected,
  onNewPostRequest,
  onTerraWidget,
  onSeeAll,
  nowIndex,
}) => {
  // console.log("savedList", savedList);
  return (
    <div className="w-full">
      <p className="text-gray-700 text-center font-semibold">Your Progress</p>
      {userRank ? (
        <div className="pb-4">
          <p className="text-center text-orange-500 text-2xl sm:text-lg">
            {formatWithCommas(userRank?.totalCalories)} calories 💪
          </p>
          <p className="text-center text-gray-700 text-sm">
            {`Don't see your calories?`}
          </p>
          <p className="text-center text-gray-700 text-sm">
            {`Post your workout screenshot`}
          </p>
        </div>
      ) : null}

      <div className="flex overflow-x-scroll">
        {savedList
          .slice(
            nowIndex > 6 ? nowIndex - 5 : nowIndex,
            nowIndex > 6 ? nowIndex + 1 : nowIndex + 6
          )
          .map((item, index) => {
            // console.log("dayCalObj", dayCalObj);
            // if (index < viewable)
            return (
              <div key={`${item}-${index}`} className="w-1/3">
                <ActivityHolder
                  size="small"
                  dateString={item}
                  cal={dayCalObj ? dayCalObj[item] : 0}
                />
              </div>
            );
          })}
      </div>

      <div className="flex pt-4 justify-center">
        <div className="w-1/2 px-2 ">
          <Button appearance="contained" onClick={onNewPostRequest}>
            <p className="font-semibold text-white">Post workout</p>
          </Button>
        </div>
        {!wearableConnected ? (
          <div className="w-1/2 px-2">
            <Button appearance="control" onClick={onTerraWidget}>
              <p className="text-gray-700 font-semibold">Connect wearable</p>
            </Button>
          </div>
        ) : (
          <div className="w-1/2 px-2">
            <Button appearance="control" onClick={onSeeAll}>
              <p className="text-gray-700 font-semibold">See All</p>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutPostSection;
