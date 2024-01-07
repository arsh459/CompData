import TickCheck from "@components/SvgIcons/TickCheck";
import { View, Text } from "react-native";

const data: string[] = [
  "Treated by Renowned Gynaecologists",
  "Get Expert dieticians",
  "Followed up by health Coaches",
];

const YouGet = () => {
  return (
    <View className="w-full p-4">
      <Text className="flex-1 text-[#F5F1FF] text-base iphoneX:text-lg font-medium">
        What will you get :
      </Text>
      {data.map((each) => (
        <View key={each} className="flex flex-row items-center pt-4">
          <View className="w-4 iphoneX:w-5 aspect-square mr-4">
            <TickCheck color="#DBCCFF" />
          </View>
          <Text className="flex-1 text-[#DBCCFF] text-sm iphoneX:text-base">
            {each}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default YouGet;
