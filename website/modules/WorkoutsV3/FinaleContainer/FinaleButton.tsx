import {
  lockedIconNoKeyHole,
  playButtonBlue,
  // reminderIconRed,
} from "@constants/icons/iconURLs";
import React from "react";
import ButtonWithIcon from "./ButtonWithIcon";
interface Props {
  isLocked?: boolean;
}
const FinaleButton: React.FC<Props> = ({ isLocked }) => (
  <div className="flex-1 flex justify-end">
    {isLocked ? (
      <ButtonWithIcon
        btnText={"Locked"}
        iconImgSrc={lockedIconNoKeyHole}
        textColor={"#FF5C5C"}
      />
    ) : (
      <ButtonWithIcon
        btnText={"Start Now"}
        iconImgSrc={playButtonBlue}
        textColor={"#0085E0"}
      />
    )}
  </div>
);

export default FinaleButton;
