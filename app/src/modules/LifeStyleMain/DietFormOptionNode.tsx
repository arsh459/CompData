import { View, Text } from "react-native";

const DietFormOptionNode: React.FC<{
  progress?: number;
  heading?: string;
}> = ({ progress, heading }) => (
  <View className="w-full mx-auto flex-1 flex justify-center py-2">
    <Text className="text-[#F5F5F7] text-xs font-sans w-1/2 mx-auto  text-center pb-1">
      {heading}
    </Text>
    {progress ? (
      <View className="w-1/4 mx-auto h-1 bg-white/25 rounded-sm overflow-hidden mb-4">
        <View
          className="h-full bg-[#FF5970] rounded-full"
          style={{
            width: `${100 * (progress > 1 ? 1 : progress < 0 ? 0 : progress)}%`,
          }}
        />
      </View>
    ) : null}
  </View>
);

export default DietFormOptionNode;
