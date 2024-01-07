import { View, Text } from "react-native";

const MedicalProfileChild = () => {
  return (
    <View className="w-2/3 mx-auto pt-12">
      <Text
        className="text-white text-2xl  pb-5"
        style={{ fontFamily: "Nunito-Bold" }}
      >
        Book the Doctor's Appointment
      </Text>
      <Text
        className="text-white/60 text-base "
        style={{ fontFamily: "Nunito-Bold" }}
      >
        This information will only be shared with your doctor and will be kept{" "}
        <Text className="text-[#51FF8C]">completely private.</Text>
      </Text>
    </View>
  );
};

export default MedicalProfileChild;
