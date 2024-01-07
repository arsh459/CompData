// import DiscoverGames from "@templates/teamsHome/DiscoverGames";
import { useEffect, useState } from "react";
import ActivityHolder from "../PersonalKPIs/ActivityHolder";
import NextButton from "../Program/NextButton";

interface Props {
  savedList: string[];
  onHide: () => void;
  dayCalObj?: { [day: string]: number };
}

const MemberDetails: React.FC<Props> = ({ dayCalObj, onHide, savedList }) => {
  const [viewable, setViewable] = useState<number>(8);
  const [nextExists, setNextExists] = useState<boolean>(true);

  // console.log("sav", savedList);

  useEffect(() => {
    if (viewable > savedList.length) {
      setNextExists(false);
    }
  }, [viewable, savedList.length]);

  const onNext = () => {
    if (viewable < savedList.length && nextExists) {
      setViewable((prev) => prev + 8);
    } else if (nextExists) {
      setNextExists(false);
    } else {
      onHide();
    }
  };

  return (
    <div>
      <p
        className="text-gray-700 underline text-sm text-center cursor-pointer"
        onClick={onHide}
      >
        Hide Progress
      </p>
      <div className="flex flex-wrap pt-4">
        {savedList.map((item, index) => {
          // console.log("dayCalObj", dayCalObj);
          if (index < viewable)
            return (
              <div key={`${item}-${index}`} className="w-1/4 pb-4">
                <ActivityHolder
                  size="small"
                  dateString={item}
                  cal={dayCalObj ? dayCalObj[item] : 0}
                  suffix="points"
                />
              </div>
            );
        })}
      </div>

      <div className="bg-white w-full mb-4 md:pb-0">
        <NextButton
          onClick={onNext}
          text={nextExists ? "Show More" : "Hide details"}
        />
      </div>

      {/* <div>
        <DiscoverGames heading="Discover other games" />
      </div> */}
    </div>
  );
};

export default MemberDetails;
