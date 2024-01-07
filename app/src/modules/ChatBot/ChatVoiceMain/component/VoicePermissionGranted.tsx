import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";
import MicSection from "./MicSection";
import useCreatePlayerInstance from "@providers/chat/hook/useCreatePlayerInstance";

const VoicePremissionGranted = () => {
  useCreatePlayerInstance();
  return (
    <View className="flex-1 relative flex items-center">
      {/* ******** Background********* */}
      <LinearGradient
        colors={["#232136", "#1A1360", "#2A2087"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        className="absolute left-0 right-0 top-0 bottom-0"
      />

      <MicSection />
    </View>
  );
};

export default VoicePremissionGranted;
