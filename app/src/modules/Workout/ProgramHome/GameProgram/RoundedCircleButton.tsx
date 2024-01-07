import clsx from "clsx";
import { View, Text } from "react-native";
interface Props {
  ringColor?: string;
  bgColor: string;
  text?: string | number;
  textColor?: string;
  RingHWString?: string;
  overRideCss?: string;
  MainCircleHWString?: string;
  MainCircleBorder?: string;
  noRing?: boolean;
  lockedOverlay?: boolean;
  fontBai?: boolean;
}
const RoundedCircleButton: React.FC<Props> = ({
  ringColor,
  bgColor,
  text,
  RingHWString,
  MainCircleHWString,
  MainCircleBorder,
  noRing,
  textColor,
  overRideCss,
  lockedOverlay,
  fontBai,
}) => {
  return (
    <View
      className={clsx(
        "relative",
        noRing
          ? ""
          : " bg-transparent border-2 p-0.5 rounded-full flex  flex-row items-center justify-center ",
        noRing ? "" : RingHWString ? RingHWString : ""
      )}
      style={{ borderColor: ringColor }}
    >
      <View
        className={clsx(
          "flex flex-row items-center   justify-center  rounded-full",
          MainCircleHWString ? MainCircleHWString : "h-10 w-10",
          MainCircleBorder ? MainCircleBorder : "",
          textColor ? textColor : "",
          overRideCss ? overRideCss : ""
        )}
        style={{ backgroundColor: bgColor }}
      >
        <Text
          className="text-white  text-sm font-semibold "
          style={{ fontFamily: fontBai ? "BaiJamjuree-Bold" : undefined }}
        >
          {text}
        </Text>
      </View>
      {/* {lockedOverlay ? <LockOverlay /> : null} */}
    </View>
  );
};

export default RoundedCircleButton;
