import { useState } from "react";
import EarnedFitPointModal from "./EarnedFitPointModal";
import clsx from "clsx";
import InfoBtn from "@components/InfoBtn";
import { getReviewMessage } from "./utils";
import { reviewStatus } from "@models/Activities/Activity";
import { weEventTrack } from "@analytics/webengage/user/userLog";

interface Props {
  earnedFP: number;
  totalFP: number;
  // userName?: string;
  reviewStatus?: reviewStatus;
  tags?: { [tag: string]: boolean };
  message?: string;
  awardLevels?: { text: string; fitPoints: number }[];
}

const EarnedFitPoint: React.FC<Props> = ({
  earnedFP,
  totalFP,
  reviewStatus,
  awardLevels,
  message,
  tags,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const msg = getReviewMessage(message, tags, reviewStatus, earnedFP, totalFP);
  // const userScore = getUserScore((earnedFP / totalFP) * 100, userName);
  // console.log("me", message);

  return (
    <div className="px-4">
      <div
        className={clsx(
          "bg-gradient-to-b from-[#2CC2B9] to-[#76A7E0]",
          "text-lg iphoneX:text-2xl italic font-bold text-white rounded-2xl"
        )}
      >
        <div className="flex justify-between items-center px-4 py-3">
          <div className="flex items-center">
            <img
              src={`https://ik.imagekit.io/socialboat/Vector__11__5Mi_iTCJd.png?ik-sdk-version=javascript-1.4.3&updatedAt=1650966172454`}
              alt="Fitpoints Icon"
            />
            <p className="pl-4 italic">Earned Fitpoints</p>
          </div>
          <InfoBtn
            onClick={() => {
              setIsOpen(true);
              weEventTrack("gameCommunityPost_earnedFPIClick", {});
            }}
          />
        </div>
        <div className="flex border-t border-white p-4">
          <div className="flex-[35%] px-4 py-3 text-center">
            <p>{earnedFP} FP</p>
            <div className="my-1 h-px bg-white" />
            <p>{totalFP} FP</p>
          </div>
          <div className="w-px mx-4 bg-white" />
          <div className="flex-[65%] px-4 py-3 flex justify-center items-center">
            <p className="text-center capitalize">{msg}</p>
          </div>
        </div>
      </div>

      <EarnedFitPointModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        earnedFP={earnedFP}
        totalFP={totalFP}
        userScore={msg}
        awardLevels={awardLevels}
      />
    </div>
  );
};

export default EarnedFitPoint;
