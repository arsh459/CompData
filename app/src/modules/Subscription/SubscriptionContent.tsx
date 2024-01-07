import BackIcon from "@components/Buttons/BackIcon/BackIcon";
import MediaCard from "@components/MediaCard";
import { completedIconRedTick } from "@constants/imageKitURL";
import { useGameContext } from "@providers/game/GameProvider";
import { useSubscriptionContext } from "@providers/subscription/SubscriptionProvider";
import clsx from "clsx";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { View, Text, Image, Pressable, SafeAreaView } from "react-native";
import { Video } from "expo-av";
import { ScrollView } from "react-native";

interface Props {
  onSubscribe: () => void;
  onFreeTrial: () => void;
  onClose?: () => void;
  isUserOnTrial: boolean;
  trialExpired: boolean;
}

const SubscriptionContent: React.FC<Props> = ({
  onClose,
  onSubscribe,
  onFreeTrial,

  isUserOnTrial,
  trialExpired,
}) => {
  const { subStatus, res } = useSubscriptionContext();
  const moneyBackDays = 5;
  const cost = 500;
  const { game } = useGameContext();
  //   const { cost, moneyBackDays, freeDaysLeft } = getGamePricingHandler(game);
  const [isPaused, setIsPaused] = useState<boolean>(true);

  return (
    <SafeAreaView>
      <View className="w-full h-full flex flex-col  bg-black ">
        {/* <View
          className="absolute left-0 right-0 top-0 bottom-0 top-1/4 right-0 left-0 w-full 
          bg-gradient-to-b from-black/10 via-black/10 to-transparent/20"
        /> */}
        <ScrollView>
          <LinearGradient
            colors={["#000000", "transparent"]}
            className="absolute left-0 right-0  top-0 flex flex-row items-center p-4 justify-between z-50  "
          >
            {onClose ? (
              <Pressable
                className="p-1 cursor-pointer border-2  border-[#D1D1D1] backdrop-blur-[11px] rounded-full"
                onPress={onClose}
              >
                <BackIcon height={26} width={26} color={"#D1D1D1"} />
              </Pressable>
            ) : (
              <View />
            )}

            <View className="w-24 h-8  flex-row items-center justify-center backdrop-blur-[11px] border rounded-full border-[#D1D1D1] ">
              <Image
                source={{
                  uri: "https://ik.imagekit.io/socialboat/Vector__12__uLYvuYtOLs.png?ik-sdk-version=javascript-1.4.3&updatedAt=1658390953323",
                }}
                className="w-3 h-3"
                resizeMode="contain"
              />

              <Text className="text-sm font-semibold text-[#D1D1D1] pl-1 ">
                HELP
              </Text>
            </View>
            {/* </View> */}
          </LinearGradient>
          <View
            className={clsx(
              "w-full max-h-60 iphoneX:max-h-max relative z-0 mb-4",
              !game?.media[0] && "aspect-w-4 aspect-h-3"
            )}
          >
            {game?.media[0] ? (
              <MediaCard
                media={game?.media[0]}
                thumbnail={game?.thumbnail}
                setIsPaused={setIsPaused}
              />
            ) : (
              <Video
                source={{
                  uri: "https://d2cjy81ufi4f1m.cloudfront.net/videolg.mp4",
                }}
                className={clsx("w-full h-full object-cover rounded-t-0 ")}
                isLooping={true}
                isMuted={true}
                posterSource={{
                  uri: "https://ik.imagekit.io/socialboat/pexels-zakaria-boumliha-2827400_1_6w7U2-XSo.png?ik-sdk-version=javascript-1.4.3&amp;updatedAt=1655234361614",
                }}
                shouldPlay={true}
              />
              //   <View />
            )}

            {isPaused ? (
              <LinearGradient
                colors={["transparent", "black"]}
                className="absolute left-0 right-0  -bottom-4 px-4 z-20 "
              >
                <Text className="text-[#EB4E64] text-lg iphoneX:text-2xl font-semibold py-4 text-center  ">
                  {game?.courseGoal} {game?.courseGoalPrimary}
                </Text>
              </LinearGradient>
            ) : null}
          </View>

          <LinearGradient
            colors={["#D4B76A", "#BF953F"]}
            className="p-1 iphoneX:p-4 my-4 flex-row text-center   justify-between rounded-2xl  text-[#F0F0F0] bg-gradient-to-b from-[#D4B76A]  to-[#BF953F] mx-6"
            style={{ borderColor: `#A98E54` }}
          >
            <View className=" w-full flex flex-row items-center rounded-2xl">
              <Text className="text-sm iphoneX:text-lg font-medium leading-snug flex-1 self-center px-2 text-[#F0F0F0] ">
                {res.daysLeft
                  ? `First ${res.daysLeft} Days Free`
                  : moneyBackDays
                  ? `Money back in ${moneyBackDays} days`
                  : "Join the game to win rewards"}
              </Text>
              <View className=" p-px mx-4  bg-[#E3E3E3] h-full" />
              {/* <Text className="leading-[12px] mx-2.5 text-[16px] text-[#F0F0F0] "> */}
              {/* |{"/n"}|{"/n"}|{"/n"}| */}
              {/* </Text> */}
              <Text className="flex-1 self-center text-center font-semibold text-2xl bg-clip-text  text-[#F0F0F0]">
                {cost ? `INR ${cost}/-` : "Free"}
              </Text>
            </View>
          </LinearGradient>

          <View className="py-2 mx-6">
            {game?.programDetails?.map((item, index) => {
              return (
                <View
                  className="flex flex-row font-normal items-center text-left py-2 "
                  key={`li-${index}`}
                >
                  <Image
                    source={{
                      uri: completedIconRedTick,
                    }}
                    className="w-3 h-3"
                    resizeMode="contain"
                  />

                  <Text className="flex-1 pl-2 text-white text-sm iphoneX:text-base">
                    {item.text}
                  </Text>
                </View>
              );
            })}
          </View>
        </ScrollView>
        <View className="bg-black flex flex-col justify-center">
          <View className="flex-row shadow-sm border-t-white w-full z-10">
            {isUserOnTrial && res.daysLeft ? null : trialExpired ? (
              <Pressable
                onPress={onFreeTrial}
                className="flex-1 flex shadow-sm border-white justify-center items-center cursor-pointer py-4"
              >
                <Text className="text-center line-through text-white text-lg">{`Free ${res.daysLeft} Day Trial`}</Text>
                <Text className="text-center text-white text-sm">
                  Trial Expired
                </Text>
              </Pressable>
            ) : res.daysLeft && !isUserOnTrial ? (
              <Pressable
                onPress={onFreeTrial}
                className="flex-1 flex-row  justify-center items-center cursor-pointer py-4"
              >
                <Text className="text-center underline font-semibold text-white text-lg">{`Free ${res.daysLeft} Day Trial`}</Text>
              </Pressable>
            ) : null}
            {subStatus === "SUBSCRIBED" ? (
              <Pressable
                onPress={onClose}
                className={clsx(
                  "flex-1 flex flex-row justify-center items-center py-4 bg-[#D74559] cursor-pointer"
                )}
              >
                <Text className="text-center text-white font-bold text-lg">
                  Already in Team
                </Text>
              </Pressable>
            ) : (
              <Pressable
                onPress={onSubscribe}
                className={clsx(
                  "flex-1 flex flex-row justify-center items-center py-4 bg-[#D74559] cursor-pointer"
                )}
              >
                <Text className="text-center text-white font-bold text-lg">
                  Subscribe Now
                </Text>
              </Pressable>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SubscriptionContent;
