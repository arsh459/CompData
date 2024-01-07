import { View, ScrollView, TouchableOpacity } from "react-native";
import { useState } from "react";
import SvgIcons from "@components/SvgIcons";
import clsx from "clsx";

import firestore from "@react-native-firebase/firestore";
import SymptomCard from "./SymptomCard";
import { useNavigation } from "@react-navigation/native";

import RemoveSymtomModal from "@models/RemoveSymtomModal";
import { useCurrentPeriodStore } from "@providers/period/periodStore";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { LoggedSymptom } from "@models/User/User";
import { weEventTrack } from "@utils/analytics/webengage/userLog";

interface Props {
  view: "month" | "day";
}

const RemoveSymptom: React.FC<Props> = ({ view }) => {
  const { navigate } = useNavigation();
  const [selectedSymptom, setSelectedSymptom] = useState<
    LoggedSymptom | undefined
  >(undefined);
  const { state } = useAuthContext();

  const date = useCurrentPeriodStore((state) =>
    view === "day" ? state.currentlySelected : state.currentlySelectedInMonth
  );
  const onRefreshSymptoms = useCurrentPeriodStore(
    (state) => state.onRefreshSymptoms
  );

  const { loggedSymptoms, id } = useCurrentPeriodStore((state) => {
    const dt =
      state.periodDateObjStore[
        view === "day"
          ? state.currentlySelected
          : state.currentlySelectedInMonth
      ];
    return {
      loggedSymptoms: dt?.loggedSymptoms,
      id: dt?.id,
    };
  });

  const onSymptomRemove = async () => {
    if (selectedSymptom) {
      await firestore()
        .collection("users")
        .doc(state.uid)
        .collection("periodDates")
        .doc(id)
        .update({
          [`loggedSymptoms.${selectedSymptom.text}`]:
            firestore.FieldValue.delete(),
          // delete previous recommendations
          recommendations: firestore.FieldValue.delete(),
        });

      await onRefreshSymptoms(date);

      setSelectedSymptom(undefined);
    }

    weEventTrack("period_clickRemoveSymptom", {});
  };

  return (
    <View className="flex flex-row items-center   mx-4 rounded-xl">
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ alignItems: "center" }}
        className=" flex flex-row pl-2 "
      >
        <View className="bg-[#3ACFFF] w-10 h-10  flex items-center justify-center rounded-full">
          <TouchableOpacity
            onPress={() => {
              navigate("SymptomTrackerScreen", { date });
              weEventTrack("period_clickAddSymptom", {});
            }}
            className="w-5 h-5 "
          >
            <SvgIcons iconType="plus" color="#343150" />
          </TouchableOpacity>
        </View>
        {loggedSymptoms &&
          Object.keys(loggedSymptoms)?.map((item, index) => {
            if (loggedSymptoms) {
              const symptomComp = loggedSymptoms[item];
              const text = item;
              const image = symptomComp.image;
              return (
                <View
                  key={item}
                  className={clsx("relative z-0", index === 0 && "pl-2")}
                >
                  <SymptomCard
                    onPress={() => setSelectedSymptom(symptomComp)}
                    item={text}
                    image={image}
                    isSelected={true}
                    isInDb={true}
                  />
                </View>
              );
            }
          })}
      </ScrollView>
      <RemoveSymtomModal
        isOpen={selectedSymptom ? true : false}
        onClose={() => setSelectedSymptom(undefined)}
        onDelete={onSymptomRemove}
      />
    </View>
  );
};

export default RemoveSymptom;
