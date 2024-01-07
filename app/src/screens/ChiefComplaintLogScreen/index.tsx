import {
  View,
  TextInput,
  KeyboardAvoidingView,
  useWindowDimensions,
  Platform,
} from "react-native";
import { useEffect, useState } from "react";
import DoctorFormWrapper from "@modules/DoctorFormMain/DoctorFormWrapper";
import { useNavigation } from "@react-navigation/native";
import { updateUserField } from "@modules/LifeStyleMain/utils";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";

const ChiefComplaintLogScreen = () => {
  const navigation = useNavigation();

  const { uid, chiefComplainDB } = useUserStore(({ user }) => {
    return {
      uid: user?.uid,
      chiefComplainDB: user?.doctorForm?.chiefComplain,
    };
  }, shallow);

  const [text, setText] = useState<string>();

  useEffect(() => {
    if (chiefComplainDB) {
      setText(chiefComplainDB);
    }
  }, [chiefComplainDB]);

  const { width, height } = useWindowDimensions();

  const onProceed = async () => {
    await updateUserField(uid, {
      [`doctorForm.chiefComplain`]: text,
    });

    weEventTrack("medicalProfile_addIssue", {});

    navigation.navigate("BookAppointmentSlotScreen", {
      category: "gynaecologist",
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      contentContainerStyle={{ width, height }}
      className="bg-[#232136] flex-1"
    >
      <DoctorFormWrapper
        headingProgress="Medical Profile"
        progress={5 / 5}
        heading="Briefly describe your issue to the doctor."
        disabled={!text ? true : false}
        onNext={onProceed}
        btnText="Proceed"
      >
        <View className="flex-1 p-4">
          <View className="flex-1">
            <TextInput
              style={{
                height: Math.max(130),
                textAlignVertical: "top",
                color: "#D0CFE4",
              }}
              className=" text-base px-4 py-2 bg-[#D4CFFF2E] rounded-[20px]"
              placeholder="Type something"
              placeholderTextColor="#C5C4D9"
              onChangeText={(newText) => setText(newText)}
              value={text}
              multiline={true}
              // returnKeyType="done"
              // onSubmitEditing={onProceed}
            />
          </View>
        </View>
      </DoctorFormWrapper>
    </KeyboardAvoidingView>
  );
};

export default ChiefComplaintLogScreen;
