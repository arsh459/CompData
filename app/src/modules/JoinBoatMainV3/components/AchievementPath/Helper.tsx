import { View, Text } from "react-native";

export const ListHeaderComponent = () => {
  return (
    <View className="my-12">
      <Text
        className="text-white text-2xl"
        style={{ fontFamily: "Nunito-Bold" }}
      >
        How will we achieve this?
      </Text>
      <Text
        className="text-white/70 text-base"
        style={{ fontFamily: "Nunito-Regular" }}
      >
        Your health coach will customise this plan with you.
      </Text>
    </View>
  );
};

export const ItemSeparatorComponent = () => {
  return (
    <View className="flex items-center">
      <View
        style={{
          height: 70,
          borderColor: "#F3E8FF",
          borderWidth: 1,
          borderStyle: "dotted",
        }}
      />
    </View>
  );
};
