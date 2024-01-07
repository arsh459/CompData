import GradientText from "@components/GradientText";
import ArrowIcon from "@components/SvgIcons/ArrowIcon";
import { waBaseLink } from "@constants/links";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { View, TouchableOpacity, Linking } from "react-native";

interface Props {
  text: string;
}

const TalkToUs: React.FC<Props> = ({ text }) => {
  const onPress = () => {
    weEventTrack("home_clickTalkToCoach", {});
    Linking.openURL(`${waBaseLink}${encodeURI("Hi!\nI would need some help")}`);
  };
  return (
    <TouchableOpacity className="mx-4 my-4" onPress={onPress}>
      <View
        className="flex flex-row justify-between items-center rounded-2xl p-3.5"
        style={{ backgroundColor: "#343150" }}
      >
        <GradientText
          text={text}
          colors={["#75E0E0", "#7096FB"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          textStyle={{
            fontFamily: "Quicksand-Bold",
            fontSize: 14,
            textAlign: "center",
            paddingLeft: 10,
          }}
        />
        <View className="w-1 aspect-[7/15] mr-3">
          <ArrowIcon direction="right" color="#6F94FB" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TalkToUs;
