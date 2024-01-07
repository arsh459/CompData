import { navLevels } from "@hooks/community/useCommunityParams";
import { UserRank } from "@models/Activities/Activity";
import Tile, { TileProps } from "./Tile";
// import WorkoutPostSection from "./WorkoutPostSection";
import { Link } from "@mui/material";

interface Props {
  savedList: string[];
  myUserRank?: UserRank;
  wearableConnected: boolean;
  onNavChange: (navLevel: navLevels) => void;
  buttonType: "none" | "join" | "wearable";
  onNewPostRequest: () => void;
  onTerraWidget: () => void;
  onSeeAll: () => void;
  nowIndex: number;
}

const tiles: TileProps[] = [
  // {
  //   text: "Workouts 🏋️",
  //   key: "workouts",
  //   subtitle: "By your coach",
  // },
  {
    text: "Rewards 🏅",
    key: "rewards",
    subtitle: "Workout to win",
  },
  {
    text: "How to? 🤔",
    key: "",
    link: "/blog",
    subtitle: "User guides",
  },
];

const RedirectSection: React.FC<Props> = ({
  myUserRank,
  savedList,
  wearableConnected,
  onNavChange,
  buttonType,
  onNewPostRequest,
  onTerraWidget,
  onSeeAll,
  nowIndex,
}) => {
  const handleClick = (text: string) => {
    // if (text === "workouts") {
    //   onNavChange("workouts");
    // } else

    if (text === "rewards") {
      // onNavChange("rewards");
    }
  };

  return (
    <div className=" ">
      {/* {buttonType !== "join" ? (
        <div className="pb-2">
          <div className="bg-white py-4 px-4 shadow-sm rounded-lg ">
            <WorkoutPostSection
              savedList={savedList}
              userRank={myUserRank}
              dayCalObj={myUserRank?.dayCalObj}
              wearableConnected={wearableConnected}
              onNewPostRequest={onNewPostRequest}
              onTerraWidget={onTerraWidget}
              onSeeAll={onSeeAll}
              nowIndex={nowIndex}
            />
          </div>
        </div>
      ) : null} */}

      <div className="flex flex-wrap">
        {tiles.map((item) => {
          if (item.link) {
            return (
              <div
                key={item.text}
                onClick={() => handleClick(item.key)}
                className="w-1/2 h-[120px] pl-1"
              >
                <Link href={item.link} target="_blank">
                  <Tile
                    text={item.text}
                    subtitle={item.subtitle}
                    key={item.key}
                  />
                </Link>
              </div>
            );
          } else {
            return (
              <div
                onClick={() => handleClick(item.key)}
                key={item.text}
                className="w-1/2 h-[120px]"
              >
                <Tile
                  text={item.text}
                  subtitle={item.subtitle}
                  key={item.key}
                />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default RedirectSection;
