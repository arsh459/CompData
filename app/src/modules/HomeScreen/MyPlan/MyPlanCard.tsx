import { DifficultyLevelsTypes } from "@components/SvgIcons/DifficultyLevelsIcon";
import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";
import { LinearGradient } from "expo-linear-gradient";
import CardContent from "./CardContent";
import CardIcon from "./CardIcon";
import CardImage from "./CardImage";
import { getCardDetails, getOverlayColors, statusTypes } from "./utils";
import CardContentLeft from "./CardContentLeft";
import { Text, View } from "react-native";

interface Props {
  status?: statusTypes;
  textColor?: string;
  cardColors?: string[];
  cardImg?: CloudinaryMedia | AWSMedia | string;
  level?: DifficultyLevelsTypes;
  achivedFitPoints?: number;
  fitPoints?: number;
  steps?: number;
  time?: number;
  kCal?: number;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  playColor?: string;
  previewMedia?: CloudinaryMedia | AWSMedia;
  lockedText?: string;
  liveText?: string;
}

const MyPlanCard: React.FC<Props> = ({
  status,
  textColor,
  cardColors,
  cardImg,
  level,
  achivedFitPoints,
  fitPoints,
  steps,
  time,
  kCal,
  title,
  description,
  children,
  playColor,
  previewMedia,
  lockedText,
  liveText,
}) => {
  const color = textColor || "#FFFFFF";
  const details = getCardDetails(fitPoints, steps, time, kCal, level);

  return (
    <LinearGradient
      colors={
        cardColors && cardColors.length >= 2
          ? cardColors
          : ["transparent", "transparent"]
      }
      start={{ x: 1, y: 0.5 }}
      end={{ x: 0, y: 0.5 }}
      className="w-full h-full rounded-3xl overflow-hidden relative z-0"
    >
      <CardImage cardImg={cardImg} />

      <LinearGradient
        colors={getOverlayColors(status, playColor)}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        className="absolute left-0 right-0 top-0 bottom-0"
      />

      <View className="w-full h-full flex flex-row">
        {status === "pending" || status === "done" ? (
          <CardContentLeft
            color={color}
            title={status === "pending" ? "AI Scan In progress" : ""}
            iconType={status === "pending" ? "loading" : undefined}
            text={`${achivedFitPoints}/${fitPoints}`}
            subText="Fitpoints"
          />
        ) : (
          <View className="w-1/3 h-full flex justify-center items-center p-4">
            {status === "locked" && lockedText ? (
              <Text
                style={{ color, fontFamily: "BaiJamjuree-Bold" }}
                className="text-xs iphoneX:text-sm text-center"
              >
                {lockedText}
              </Text>
            ) : null}
          </View>
        )}
        <CardContent
          color={color}
          title={title}
          description={description}
          details={details}
          level={level}
        >
          {children}
        </CardContent>
      </View>

      <CardIcon status={status} color={color} text={liveText} />
    </LinearGradient>
  );
};

export default MyPlanCard;
