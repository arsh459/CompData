import ProgressBar from "@components/ProgressBar";
import {
  Image,
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import StartButton from "../NewHome/StartButton";
import clsx from "clsx";
import MediaCard from "@components/MediaCard";
import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";

interface Props {
  img?: AWSMedia | CloudinaryMedia;
  subtitle: string;
  name: string;
  btnTitle?: string;
  progress?: number;
  onStart?: () => void;
  isWorkout?: boolean;
  changeView: () => void;
}

const ArenaPlanCard: React.FC<Props> = ({
  img,
  name,
  progress,
  onStart,
  subtitle,
  isWorkout,
  btnTitle,
  changeView,
}) => {
  //   const { badgeId, badgeProgress } = useBadgeProgressContext();
  //   const { user } = useUserContext();

  const { width: WIDTH } = useWindowDimensions();

  const prog = progress ? Math.round(progress * 100) : 0;

  return (
    <View style={{ width: WIDTH * 0.85, flex: 1, justifyContent: "center" }}>
      <View className="flex-1 ml-4 aspect-[322/165] rounded-[20px]">
        <View className="flex flex-row flex-1 ">
          <View className="flex-1  p-4  ">
            <View className="flex flex-1 justify-between">
              <View className="z-10">
                <Text
                  className="text-[#F1F1F1] text-2xl capitalize flex-1"
                  style={{ fontFamily: "BaiJamjuree-Bold" }}
                  numberOfLines={1}
                >
                  {name}
                </Text>

                <Text
                  className="text-[#F1F1F1] text-lg  "
                  style={{ fontFamily: "BaiJamjuree-SemiBold" }}
                >
                  {subtitle}
                </Text>
              </View>

              {typeof progress === "number" ? (
                <View className="w-3/5">
                  <Text className="text-xs text-[#EFEFEF] pb-2 font-sans font-semibold">
                    {prog}% Completed
                  </Text>
                  <View className="w-3/5">
                    <ProgressBar
                      height={1}
                      progress={prog}
                      activeColor="#EFEFEF"
                      inActiveColor="#FFFFFF4D"
                    />
                  </View>
                </View>
              ) : null}
            </View>
          </View>
          <View className="flex-1 relative">
            <View
              className={clsx(
                "  object-contain absolute right-4 bottom-0 top-0  z-0",
                isWorkout ? "aspect-[109/163]" : "aspect-[160/165]"
              )}
            >
              <MediaCard fluid={true} media={img} />
            </View>

            <View className="absolute w-[120px] bottom-2 right-2">
              <StartButton
                title={btnTitle ? btnTitle : "Start"}
                bgColor="bg-[#fff]"
                textColor="text-[#100F1A] "
                roundedStr="rounded-full"
                textStyle="py-1 text-center text-xl  "
                onPress={onStart}
                fontFamily="BaiJamjuree-Bold"
              />
            </View>
            <Pressable className="absolute right-2 top-2 " onPress={changeView}>
              <Image
                source={{
                  uri: "https://ik.imagekit.io/socialboat/Component_1__16__Oy9Vuv3L6.png?ik-sdk-version=javascript-1.4.3&updatedAt=1667219566166",
                }}
                className="w-5 aspect-square "
                resizeMode="contain"
              />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ArenaPlanCard;
