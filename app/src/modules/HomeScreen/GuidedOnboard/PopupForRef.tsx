import InstructionBox from "@components/OnboardPopup/InstructionBox";
import { RefObject, useEffect, useState } from "react";
import { Pressable, View, useWindowDimensions } from "react-native";
import {
  getInstructioPosition,
  isInViewPort,
  paramsType,
  positionDataType,
} from "@components/OnboardPopup/utils";
import { useOnboardContext } from "./OnboardProvider";

interface Props {
  children: React.ReactNode;
  target: RefObject<View>;
  onPressCta?: () => void;
  popupTitle?: string;
  popupText?: string;
  popupCtaText?: string;
}

const PopupForRef: React.FC<Props> = ({
  children,
  target,
  onPressCta,
  popupTitle,
  popupText,
  popupCtaText,
}) => {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const { scrollRef } = useOnboardContext();
  const [measurments, setMeasurments] = useState<paramsType>();
  const [positionData, setPositionData] = useState<positionDataType>();

  const onClose = () => {
    onPressCta && onPressCta();
  };

  useEffect(() => {
    const getMesurement = () => {
      if (target.current) {
        target.current.measure((fx, fy, width, height, px, py) => {
          const isInView = isInViewPort(
            windowWidth,
            windowHeight,
            py,
            py + height,
            px + width
          );
          if (isInView) {
            setMeasurments({ fx, fy, width, height, px, py });
            setPositionData(
              getInstructioPosition({
                windowWidth,
                windowHeight,
                rectTop: py,
                rectLeft: px,
                rectWidth: width,
                rectHeight: height,
              })
            );
          } else if (scrollRef.current) {
            scrollRef.current.scrollTo({
              x: px,
              y: py,
              animated: false,
            });
            getMesurement();
          }
        });
      }
    };
    getMesurement();

    return () => {
      setMeasurments(undefined);
      setPositionData(undefined);
    };
  }, [target.current]);

  return measurments && positionData ? (
    <>
      <Pressable
        className="absolute left-0 right-0 top-0 bottom-0 z-0"
        onPress={onClose}
      />
      <View
        style={{
          position: "absolute",
          top: measurments.py,
          left: measurments.px,
          width: measurments.width,
          height: measurments.height,
        }}
        pointerEvents="none"
      >
        {children}
      </View>
      <InstructionBox
        onClose={onClose}
        popupTitle={popupTitle}
        popupText={popupText}
        popupCtaText={popupCtaText}
        positionData={positionData}
      />
    </>
  ) : null;
};

export default PopupForRef;
