import { View } from "react-native";
import { useEffect, useState } from "react";
import MedicalProfileMain from "@modules/MedicalProfileMain";
import Header from "@modules/Header";
import MedicalProfileChild from "@modules/MedicalProfileMain/MedicalProfileChild";
import { useNavigation } from "@react-navigation/native";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import { weEventTrack } from "@utils/analytics/webengage/userLog";

const MedicalProfileScreen = () => {
  useScreenTrack();
  const navigation = useNavigation();
  const [nextVisble, setnextVisble] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("PregnancyHistoryScreen", {
        reinit: true,
        isGoback: false,
      });
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
          navigation.navigate("PregnancyHistoryScreen", {
            reinit: true,
            isGoback: false,
          });
          weEventTrack("medicalProfile_clickNext", {});
        }}
      >
        <MedicalProfileChild />
      </MedicalProfileMain>
    </View>
  );
};

export default MedicalProfileScreen;
