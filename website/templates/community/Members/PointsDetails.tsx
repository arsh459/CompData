// import Divider from "@components/divider/Divider";
// import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import clsx from "clsx";
// import MinCalScore from "./MinCalScore";
// import UserPhoto from "../Program/Feed/PostView/UserPhoto";
import { getPointString } from "./utils";
// import { Link } from "@mui/material";

interface Props {
  points?: number;
  // streaks?: number;
  userLevel?: number;
  isExpandable: boolean;
  onShow: () => void;
  isVisible: boolean;
  // visibleType: "calories" | "minCalScore";
}

const PointsDetails: React.FC<Props> = ({
  points,
  isExpandable,
  isVisible,
  onShow,
  userLevel,
  // streaks,
  // scoreMinCal,
  // visibleType,
}) => {
  // console.log("streaks", userLevel);
  return (
    <div>
      <div className="flex items-center cursor-pointer" onClick={onShow}>
        <p
          className={clsx(
            "text-orange-500 text-center",
            "text-base font-serif font-medium",
            isExpandable ? "underline" : ""
          )}
        >
          {typeof points === "number" ? getPointString(points) : "0"}
        </p>

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
      {typeof userLevel === "number" ? (
        <div className="flex justify-end pt-0.5">
          <div className="bg-blue-500 rounded-md px-2 py-1 shadow-md">
            <p className="text-center text-xs font-semibold text-white ">{`Level ${userLevel}`}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default PointsDetails;
