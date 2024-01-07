import {
  LayoutRectangle,
  Pressable,
  View,
  useWindowDimensions,
} from "react-native";
import InstructionBoxV2 from "@components/OnboardPopup/InstructionBoxV2";
import { RefObject, useEffect, useState } from "react";
import {
  getInstructioPosition,
  isInViewPort,
  paramsType,
  positionDataType,
} from "@components/OnboardPopup/utils";

interface Props {
  children: React.ReactNode;
  target: RefObject<View>;
  arrowTarget?: LayoutRectangle;
  onPressCta?: () => void;
  popupText?: string;
  popupCtaText?: string;
}

const PopupForRef: React.FC<Props> = ({
  children,
  target,
  arrowTarget,
  onPressCta,
  popupText,
  popupCtaText,
}) => {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const [measurments, setMeasurments] = useState<paramsType>();
  const [positionData, setPositionData] = useState<positionDataType>();

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
                rectTop: py + (arrowTarget?.y || 0),
                rectLeft: px + (arrowTarget?.x || 0),
                rectWidth: arrowTarget?.width || width,
                rectHeight: arrowTarget?.height || height,
              })
            );
          }
        });
      }
    };
    getMesurement();

    return () => {
      setMeasurments(undefined);
      setPositionData(undefined);
    };
  }, [target.current, arrowTarget]);

  const onClose = () => {
    onPressCta && onPressCta();
  };

  return measurments && positionData ? (
    <>
      <Pressable
        className="absolute left-0 right-0 top-0 bottom-0 z-0"
        onPress={onClose}
      />
      <View
        style={{
          position: "absolute",
          left: measurments.px,
          top: measurments.py,
          width: measurments.width,
          height: measurments.height,
        }}
        pointerEvents="none"
      >
        {children}
      </View>
      <InstructionBoxV2
        onClose={onClose}
        popupText={popupText}
        popupCtaText={popupCtaText}
        positionData={positionData}
      />
    </>
  ) : null;
};

export default PopupForRef;
