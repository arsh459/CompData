import UseModal from "@components/UseModal";
import { useEffect, useRef, useState } from "react";
import { Pressable, useWindowDimensions, View } from "react-native";
import InstructionBox from "./InstructionBox";
import {
  getInstructioPosition,
  isInViewPort,
  modalState,
  paramsType,
  positionDataType,
} from "./utils";

interface Props {
  children?: React.ReactNode;
  shouldShow?: boolean;
  onPressCta?: () => void;
  popupText?: string;
  popupCtaText?: string;
}

const OnboardPopup: React.FC<Props> = ({
  children,
  shouldShow,
  onPressCta,
  popupText,
  popupCtaText,
}) => {
  const target = useRef<View>(null);
  const [popupState, setPopupState] = useState<modalState>("init");
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const [childParams, setChildParams] = useState<paramsType>();
  const [positionData, setPositionData] = useState<positionDataType>();

  const onClose = () => {
    setPopupState("closed");
    onPressCta && onPressCta();
  };

  useEffect(() => {
    if (shouldShow && popupState === "init") {
      const interval = setInterval(() => {
        if (target.current) {
          target.current.measure((fx, fy, width, height, px, py) => {
            const remoteParams: paramsType = { fx, fy, width, height, px, py };
            const isInView = isInViewPort(
              windowWidth,
              windowHeight,
              py,
              py + height,
              px + width
            );
            if (isInView) {
              setChildParams(remoteParams);
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
              setPopupState("open");
              clearInterval(interval);
            }
          });
        }
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [target.current, shouldShow, popupState]);

  return children ? (
    <>
      <View ref={target} collapsable={false}>
        {children}
      </View>
      <UseModal
        visible={popupState === "open"}
        onClose={onClose}
        width="w-full"
        height="h-full"
        tone="dark"
        blurAmount={20}
        fallbackColor="#13121EE5"
      >
        <Pressable
          className="absolute left-0 right-0 top-0 bottom-0 z-0"
          onPress={onClose}
        />
        <View
          style={{
            position: "absolute",
            left: childParams?.px,
            top: childParams?.py,
            width: childParams?.width,
            height: childParams?.height,
          }}
          pointerEvents="none"
        >
          {children}
        </View>
        {positionData ? (
          <InstructionBox
            onClose={onClose}
            popupText={popupText}
            popupCtaText={popupCtaText}
            positionData={positionData}
          />
        ) : null}
      </UseModal>
    </>
  ) : null;
};

export default OnboardPopup;
