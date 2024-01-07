import SvgIcons from "@components/SvgIcons";
import { useCurrentPeriodStore } from "@providers/period/periodStore";
import { useNavigation } from "@react-navigation/native";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
  view: "month" | "day";
}

const LogSymptoms: React.FC<Props> = ({ view }) => {
  const { navigate } = useNavigation();

  const date = useCurrentPeriodStore((state) =>
    view === "day" ? state.currentlySelected : state.currentlySelectedInMonth
  );

  return (
    <TouchableOpacity
      onPress={() => {
        navigate("SymptomTrackerScreen", { date });
        weEventTrack("period_clickLogSymptoms", {});
      }}
      className="flex flex-row items-center p-4 justify-center bg-[#0091C0]/20 border border-[#3ACFFF] mx-4 rounded-xl"
    >
      <View className="bg-[#3ACFFF] w-6 h-6 flex items-center justify-center rounded-full">
        <TouchableOpacity className="w-3 h-3 ">
          <SvgIcons iconType="plus" color="#343150" />
        </TouchableOpacity>
      </View>
      <Text
        className="text-sm iphoneX:text-base text-[#3ACFFF] pl-2 "
        style={{
          fontFamily: "Nunito-SemiBold",
        }}
      >
        Log your symptom that you noticed
      </Text>
    </TouchableOpacity>
  );
};

export default LogSymptoms;
