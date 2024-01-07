// import { View, Text } from "react-native";
// import StartButton from "@modules/HomeScreen/NewHome/StartButton";
// import NewProgressBar from "@modules/TeamInvite/NewProgressBar";
// import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
// import SvgIcons from "@components/SvgIcons";
interface Props {
  showDetailBtn?: boolean;
}
const HeaderProgress: React.FC<Props> = ({ showDetailBtn }) => {
  // const navigation = useNavigation();

  return (
    <LinearGradient
      colors={["#00000080", "#100F1A"]}
      className="w-full rounded-t-xl py-4"
    >
      {/* <View className="flex flex-row px-4 items-center justify-between">
        <Text
          className="text-white text-lg iphoneX:text-xl"
          style={{ fontFamily: "BaiJamjuree-SemiBold" }}
        >
          Team Consistency
        </Text>
        {showDetailBtn ? (
          <StartButton
            bgColor="bg-[#6BF2D5]"
            title="View details"
            roundedStr="rounded-full px-3 py-1"
            textStyle="text-[11px] text-[13px]"
            onPress={() => navigation.navigate("TeamConsistency")}
          />
        ) : (
          <View className="w-5 iphoneX:w-6 aspect-square">
            <SvgIcons iconType="iCircle" />
          </View>
        )}
      </View>
      <View className="bg-[#FFFFFF40] h-px w-full my-4" />

      <NewProgressBar showPercent={showDetailBtn} /> */}
    </LinearGradient>
  );
};

export default HeaderProgress;
