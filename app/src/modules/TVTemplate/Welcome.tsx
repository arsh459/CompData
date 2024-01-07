import Loading from "@components/loading/Loading";
import { useEffect } from "react";
import { updateCastState } from "@utils/cast/utils";
import SocialBoat from "@components/SocialBoat";
import { Text, View } from "react-native";
import UserImage from "@components/UserImage";
import { getLevelColorV2 } from "@utils/level/levelColor";
import SpreadColorBall from "@components/SpreadColorBall";
import { useLeaderboard } from "@hooks/user/useLeaderboard";

interface Props {
  castId: string;
  userId?: string;
  size: number;
}

const Welcome: React.FC<Props> = ({ castId, userId, size }) => {
  const { leader, loaded } = useLeaderboard(userId);
  const { color } = getLevelColorV2(
    leader?.userLevelV2 ? leader.userLevelV2 : 0
  );

  useEffect(() => {
    setTimeout(() => {
      updateCastState(castId);
    }, 5000);
  }, [castId]);

  return loaded ? (
    <>
      <View className="w-full h-full flex justify-center items-center">
        <View style={{ width: size, height: size }} className="relative z-0">
          <View className="absolute left-1/2 right-1/left-1/2 top-1/left-1/2 bottom-1/left-1/2 -z-20 rounded-full blur-3xl">
            <SpreadColorBall
              color1={`${color}80`}
              color2="#100F1A"
              opacity={0.5}
            />
          </View>
          <View
            className="absolute -left-[15%] -right-[15%] -top-[15%] -bottom-[15%] -z-10 rounded-full"
            style={{ borderColor: color, borderWidth: 0.25 }}
          />
          <View
            className="absolute -left-[10%] -right-[10%] -top-[10%] -bottom-[10%] -z-10 rounded-full"
            style={{ borderColor: color, borderWidth: 0.5 }}
          />
          <View
            className="absolute -left-[5%] -right-[5%] -top-[5%] -bottom-[5%] -z-10 rounded-full"
            style={{ borderColor: color, borderWidth: 1 }}
          />
          <UserImage
            image={leader?.profileImage}
            name={leader?.name}
            width="w-full"
            height="h-full"
            color={color}
          />
        </View>
        <View className="absolute top-0 left-0 right-0 h-1/4 flex justify-center items-center">
          <SocialBoat
            iconColor="#7D91C3"
            iconClass="w-8 aspect-square"
            textColor="#7D91C3"
            textClass="text-4xl"
          />
        </View>
        <View className="absolute bottom-0 left-0 right-0 h-1/3 flex flex-col justify-center items-center">
          <Text
            className="text-white text-center text-4xl"
            style={{ fontFamily: "BaiJamjuree-Regular" }}
          >
            Welcome
          </Text>
          <Text
            className="text-white text-center text-4xl capitalize"
            style={{ fontFamily: "BaiJamjuree-Bold" }}
          >
            {leader?.name}!
          </Text>
        </View>
      </View>
    </>
  ) : (
    <View className="w-full h-full flex justify-center items-center">
      <Loading />
    </View>
  );
};

export default Welcome;
