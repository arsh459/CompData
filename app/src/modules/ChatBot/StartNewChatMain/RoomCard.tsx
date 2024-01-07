import { View, Text, useWindowDimensions } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  TouchableOpacity,
} from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import ImageWithURL from "@components/ImageWithURL";
import { format, isToday } from "date-fns";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Room } from "@models/ChatBot/interface";
import clsx from "clsx";

interface Props {
  item: Room;
  onDelete: (id: string) => void;
}

const hiddenCtaWidth = 80;
export const hiddenCtaRightMargin = 16;

const RoomCard: React.FC<Props> = ({ item, onDelete }) => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  const translateX = useSharedValue(0);
  const startVal = useSharedValue(0);
  const ctaTranslateX = useSharedValue(-hiddenCtaWidth);

  const handleDelete = () => {
    translateX.value = withTiming(width + hiddenCtaRightMargin);
    ctaTranslateX.value = withTiming(
      width + hiddenCtaWidth + hiddenCtaRightMargin
    );
    setTimeout(() => {
      onDelete(item.id);
    }, 200);
  };

  const onGestureEvent =
    useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
      onActive: (event) => {
        if (startVal.value) {
          translateX.value = startVal.value + event.translationX;
          ctaTranslateX.value =
            startVal.value + event.translationX - hiddenCtaWidth;
        } else {
          translateX.value = event.translationX;
          ctaTranslateX.value = event.translationX - hiddenCtaWidth;
        }
      },
      onEnd: (event) => {
        if (event.translationX > hiddenCtaWidth) {
          translateX.value = withTiming(hiddenCtaWidth);
          ctaTranslateX.value = withTiming(0);
          startVal.value = hiddenCtaWidth;
        } else {
          translateX.value = withTiming(0);
          ctaTranslateX.value = withTiming(-hiddenCtaWidth);
          startVal.value = 0;
        }
      },
    });

  const translateXStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const scaleStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: ctaTranslateX.value }],
  }));

  return (
    <View className="relative z-0 flex flex-row items-center">
      <Animated.View
        style={[{ width: hiddenCtaWidth - hiddenCtaRightMargin }, scaleStyle]}
        className="absolute lef-0 top-0 bottom-0 -z-10 bg-[#B17CFF]/50 border border-white/10 rounded-2xl p-1"
      >
        <TouchableOpacity
          onPress={handleDelete}
          className="w-full h-full bg-[#FF7697] rounded-xl flex justify-center items-center p-3"
        >
          <ImageWithURL
            source={{
              uri: "https://ik.imagekit.io/socialboat/Group_LkUHwELHFB.png?updatedAt=1684848490008",
            }}
            className="w-full aspect-square"
            resizeMode="contain"
          />
        </TouchableOpacity>
      </Animated.View>
      <PanGestureHandler onGestureEvent={onGestureEvent} minDist={25}>
        <Animated.View className="flex-1" style={translateXStyle}>
          <TouchableOpacity
            onPress={() => navigation.navigate("ChatRoom", { roomId: item.id })}
          >
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              colors={["#CF76FF75", "#B17CFF75"]}
              className="flex flex-row items-center rounded-2xl px-4 py-3"
            >
              <ImageWithURL
                className="w-10 aspect-square"
                source={{
                  uri: item.chatImage
                    ? item.chatImage
                    : "https://ik.imagekit.io/socialboat/Component_121_UjqR_9Jy3.png?updatedAt=1681284516956",
                }}
              />
              <View className="flex-1">
                <Text
                  numberOfLines={1}
                  className="text-white text-sm mx-2"
                  style={{ fontFamily: "Nunito-Bold" }}
                >
                  {item.title ? item.title : "New Chat with Sakhi"}
                </Text>
                <Text
                  numberOfLines={2}
                  className="text-white/70 text-sm mx-2"
                  style={{ fontFamily: "Nunito-Regular" }}
                >
                  {item.lastMessage}
                </Text>
              </View>
              <View className="flex justify-between items-center">
                <Text
                  className={clsx(
                    "text-xs",
                    item.unreadMessages ? "text-[#59FFE8]" : "text-white/70"
                  )}
                >
                  {isToday(item.updatedOn)
                    ? format(item.updatedOn, "p")
                    : format(item.updatedOn, "dd MMM yy")}
                </Text>
                <View
                  className={clsx(
                    "rounded-full px-3 py-1 bg-[#59FFE8] mt-2",
                    !item.unreadMessages && "opacity-0"
                  )}
                >
                  <Text className="text-black text-xs">
                    {item.unreadMessages}
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default RoomCard;
