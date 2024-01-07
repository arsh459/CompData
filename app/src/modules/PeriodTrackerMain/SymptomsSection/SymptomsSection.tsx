import { View, Text } from "react-native";
import SymptomHolder from "../SymptomHolder";
import { useCurrentPeriodStore } from "@providers/period/periodStore";
import { useAuthContext } from "@providers/auth/AuthProvider";

interface Props {
  view: "month" | "day";
}

const SymptomsSection: React.FC<Props> = ({ view }) => {
  const { todayUnix } = useAuthContext();

  const isVisible = useCurrentPeriodStore((state) => {
    const currentlySelectedObj =
      state.periodDateObjStore &&
      state.periodDateObjStore[
        view === "day"
          ? state.currentlySelected
          : state.currentlySelectedInMonth
      ];

    if (currentlySelectedObj?.unix <= todayUnix) {
      return true;
    }

    return false;
  });

  return isVisible ? (
    <>
      <Text
        className="text-base text-white pl-6 pb-2 "
        style={{
          fontFamily: "Nunito-Bold",
        }}
      >
        Add a symptom if any
      </Text>

      <View className="pb-4">
        <SymptomHolder view={view} />
      </View>
    </>
  ) : null;
};

export default SymptomsSection;
