// import Divider from "@components/divider/Divider";
// import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import clsx from "clsx";
// import UserPhoto from "../Program/Feed/PostView/UserPhoto";

// import { Link } from "@mui/material";

interface Props {
  scoreMinCal?: number;
  // visibleType: "calories" | "minCalScore";
}

const MinCalScore: React.FC<Props> = ({
  // calories,

  // isVisible,
  // onShow,
  // streaks,
  scoreMinCal,
  // visibleType,
}) => {
  // console.log("streaks", streaks);
  return (
    <div>
      <div className="flex items-center pt-0.5">
        <p
          className={clsx(
            "text-gray-700 text-center",
            "text-xs italic font-mono font-semibold"
          )}
        >
          {typeof scoreMinCal === "number" ? `${scoreMinCal} x` : ""}
        </p>
        <div className="pl-2">
          <p className="text-orange-500 text-xs italic font-semibold font-serif">
            300 cals
          </p>
        </div>
      </div>
    </div>
  );
};

export default MinCalScore;
