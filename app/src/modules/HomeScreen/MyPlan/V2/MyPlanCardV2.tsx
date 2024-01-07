import { DifficultyLevelsTypes } from "@components/SvgIcons/DifficultyLevelsIcon";
import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";
import { LinearGradient } from "expo-linear-gradient";
import {
  getCardDetails,
  getOverlayColorsV2,
  iconsV2,
  statusTypes,
} from "../utils";
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import CardContentV2 from "./CardContentV2";
import CardIconV2 from "./CardIconV2";
import ArrowIcon from "@components/SvgIcons/ArrowIcon";
import SvgIcons from "@components/SvgIcons";
import CardImageV2 from "./CardImageV2";
import clsx from "clsx";

interface Props {
  taskId: string;
  status?: statusTypes;
  textColor?: string;
  cardColors?: string[];
  cardImg?: CloudinaryMedia | AWSMedia;
  level?: DifficultyLevelsTypes;
  achivedFitPoints?: number;
  fitPoints?: number;
  steps?: number;
  time?: number;
  kCal?: number;
  title?: string;
  description?: string;
  playColor?: string;
  previewMedia?: CloudinaryMedia | AWSMedia;
  expiredIn?: string;
  unlockIn?: string;
  liveText?: string;
  liveTime?: string;
  imgHeight: number;
  onInfoPress?: () => void;
  onFPPress?: () => void;
  progress?: number;
  noOfAttempts?: number;
  hideCtaIcon?: boolean;
}

const MyPlanCardV2: React.FC<Props> = ({
  taskId,
  status,
  textColor,
  imgHeight,
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
  playColor,
  previewMedia,
  expiredIn,
  unlockIn,
  liveText,
  liveTime,
  onInfoPress,
  onFPPress,
  progress,
  noOfAttempts,
  hideCtaIcon,
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
      <View className="flex-1 w-full relative z-0">
        <View style={{ height: imgHeight }}>
          <CardImageV2
            taskId={taskId}
            previewMedia={previewMedia}
            cardImg={cardImg}
            imgHeight={imgHeight}
            resizeModeCover={false}
          />
        </View>

        {achivedFitPoints && onFPPress ? (
          <Pressable
            onPress={onFPPress}
            className="absolute top-3 left-3 bg-[#1DAC4D] flex flex-row items-center rounded-full px-3 py-1"
          >
            <Text className="text-white text-xs font-semibold">{`${achivedFitPoints}/${fitPoints} FP`}</Text>
            <View className="w-3 aspect-square ml-3">
              <ArrowIcon direction="right" color="#FFFFFF" />
            </View>
          </Pressable>
        ) : expiredIn ? (
          <View className="absolute top-3 left-3 bg-[#343150] rounded-lg p-2">
            <Text className="text-white text-xs mr-4">Expiring in</Text>
            <Text className="text-[#FF3B80] text-sm font-semibold mr-4">
              {expiredIn}
            </Text>
          </View>
        ) : null}

        {status === "locked" || status === "expired" ? (
          <LinearGradient
            colors={["#343150", "#232136E5", "#23213600"]}
            start={{ x: 0.5, y: 1 }}
            end={{ x: 0.5, y: 0 }}
            className="absolute left-0 right-0 top-0 bottom-0 flex justify-center items-center p-4"
          >
            {status === "expired" ? (
              <Image
                source={{
                  uri: "https://ik.imagekit.io/socialboat/Group_1277_sNmAugOUA.png?ik-sdk-version=javascript-1.4.3&updatedAt=1677237373773",
                }}
                className="w-1/2 aspect-[1.8]"
                resizeMode="contain"
              />
            ) : unlockIn ? (
              <Text className="text-white text-sm iphoneX:text-base text-center">
                Unlocking in <Text className="font-bold">{unlockIn}</Text>
              </Text>
            ) : null}
          </LinearGradient>
        ) : null}
      </View>

      {progress ? (
        <View className="w-full h-1 bg-white">
          <View
            className="h-full bg-[#1A83FF]"
            style={{ width: `${100 * progress}%` }}
          />
        </View>
      ) : null}

      <LinearGradient
        colors={getOverlayColorsV2(status, playColor)}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        className="flex flex-row px-5 py-2 items-center"
      >
        <CardContentV2
          color={color}
          title={title}
          description={description}
          details={details}
          level={level}
        />
        {hideCtaIcon ? null : (
          <CardIconV2 status={status} color={color} text={liveText} />
        )}
      </LinearGradient>

      {status === "locked" || status === "expired" ? null : noOfAttempts ? ( // status === "done" &&
        <TouchableOpacity
          onPress={onFPPress}
          className="absolute top-2 right-4 flex flex-row justify-center items-center bg-white rounded-full px-3 py-1"
        >
          <View className="w-3.5 aspect-square">
            <SvgIcons iconType="retry" color="#000000" />
          </View>
          <Text
            className="text-xs text-black text-center"
            style={{ fontFamily: "Nunito-Bold" }}
          >
            {` ${
              noOfAttempts > 1
                ? `${noOfAttempts} attempts`
                : `${noOfAttempts} attempt`
            }`}
          </Text>
        </TouchableOpacity>
      ) : (status === "live" || status === "proPlus") && liveTime ? (
        <View className="flex flex-row py-1 px-2 absolute top-4 right-4 bg-white rounded-xl justify-center items-center">
          <Text
            // style={{ color, fontFamily: "BaiJamjuree-Medium" }}
            className="text-xs pr-1 text-[#FF5970] font-medium"
          >
            {liveTime}
          </Text>
          <View className={clsx("w-6", "aspect-square")}>
            <Image
              source={{ uri: iconsV2.live }}
              className="w-full h-full"
              resizeMode="contain"
            />
          </View>
        </View>
      ) : (
        <View />
      )}
    </LinearGradient>
  );
};

export default MyPlanCardV2;
