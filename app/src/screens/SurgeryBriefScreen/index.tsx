import {
  View,
  TextInput,
  useWindowDimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import DoctorFormWrapper from "@modules/DoctorFormMain/DoctorFormWrapper";
import { backTwoTimes, updateUserField } from "@modules/LifeStyleMain/utils";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { ReinitParams } from "@modules/NutritionSettingMain";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";

const SurgeryBriefScreen = () => {
  useScreenTrack();
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as ReinitParams;

  const { uid, surgeryBriefDB } = useUserStore(({ user }) => {
    return {
      uid: user?.uid,
      surgeryBriefDB: user?.doctorForm?.surgeryBrief,
    };
  }, shallow);

  const [text, setText] = useState<string>();

  useEffect(() => {
    if (surgeryBriefDB && !params.reinit) {
      setText(surgeryBriefDB);
    }
  }, [surgeryBriefDB, params.reinit]);

  const { width, height } = useWindowDimensions();

  const onProceed = async () => {
    if (text) {
      await updateUserField(uid, {
        [`doctorForm.surgeryBrief`]: text,
      });
    }

    weEventTrack("medicalProfile_addSurgerHistoryText", {});

    if (params?.isGoback && navigation.canGoBack()) {
      backTwoTimes(navigation);
    } else {
      navigation.navigate("SexualActivityStatusScreen", {
        reinit: true,
        isGoback: false,
      });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      contentContainerStyle={{ width, height }}
      className="bg-[#232136] flex-1"
    >
      <DoctorFormWrapper
        headingProgress="Medical Profile"
        progress={4 / 5}
        heading="Briefly describe about your surgery "
        disabled={!text ? true : false}
        onNext={onProceed}
        btnText="Proceed"
      >
        <View className="flex-1 p-4">
          <View className="flex-1">
            <TextInput
              style={{
                height: Math.max(130),
                // textAlignVertical: "center",
                textAlignVertical: "top",
                color: "#D0CFE4",
              }}
              className=" text-base px-4 py-2 bg-[#D4CFFF2E] rounded-[20px]"
              placeholder="Type something"
              placeholderTextColor="#C5C4D9"
              onChangeText={(newText) => setText(newText)}
              value={text}
              multiline={true}
            />
          </View>
        </View>
      </DoctorFormWrapper>
    </KeyboardAvoidingView>
  );
};

export default SurgeryBriefScreen;
