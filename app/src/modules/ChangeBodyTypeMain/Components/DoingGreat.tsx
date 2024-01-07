import { View, Text } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import CirclePercent from "@components/CirclePercent";
import SvgIcons from "@components/SvgIcons";
import { useUserContext } from "@providers/user/UserProvider";
import { getMotivateMsg } from "../utils";
interface Props {
  fpString: string;
  percent: number;
}
const DoingGreat: React.FC<Props> = ({ fpString, percent }) => {
  const { user } = useUserContext();

  return (
    <LinearGradient
      colors={["#7A7ACF", "#595996"]}
      className="flex flex-row items-center m-4 rounded-2xl px-6 py-4"
    >
      <View className="w-3/5 ">
        <Text
          className="text-sm iphoneX:text-base text-white"
          style={{
            fontFamily: "BaiJamjuree-Bold",
          }}
        >
          {getMotivateMsg(percent * 100)}
        </Text>
        <Text className="text-xs font-sans pt-1.5 font-light text-white ">
          Your daily target FitPoints to help you achieve your goal of having an{" "}
          <Text className="capitalize">{user?.desiredBodyType}</Text> body
        </Text>
      </View>
      <View className="w-2/5">
        <View className="flex  items-end">
          <CirclePercent
            circleSize={53}
            percent={percent}
            activeColor={"#FFFFFF"}
            strokeWidth={6}
            padding={2}
            inActiveColor="#FFFFFF33"
            showInactive={true}
          >
            <View className="flex items-center justify-center absolute left-0 right-0 top-0 bottom-0">
              <View className="w-4 aspect-[24/26] ">
                <SvgIcons iconType="fitpoint" />
              </View>
            </View>
          </CirclePercent>
          <Text
            className="text-sm iphoneX:text-base pl-2 pt-1.5 text-white "
            style={{ fontFamily: "BaiJamjuree-Bold" }}
          >
            {fpString}
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
};

export default DoingGreat;
