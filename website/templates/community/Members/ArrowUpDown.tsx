// import Divider from "@components/divider/Divider";
// import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import clsx from "clsx";
// import UserPhoto from "../Program/Feed/PostView/UserPhoto";
import { getCalString } from "./utils";
// import { Link } from "@mui/material";

interface Props {
  calories?: number;
  lastTotalCalories?: number;
}

const ArrowUpDown: React.FC<Props> = ({ calories, lastTotalCalories }) => {
  // console.log("coach", coachEventId);
  return (
    <div>
      {lastTotalCalories && calories && lastTotalCalories !== calories ? (
        <div className="flex items-center">
          {lastTotalCalories < calories ? (
            <p className="text-center text-xs sm:text-xs text-green-500">+</p>
          ) : (
            <p className="text-center text-xs sm:text-xs text-red-500">-</p>
          )}
          <p
            className={clsx(
              "text-center",
              "text-xs sm:text-xs",
              lastTotalCalories < calories ? "text-green-500" : "text-red-400"
            )}
          >
            {getCalString(Math.abs(calories - lastTotalCalories))}
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default ArrowUpDown;
