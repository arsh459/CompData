import clsx from "clsx";
import { getDistanceString } from "./utils";

interface Props {
  distance?: number;
  //   isExpandable: boolean;
  //   onShow: () => void;
  //   isVisible: boolean;
}

const DistanceDetails: React.FC<Props> = ({
  distance,
  //   isExpandable,
  //   isVisible,
  //   onShow,
}) => {
  return (
    <div
      className="flex items-center cursor-pointer"
      // onClick={onShow}
    >
      <p
        className={clsx(
          "text-gray-700 text-center",
          "text-xs sm:text-sm"
          //   isExpandable ? "underline" : ""

          // size ? "text-xs line-clamp-1" : ""
        )}
      >
        {getDistanceString(distance)}
      </p>

      {/* {isVisible && isExpandable ? (
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
      ) : null} */}
    </div>
  );
};

export default DistanceDetails;
