import { Badge } from "@models/Prizes/Prizes";
import ArenaProgress from "./ArenaProgress";
import ArenaDetailV2 from "./ArenaDetailV2";
import { Animated, Image, TouchableOpacity, View } from "react-native";
import { useRef, useState } from "react";
import { infoBtn, revertBtn } from "@constants/imageKitURL";
import { weEventTrack } from "@utils/analytics/webengage/userLog";

interface Props {
  badge?: Badge;
  onStartGame?: () => void;
  flipCard?: boolean;
  meterVisible?: boolean;
}
const ArenaHolder: React.FC<Props> = ({
  badge,
  onStartGame,
  flipCard,
  meterVisible,
}) => {
  const [flipRotation, setFlipRotation] = useState<boolean>(false);
  const flipAnimation = useRef(new Animated.Value(0)).current;

  const flipToFrontStyle = {
    transform: [
      {
        rotateY: flipAnimation.interpolate({
          inputRange: [0, 180],
          outputRange: ["0deg", "180deg"],
        }),
      },
    ],
    opacity: flipAnimation.interpolate({
      inputRange: [0, 180],
      outputRange: [1, 0],
    }),
  };

  const flipToBackStyle = {
    transform: [
      {
        rotateY: flipAnimation.interpolate({
          inputRange: [0, 180],
          outputRange: ["180deg", "360deg"],
        }),
      },
    ],
    opacity: flipAnimation.interpolate({
      inputRange: [0, 180],
      outputRange: [0, 1],
    }),
  };

  const flipToFront = () => {
    Animated.timing(flipAnimation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
    setFlipRotation(false);

    weEventTrack("allWorkouts_clickFlip", {
      badgeId: badge ? badge.id : "no_badgeId",
      badgeName: badge ? badge.name : "no_badgeName",
    });
  };

  const flipToBack = () => {
    Animated.timing(flipAnimation, {
      toValue: 180,
      duration: 200,
      useNativeDriver: true,
    }).start();
    setFlipRotation(true);

    weEventTrack("allWorkouts_clickFlip", {
      badgeId: badge ? badge.id : "no_badgeId",
      badgeName: badge ? badge.name : "no_badgeName",
    });
  };

  return (
    <View className="relative z-0 overflow-hidden mx-4">
      <Animated.View style={{ ...flipToFrontStyle }}>
        <ArenaProgress
          startColor="#318DF8"
          endColor="#1F5BF7"
          badge={badge}
          meterVisible={meterVisible}
          onSelect={onStartGame}
        />
      </Animated.View>
      <Animated.View
        className="absolute left-0 right-0 top-0 bottom-0 -z-10"
        style={{ ...flipToBackStyle }}
      >
        <ArenaDetailV2
          startColor="#318DF8"
          endColor="#1F5BF7"
          badge={badge}
          classStr="w-full h-full"
        />
      </Animated.View>

      {flipCard ? (
        <TouchableOpacity
          onPress={() => (flipRotation ? flipToFront() : flipToBack())}
          className="absolute top-2 right-2 z-20"
        >
          <Image
            source={{
              uri: flipRotation ? revertBtn : infoBtn,
            }}
            resizeMode="contain"
            className="w-5 iphoneX:w-6 aspect-square"
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default ArenaHolder;
