// import ProgressBar from "@components/ProgressBar";
import { LinearGradient } from "expo-linear-gradient";
import { Image, Text, View } from "react-native";
import StartButton from "../NewHome/StartButton";
import clsx from "clsx";
import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";
import MediaTile from "@components/MediaCard/MediaTile";

interface Props {
  startColor: string;
  endColor: string;
  img?: string;
  bgImg?: AWSMedia | CloudinaryMedia;
  marketImg?: AWSMedia | CloudinaryMedia;
  width?: number;
  subtitle: string;
  name: string;
  btnTitle?: string;
  progress?: number;
  onStart: () => void;
  isWorkout?: boolean;
  header?: boolean;
  classStr?: string;
  meterVisible?: boolean;
}

const UserPlanCard: React.FC<Props> = ({
  startColor,
  endColor,
  img,
  name,
  progress,
  onStart,
  subtitle,
  isWorkout,
  btnTitle,
  marketImg,
  bgImg,
  width,
  header,
  classStr,
  meterVisible,
}) => {
  // const prog = progress ? Math.round(progress * 100) : 0;

  return (
    <View
      // colors={[startColor, endColor]}
      // start={{ x: 0, y: 0.5 }}
      // end={{ x: 1, y: 0.5 }}
      className={clsx(
        classStr ? classStr : "flex-1 aspect-[322/165]",
        "rounded-[20px] overflow-hidden flex flex-row justify-around relative z-0"
      )}
      style={{ width: classStr ? undefined : width }}
    >
      {bgImg ? (
        <View className="absolute left-0 right-0 top-0 bottom-0 rounded-2xl overflow-hidden">
          <MediaTile fluid={true} media={bgImg} fluidResizeMode="cover" />
        </View>
      ) : null}

      {header ? (
        <LinearGradient
          colors={[startColor, endColor]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          className="absolute left-0 right-0 top-0 h-10 flex justify-center rounded-t-xl rounded-b overflow-hidden px-3 py-1.5"
        >
          <Text
            numberOfLines={1}
            className="w-full pr-10 text-[#F1F1F1] text-base"
            style={{ fontFamily: "BaiJamjuree-Bold" }}
          >
            {`${name} ${subtitle}`}
          </Text>
        </LinearGradient>
      ) : null}

      <LinearGradient
        colors={["transparent", "transparent", "#0000004D"]}
        className="flex-1 w-full p-4 px-6 flex justify-between"
      >
        <View className={clsx("z-10", header && "opacity-0")}>
          <Text
            className="text-[#F1F1F1] text-xl capitalize"
            style={{ fontFamily: "BaiJamjuree-Bold" }}
          >
            {name}
          </Text>
          <Text
            className="text-[#F1F1F1] text-base"
            style={{ fontFamily: "BaiJamjuree-SemiBold" }}
          >
            {subtitle}
          </Text>
        </View>

        {/* {typeof progress === "number" && meterVisible ? (
          <View className="w-1/3">
            <Text className="text-xs text-white pb-2 font-sans font-semibold">
              {prog}% Completed
            </Text>
            <ProgressBar
              height={1}
              progress={prog}
              activeColor="#EFEFEF"
              inActiveColor="#FFFFFF4D"
            />
          </View>
        ) : null} */}
      </LinearGradient>

      {marketImg ? (
        <View
          className={clsx(
            "object-contain absolute right-4 bottom-0 top-0 z-0",
            isWorkout ? "aspect-[109/163]" : "aspect-[160/165]"
          )}
        >
          <MediaTile fluid={true} media={marketImg} />
        </View>
      ) : (
        <Image
          source={{
            uri: img,
          }}
          resizeMode="contain"
          className={clsx(
            "  object-contain absolute right-4 bottom-0 top-0  z-0",
            isWorkout ? "aspect-[109/163]" : "aspect-[160/165]"
          )}
        />
      )}
      <View className="absolute w-[120px] bottom-2 right-2">
        <StartButton
          title={btnTitle ? btnTitle : "Start"}
          bgColor="bg-[#fff]"
          textColor="text-[#100F1A]"
          roundedStr="rounded-full"
          textStyle="py-1 text-center text-sm iphoneX:text-base"
          onPress={onStart}
          fontFamily="BaiJamjuree-Bold"
        />
      </View>
    </View>
  );
};

export default UserPlanCard;
