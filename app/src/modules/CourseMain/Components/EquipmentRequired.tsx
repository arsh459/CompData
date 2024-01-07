import { View, Text } from "react-native";

interface Props {
  equipmentString?: string;
}
const EquipmentRequired: React.FC<Props> = ({ equipmentString }) => {
  return equipmentString ? (
    <View className="bg-[#262630] px-5 py-3.5 m-4 rounded-2xl">
      <Text className="text-white text-sm font-sans py-3">
        <Text className="font-bold">Equipment needed: </Text>
        {equipmentString}
      </Text>
    </View>
  ) : null;
};

export default EquipmentRequired;
