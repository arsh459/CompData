import { weEventTrack } from "@analytics/webengage/user/userLog";
import { communityQueryV3 } from "@hooks/community/v2/useCommunityParamsV3";
import { frequencyTypes } from "@models/Prizes/PrizeV2";
import clsx from "clsx";

interface Props {
  urlState: communityQueryV3;
  onQueryChange: (
    querry: communityQueryV3,
    replace?: true,
    merge?: boolean
  ) => void;
}

const BackgroundWrapper: React.FC<Props> = ({
  urlState,
  onQueryChange,
  children,
}) => {
  const handleQuerryChange = (prizesFor: frequencyTypes) => {
    const querry: communityQueryV3 = { ...urlState, prizesFor: prizesFor };
    onQueryChange(querry);
    weEventTrack("gamePrizes_frequency", { frequency: prizesFor });
  };

  return (
    <div className="flex-1 flex flex-col">
      <div
        className={clsx(
          "flex iphoneX:text-xl font-extrabold border-t border-white",
          urlState.prizesFor === "daily"
            ? "bg-[#8673CE]"
            : urlState.prizesFor === "weekly"
            ? "bg-[#699FD0]"
            : urlState.prizesFor === "monthly"
            ? "bg-[#FF9F75]"
            : ""
        )}
      >
        <div
          className={clsx(
            "w-1/3 bg-white",
            urlState.prizesFor === "weekly" ? "rounded-br-xl" : ""
          )}
        >
          <button
            className={clsx(
              "w-full py-2 text-center font-bold",
              urlState.prizesFor === "daily"
                ? "bg-[#8673CE] text-white rounded-tr-xl"
                : "text-[#788289]"
            )}
            onClick={() => handleQuerryChange("daily")}
          >
            Daily
          </button>
        </div>
        <div
          className={clsx(
            "w-1/3 bg-white",
            urlState.prizesFor === "daily"
              ? "rounded-bl-xl"
              : urlState.prizesFor === "monthly"
              ? "rounded-br-xl"
              : ""
          )}
        >
          <button
            className={clsx(
              "w-full py-2 text-center font-bold",
              urlState.prizesFor === "weekly"
                ? "bg-[#699FD0] text-white rounded-t-xl"
                : "text-[#788289]"
            )}
            onClick={() => handleQuerryChange("weekly")}
          >
            Round
          </button>
        </div>
        <div
          className={clsx(
            "w-1/3 bg-white",
            urlState.prizesFor === "weekly" ? "rounded-bl-xl" : ""
          )}
        >
          <button
            className={clsx(
              "w-full py-2 text-center font-bold",
              urlState.prizesFor === "monthly"
                ? "bg-[#FF9F75] text-white rounded-tl-xl"
                : "text-[#788289]"
            )}
            onClick={() => handleQuerryChange("monthly")}
          >
            Game
          </button>
        </div>
      </div>
      <div
        className={clsx(
          "flex-1 bg-gradient-to-b p-2",
          urlState.prizesFor === "daily"
            ? "from-[#8673CE] to-[#6D9DC7]"
            : urlState.prizesFor === "weekly"
            ? "from-[#699FD0] to-[#5EABC1]"
            : urlState.prizesFor === "monthly"
            ? "from-[#FF9F75] to-[#F66E97]"
            : ""
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default BackgroundWrapper;
