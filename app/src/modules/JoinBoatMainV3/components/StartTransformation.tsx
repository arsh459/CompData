import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { Text, TouchableOpacity, View, ScrollView } from "react-native";
import { sectionTypes } from "../hooks/useSection";
import { getTransdormationDataV2 } from "./utils";
import ImageWithURL from "@components/ImageWithURL";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useUserStore } from "@providers/user/store/useUserStore";
import ThingsToWorkOn from "./ThingsToWorkOn";
import { shallow } from "zustand/shallow";

interface Props {
  gotoSection: (sec: sectionTypes, replace?: boolean) => void;
}

const StartTransformation: React.FC<Props> = ({ gotoSection }) => {
  const { top, bottom } = useSafeAreaInsets();

  const { fitnessGoal, name } = useUserStore(({ user }) => {
    return {
      fitnessGoal: user?.fitnessGoal,
      name: user?.name,
    };
  }, shallow);

  const transdormationData = getTransdormationDataV2(fitnessGoal, name);

  const onNext = () => {
    weEventTrack(`fScanTransformation_clickNext`, {});
    gotoSection("achievementPath");
  };

  return (
    <View className="px-4 h-full flex flex-col">
      <ImageWithURL
        source={{
          uri: "https://ik.imagekit.io/socialboat/Frame_1762__1__A8UFFYh0S.png?updatedAt=1685449228580",
        }}
        className="absolute -left-1 -right-1 -top-1 -bottom-1"
      />

      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: top || 16, paddingBottom: 16 }}
      >
        <ImageWithURL
          source={{
            uri: "https://ik.imagekit.io/socialboat/Group_1777_rqQ4LDyf8.png?updatedAt=1685793133967",
          }}
          className="w-full aspect-[330/280]"
          resizeMode="contain"
        />
        <Text
          className="text-white text-2xl my-4"
          style={{ fontFamily: "Nunito-Bold" }}
        >
          {transdormationData.title}
        </Text>

        <ThingsToWorkOn />
      </ScrollView>

      <TouchableOpacity
        className="w-full rounded-2xl px-4 py-3 bg-white"
        onPress={onNext}
        style={{
          marginBottom: bottom || 16,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.25,
          shadowRadius: 12,
        }}
      >
        <Text
          className="text-[#6D55D1] text-base iphoneX:text-lg text-center"
          style={{ fontFamily: "Nunito-Bold" }}
        >
          Show Me How
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default StartTransformation;
