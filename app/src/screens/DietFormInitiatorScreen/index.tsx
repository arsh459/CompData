import { Text, View } from "react-native";
import { useEffect, useState } from "react";
import Header from "@modules/Header";
import { useNavigation } from "@react-navigation/native";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import MedicalProfileMain from "@modules/MedicalProfileMain";

const DietFormInitiatorScreen = () => {
  useScreenTrack();
  const navigation = useNavigation();
  const [nextVisble, setnextVisble] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("DailyFocusStart");
      setTimeout(() => setnextVisble(true), 500);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <View className="flex-1 bg-[#232136]">
      <Header tone="dark" back={true} headerColor="#232136" />
      <MedicalProfileMain
        nextVisble={nextVisble}
        onNext={() => {
          navigation.navigate("DailyFocusStart");
          weEventTrack("medicalProfile_clickNext", {});
        }}
      >
        <View className="w-full px-4 pt-12">
          <Text className="text-white/60 text-2xl font-sans font-bold pb-2">
            Tell us a bit{"\n"}
            <Text className="text-[#AB97FF]">about yourself</Text>
          </Text>
          <Text className="text-white text-sm font-sans font-medium ">
            This will take 8-10 minutes of your time.
          </Text>
        </View>
      </MedicalProfileMain>
    </View>
  );
};

export default DietFormInitiatorScreen;
