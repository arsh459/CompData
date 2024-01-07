import { useCurrentPeriodStore } from "@providers/period/periodStore";
import { View } from "react-native";
import RemoveSymptom from "./RemoveSymptom";
import LogSymptoms from "./LogSymptoms";
import { shallow } from "zustand/shallow";

interface Props {
  view: "month" | "day";
}

const SymptomHolder: React.FC<Props> = ({ view }) => {
  const { isSymptomExist } = useCurrentPeriodStore((state) => {
    const dp =
      state.periodDateObjStore[
        view === "day"
          ? state.currentlySelected
          : state.currentlySelectedInMonth
      ];

    return {
      isSymptomExist:
        dp?.loggedSymptoms && Object.keys(dp.loggedSymptoms).length
          ? true
          : false,
    };
  }, shallow);

  return (
    <View>
      {isSymptomExist ? (
        <RemoveSymptom view={view} />
      ) : (
        <LogSymptoms view={view} />
      )}
    </View>
  );
};

export default SymptomHolder;
