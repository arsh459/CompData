import { View, Text } from "react-native";

interface Props {
  title: string;
}

const PageDescriptionComp: React.FC<Props> = ({ title }) => {
  return (
    <View className="px-4">
      <View className="w-full mt-28 mb-6">
        <Text className="text-zinc-100 text-xl font-bold font-['Nunito'] tracking-wider">
          {title}
        </Text>
      </View>
    </View>
  );
};

export default PageDescriptionComp;
