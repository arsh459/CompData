import { StyleSheet } from "react-native";
import BlurBG from "@components/BlurBG";
import InstructionBox from "@components/OnboardPopup/InstructionBox";
import { useEffect, useState } from "react";
import { onChatScreenOnboardDone } from "@modules/HomeScreen/utills/guidedOnboardUtils";
import { useUserContext } from "@providers/user/UserProvider";

interface OnBoardProps {
  onClose: () => void;
  popupText: string;
  position: "bottom-right" | "top-right";
  top?: number;
  bottom?: number;
}

const OnBoard = () => {
  const { user } = useUserContext();
  const [onBoardProps, setOnBoardProps] = useState<OnBoardProps>();

  const onBoardDone = () => {
    setOnBoardProps(undefined);
    onChatScreenOnboardDone(user?.uid);
  };

  const onBoardNext = () => {
    setOnBoardProps({
      onClose: onBoardDone,
      popupText: "You can clear your messages from here.",
      position: "top-right",
      bottom: 0,
    });
  };

  useEffect(() => {
    if (!user?.flags?.chatScreenOnboard) {
      setOnBoardProps({
        onClose: onBoardNext,
        popupText: "This meter shows the limit of the conversation",
        position: "bottom-right",
        top: 0,
      });
    }
  }, [user?.flags?.chatScreenOnboard]);

  return onBoardProps ? (
    <>
      <BlurBG
        style={StyleSheet.absoluteFill}
        blurAmount={10}
        fallbackColor="#232136E5"
        blurType="dark"
      />
      <InstructionBox
        onClose={onBoardProps.onClose}
        popupText={onBoardProps.popupText}
        positionData={{
          left: 0,
          top: onBoardProps.top,
          bottom: onBoardProps.bottom,
          position: onBoardProps.position,
        }}
      />
    </>
  ) : null;
};

export default OnBoard;
