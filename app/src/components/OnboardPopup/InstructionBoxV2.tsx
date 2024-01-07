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
  popupText?: string;
  popupCtaText?: string;
  positionData: positionDataType;
}

const InstructionBoxV2: React.FC<Props> = ({
  onClose,
  popupText,
  popupCtaText,
  positionData,
}) => {
  const { width } = useWindowDimensions();
  const boxWidth = width / 2;

  return (
    <View
      style={{
        position: "absolute",
        top: positionData.top,
        bottom: positionData.bottom,
        left: positionData.left,
        width: boxWidth,
        transform: [
          {
            translateX:
              positionData.position === "top-left" ||
              positionData.position === "bottom-left"
                ? -boxWidth
                : positionData.position === "top-middle" ||
                  positionData.position === "bottom-middle"
                ? -boxWidth / 2
                : 0,
          },
        ],
      }}
      className={clsx(
        "flex",
        positionData.position === "bottom-middle"
          ? "flex-col items-start"
          : positionData.position === "top-middle"
          ? "flex-col-reverse items-end"
          : positionData.position === "top-left" ||
            positionData.position === "bottom-left"
          ? "flex-row-reverse"
          : "flex-row",
        positionData.position === "top-left" ||
          positionData.position === "top-right"
          ? "items-end"
          : "items-start"
      )}
    >
      <Image
        source={{
          uri:
            positionData.position === "top-middle" ||
            positionData.position === "bottom-middle"
              ? "https://ik.imagekit.io/socialboat/tr:w-200,c-maintain_ratio,fo-auto/Frame_1458__1__2c7vMUYck.png?updatedAt=1682333717931"
              : "https://ik.imagekit.io/socialboat/tr:w-200,c-maintain_ratio,fo-auto/Frame_1458_e0IAkQ05O.png?updatedAt=1682329581754",
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
            : "w-1/4 aspect-[0.6]"
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
        {popupText ? (
          <Text
            className={clsx(
              "text-sm text-white mb-4",
              positionData.position === "top-middle" ||
                positionData.position === "bottom-middle"
                ? "text-center"
                : ""
            )}
            style={{ fontFamily: "Nunito-Regular" }}
          >
            {popupText}
          </Text>
        ) : null}
        <TouchableOpacity
          onPress={onClose}
          className="bg-[#6D55D1] rounded-lg px-6 py-3"
        >
          <Text
            className="text-white text-xs font-medium text-center"
            style={{ fontFamily: "Nunito-Bold" }}
          >
            {popupCtaText ? popupCtaText : "Okay! Got it."}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InstructionBoxV2;
