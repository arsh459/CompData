import { View, Text, ScrollView, TouchableOpacity } from "react-native";

import { dataAddEnergy } from "./utils";
import ImageWithURL from "@components/ImageWithURL";
import { getIconByEnergy } from "../utils";
interface Props {
  selectedValue: number;
  handleValueSelect: (value: number) => void;
}
const EnergyIconToAdd: React.FC<Props> = ({
  selectedValue,
  handleValueSelect,
}) => {
  return (
    <ScrollView bounces={false} className="flex-1 bg-[#232136]">
      <Text
        numberOfLines={2}
        className="text-white text-xl p-4"
        style={{ fontFamily: "Nunito-Bold" }}
      >
        How is your energy for today ?
      </Text>
      <View className="flex flex-row justify-between p-1.5">
        {dataAddEnergy.map((i, index) => (
          <TouchableOpacity
            key={index}
            style={{
              backgroundColor:
                selectedValue === i.energy ? "#FFFFFF" : "#343150",
            }}
            className="flex-1 py-2 rounded-lg items-center justify-around mx-2 aspect-[97/129] "
            onPress={() => handleValueSelect(i.energy)}
          >
            <ImageWithURL
              source={{
                uri: getIconByEnergy(i.energy, true).icon,
              }}
              className="aspect-[30/60] w-1/3 "
            />
            <Text
              numberOfLines={2}
              style={{
                color: selectedValue === i.energy ? "#232136" : "white",
              }}
              className="capitalize text-xs px-1.5  text-center"
            >
              {i.energyType}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default EnergyIconToAdd;
