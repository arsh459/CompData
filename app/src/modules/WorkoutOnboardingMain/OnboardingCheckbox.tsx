import { View, Text, TouchableOpacity } from "react-native";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onPress: () => void;
}

const OnboardingCheckbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onPress,
}) => {
  return (
    <TouchableOpacity
      className="flex-row items-center justify-between"
      onPress={onPress}
    >
      <Text
        className="text-base iphoneX:text-lg text-white capitalize"
        style={{ fontFamily: "Nunito-SemiBold" }}
      >
        {label}
      </Text>
      <View
        className={`w-6 h-6 rounded-full border-[1px] flex items-center justify-center ${
          checked ? "bg-white" : "bg-[#343150] border-white"
        }`}
      >
        {checked ? <Text className="text-[#2FB55C] text-sm">✓</Text> : null}
      </View>
    </TouchableOpacity>
  );
};
export default OnboardingCheckbox;
