// import Divider from "@components/divider/Divider";
// import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import clsx from "clsx";
import MinCalScore from "./MinCalScore";
// import UserPhoto from "../Program/Feed/PostView/UserPhoto";
import { getCalString } from "./utils";
// import { Link } from "@mui/material";

interface Props {
  calories?: number;
  streaks?: number;
  scoreMinCal?: number;
  isExpandable: boolean;
  onShow: () => void;
  isVisible: boolean;
  // visibleType: "calories" | "minCalScore";
}

const CalDetails: React.FC<Props> = ({
  calories,
  isExpandable,
  isVisible,
  onShow,
  streaks,
  scoreMinCal,
  // visibleType,
}) => {
  // console.log("streaks", streaks);
  return (
    <div>
      <div className="flex items-center cursor-pointer" onClick={onShow}>
        <p
          className={clsx(
            "text-gray-700 text-center",
            "text-sm sm:text-sm font-medium",
            isExpandable ? "underline" : ""
          )}
        >
          {typeof calories === "number"
            ? getCalString(calories)
            : streaks
            ? `${streaks} streak(s)`
            : "0"}
        </p>

        <div></div>

        {isVisible && isExpandable ? (
          <div className="pl-1">
            <img
              className="w-3 h-3 object-cover"
              src="https://img.icons8.com/ios-glyphs/30/000000/chevron-down.png"
            />
          </div>
        ) : isExpandable ? (
          <div className="pl-1">
            <img
              className="w-3 h-3 object-cover"
              src="https://img.icons8.com/ios-glyphs/30/000000/chevron-up.png"
            />
          </div>
        ) : null}
      </div>
      {typeof scoreMinCal === "number" ? (
        <MinCalScore scoreMinCal={scoreMinCal} />
      ) : null}
    </div>
  );
};

export default CalDetails;
