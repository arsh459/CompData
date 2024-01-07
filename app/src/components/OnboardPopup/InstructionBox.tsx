import GradientText from "@components/GradientText";
import clsx from "clsx";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { positionDataType } from "./utils";

interface Props {
  onClose: () => void;
  popupTitle?: string;
  popupText?: string;
  popupCtaText?: string;
  positionData: positionDataType;
  popupCtaStyleTw?: string;
  popupCtaTextStyleTw?: string;
}

const InstructionBox: React.FC<Props> = ({
  onClose,
  popupTitle,
  popupText,
  popupCtaText,
  positionData,
  popupCtaStyleTw,
  popupCtaTextStyleTw,
}) => {
  const { width } = useWindowDimensions();

  return (
    <View
      style={{
        position: "absolute",
        top: positionData.top,
        bottom: positionData.bottom,
        left: positionData.left,
        width: Math.round((width * 2) / 3),
        transform: [
          {
            translateX:
              positionData.position === "top-left" ||
              positionData.position === "bottom-left"
                ? -Math.round((width * 2) / 3)
                : positionData.position === "top-middle" ||
                  positionData.position === "bottom-middle"
                ? -Math.round((width * 2) / 3 / 2)
                : 0,
          },
        ],
      }}
      className={clsx(
        "flex",
        positionData.position === "bottom-middle"
          ? "flex-col items-center"
          : positionData.position === "top-middle"
          ? "flex-col-reverse items-center"
          : positionData.position === "top-left" ||
            positionData.position === "bottom-left"
          ? "flex-row-reverse"
          : "flex-row"
      )}
    >
      <Image
        source={{
          uri:
            positionData.position === "top-middle" ||
            positionData.position === "bottom-middle"
              ? "https://ik.imagekit.io/socialboat/tr:w-200,c-maintain_ratio,fo-auto/Frame_1100_5oWBfyomD.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676132408687"
              : "https://ik.imagekit.io/socialboat/tr:w-200,c-maintain_ratio,fo-auto/Mask_group_TiFhUWI6t.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676106587061",
        }}
        style={{
          transform: [
            {
              rotateX:
                positionData.position === "top-left" ||
                positionData.position === "top-right" ||
                positionData.position === "top-middle"
                  ? "180deg"
                  : "0deg",
            },
            {
              rotateY:
                positionData.position === "top-left" ||
                positionData.position === "bottom-left"
                  ? "180deg"
                  : "0deg",
            },
          ],
        }}
        className={clsx(
          positionData.position === "top-middle" ||
            positionData.position === "bottom-middle"
            ? "w-1/3 aspect-square"
            : "w-1/3 aspect-[0.6]"
        )}
        resizeMode="contain"
      />
      <View
        className={clsx(
          "w-4/5 flex relative px-2",
          positionData.position === "bottom-left" ||
            positionData.position === "bottom-right"
            ? "top-1/4"
            : positionData.position === "top-left" ||
              positionData.position === "top-right"
            ? "-top-1/4"
            : ""
        )}
      >
        {popupTitle ? (
          <GradientText
            text={popupTitle}
            textStyle={{
              fontSize: 20,
              fontFamily: "Quicksand-Bold",
              marginBottom: 8,
              color: "white",
            }}
            colors={["#75E0DF", "#7B8DE3"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            fallbackColor="white"
          />
        ) : null}
        {popupText ? (
          <Text
            className={clsx(
              "text-base text-white mb-4",
              positionData.position === "top-middle" ||
                positionData.position === "bottom-middle"
                ? "text-center"
                : ""
            )}
          >
            {popupText}
          </Text>
        ) : null}
        <TouchableOpacity
          onPress={onClose}
          className={clsx(
            popupCtaStyleTw
              ? popupCtaStyleTw
              : "bg-white rounded-full px-6 py-3"
          )}
        >
          <Text
            className={clsx(
              popupCtaTextStyleTw
                ? popupCtaTextStyleTw
                : "text-black text-sm font-medium text-center"
            )}
          >
            {popupCtaText ? popupCtaText : "Okay! Got it."}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InstructionBox;
