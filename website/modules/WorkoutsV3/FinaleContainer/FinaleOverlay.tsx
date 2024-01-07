import React from "react";
import FinaleLockedOverlay from "./FinaleLockedOverlay";
import UnlockedOverlay from "./UnlockedOverlay";
interface Props {
  taskName?: string;
  taskFp?: number;
  topText?: string;
  unlocksNext?: number;
  isLocked?: boolean;
}
const FinaleOverlay: React.FC<Props> = ({
  taskFp,
  taskName,
  topText,
  unlocksNext,
  isLocked,
}) => {
  return (
    <div>
      {isLocked ? (
        <FinaleLockedOverlay taskFp={taskFp} unlocksNext={unlocksNext} />
      ) : (
        <UnlockedOverlay
          taskFp={taskFp}
          taskName={taskName}
          topText={topText}
        />
      )}
    </div>
  );
};

export default FinaleOverlay;
