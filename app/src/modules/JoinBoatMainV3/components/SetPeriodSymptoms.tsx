import { ColorValue, Text, View } from "react-native";
import JoinBoatWrapper from "./JoinBoatWrapper";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";
import { useEffect, useState } from "react";
import { symptomsList } from "@modules/PeriodTrackerMain/constants";
import SymptomCard from "@modules/PeriodTrackerMain/SymptomCard";
import { symptomId } from "@models/User/symptoms";

interface Props {
  onPeriodSymptomsSave: (val?: symptomId[]) => void;
  nextBtnText: string;
  progress?: number;
  target: "symptomsDuringPeriod" | "symptomsBeforePeriod";
  title: string;
  highlightedTitle: string;
  highlightedColor: ColorValue;
}

const SetPeriodSymptoms: React.FC<Props> = ({
  onPeriodSymptomsSave,
  nextBtnText,
  progress,
  target,
  title,
  highlightedTitle,
  highlightedColor,
}) => {
  const splidedTitle = `__${title}__`.split(highlightedTitle);
  const [symptoms, setSymptoms] = useState<symptomId[]>();

  const toggleSymptom = (id: symptomId) => {
    setSymptoms((prev) => {
      if (prev) {
        if (prev.includes(id)) {
          return prev.filter((each) => each !== id);
        } else {
          return id === "no_symptom"
            ? [id]
            : [...prev.filter((each) => each !== "no_symptom"), id];
        }
      } else {
        return [id];
      }
    });
  };

  const pcosSymptomsDB = useUserStore(
    (state) => state.user?.periodTrackerObj?.[target],
    shallow
  );

  useEffect(() => {
    if (pcosSymptomsDB) {
      setSymptoms(pcosSymptomsDB);
    }
  }, [pcosSymptomsDB]);

  return (
    <JoinBoatWrapper
      onNext={() => onPeriodSymptomsSave(symptoms)}
      disabled={!symptoms}
      nextBtnText={nextBtnText}
      progress={progress}
      key={target}
    >
      <Text
        className="text-[#F1F1F1] text-xl px-4"
        style={{ fontFamily: "Nunito-Bold" }}
      >
        {splidedTitle[0] && splidedTitle[0].replaceAll("__", "")}
        <Text style={{ color: highlightedColor }}>
          {` ${highlightedTitle} `}
        </Text>
        {splidedTitle[1] && splidedTitle[1].replaceAll("__", "")}
      </Text>

      <View className="flex flex-row flex-wrap py-8">
        {symptomsList.map((item) => {
          const isSelected = symptoms?.includes(item.id) ? true : false;
          return (
            <View key={item.text} className="relative z-0">
              <SymptomCard
                onPress={() => toggleSymptom(item.id)}
                item={item.text}
                image={item.image}
                isSelected={isSelected}
                textColor="#FFFFFF"
                tagColor={highlightedColor as string}
              />
            </View>
          );
        })}
      </View>
    </JoinBoatWrapper>
  );
};

export default SetPeriodSymptoms;
