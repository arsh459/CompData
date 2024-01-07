import { useState } from "react";
import { reviewStatus } from "@models/Activity/Activity";
import { getReviewMessage } from "@utils/community/utils";
import { View } from "react-native";
import EarnedFitPointBox from "./EarnedFitPointBox";
import EarnedFitPointModal from "./EarnedFitPointModal";

interface Props {
  earnedFP: number;
  totalFP: number;
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

  return (
    <View className="px-4">
      <EarnedFitPointBox
        earnedFP={earnedFP}
        totalFP={totalFP}
        msg={msg}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <EarnedFitPointModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        earnedFP={earnedFP}
        totalFP={totalFP}
        msg={msg}
        awardLevels={awardLevels}
      />
    </View>
  );
};

export default EarnedFitPoint;
