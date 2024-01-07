import { View, Text } from "react-native";

import SpreadColorBall from "@components/SpreadColorBall";
import ImageWithURL from "@components/ImageWithURL";
import { useUserContext } from "@providers/user/UserProvider";
import { getGoalString } from "./V3/utils";
import { useSubscriptionContext } from "@providers/subscription/SubscriptionProvider";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { format } from "date-fns";
import clsx from "clsx";
import { imgProPlusShield, imgProShield } from "@constants/imageKitURL";
interface Props {
  containerStyleTw?: string;
  isProPlus?: boolean;
}
const GoldenShieldCard: React.FC<Props> = ({ containerStyleTw, isProPlus }) => {
  const { user } = useUserContext();
  const { todayUnix } = useAuthContext();
  const { res } = useSubscriptionContext();

  const endUnix = res.msLeft + todayUnix;

  const goal = getGoalString(user);
  const objData = isProPlus
    ? { uri: imgProPlusShield, text: "Welcome to Socialboat Pro+" }
    : { uri: imgProShield, text: "Welcome to Socialboat Pro" };

  return (
    <View
      className={clsx(
        "flex flex-1  rounded-[35px] m-4 relative z-0 border border-[#FFFFFF47]",
        containerStyleTw ? containerStyleTw : "bg-[#E7C869]/40"
      )}
    >
      <View className=" flex flex-row flex-1 justify-around items-center">
        <View className="w-2/5  aspect-square pt-4">
          <ImageWithURL
            source={{
              uri: objData.uri,
            }}
            className="w-4/5 mx-auto aspect-square p-2 rounded-full flex items-center "
            resizeMode="contain"
          />
        </View>
        <View className="w-3/5 pl-3 ">
          <Text
            className="text-xl iphoneX:text-[22px]  text-white tex"
            style={{ fontFamily: "Nunito-Bold", lineHeight: 24 }}
          >
            {objData.text}
          </Text>
          <Text
            className="text-xs pt-2  text-white/60  w-3/4"
            style={{ fontFamily: "Nunito-SemiBold" }}
          >
            In this program we will help you {goal}
          </Text>
        </View>
      </View>
      <View className="rounded-b-[35px] border-t border-[#9A907D]">
        <Text
          className="text-xs py-2  text-white/60 text-center "
          style={{ fontFamily: "Nunito-SemiBold" }}
        >
          Expiring on {format(new Date(endUnix), "dd MMMM yyyy")}
        </Text>
      </View>
      <View className="absolute left-0 w-2/5 top-0 aspect-square  -z-10">
        <SpreadColorBall color1="#E7C869" color2="#FFE79E" opacity2={0} />
      </View>
    </View>
  );
};

export default GoldenShieldCard;
