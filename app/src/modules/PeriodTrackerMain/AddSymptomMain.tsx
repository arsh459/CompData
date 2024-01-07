import { ScrollView, Text, View } from "react-native";
import { useState } from "react";
import Header from "@modules/Header";
import SymptomCard from "./SymptomCard";
import StartButton from "@modules/HomeScreen/NewHome/StartButton";

import { format } from "date-fns";
import { symptomsList } from "./constants";
import { usePeriodDate } from "@providers/period/hooks/usePeriodDate";
import { useNavigation } from "@react-navigation/native";

export type CircleType = "red" | "white" | "unknown";
export interface SymptomsSelected {
  [key: string]: boolean;
}

interface Props {
  date: string;
}

const AddSymptomMain: React.FC<Props> = ({ date }) => {
  const navigation = useNavigation();
  const [headerHeight, setHeaderHeight] = useState(0);
  const { periodDateObj, onSave, onUpdateSymptoms } = usePeriodDate(date);

  const handleSave = async () => {
    await onSave();
    navigation.goBack();
  };

  return (
    <View className="flex-1 bg-[#232136] relative">
      <Header
        back={true}
        headerType="solid"
        title="Log your symptoms"
        tone="dark"
        headerColor="#232136"
        setHeaderHeight={setHeaderHeight}
      />
      <ScrollView className="flex-1 " style={{ marginTop: headerHeight }}>
        <View className="flex flex-row items-center px-4 pt-2">
          <View className="w-5 aspect-square bg-red-400 rounded-full" />
          <Text
            className="text-base text-white pl-1.5  "
            style={{
              fontFamily: "Nunito-Bold",
            }}
          >
            {format(new Date(date), "do MMM")}
          </Text>
        </View>
        <View className="bg-[#343150] p-4 m-4 flex flex-row flex-wrap rounded-2xl flex-1">
          {symptomsList.map((item) => {
            const isSelected =
              periodDateObj?.loggedSymptoms &&
              periodDateObj.loggedSymptoms[item.text]
                ? true
                : false;
            return (
              <View key={item.text} className="relative z-0">
                <SymptomCard
                  onPress={() => onUpdateSymptoms(item)}
                  item={item.text}
                  image={item.image}
                  isSelected={isSelected}
                />
              </View>
            );
          })}
        </View>
      </ScrollView>
      <View className="p-4 my-4">
        <StartButton
          onPress={handleSave}
          title="Save to Symptom List"
          bgColor="bg-[#6D55D1]"
          textColor="text-white "
          roundedStr="rounded-2xl"
          textStyle="py-2 text-center text-lg   "
          fontFamily="Nunito-Bold"
        />
      </View>
    </View>
  );
};

export default AddSymptomMain;
