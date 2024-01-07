import { KeyboardAvoidingView, Platform } from "react-native";
import Header from "@modules/Header";
import AddButton from "@modules/AddNewItem/components/searchScreen/AddButton";
import AddItem from "./components/AddItem";
import { useState } from "react";
import useCameraImage from "@modules/ImageCaptureScreen/store/useCameraImage";
import { shallow } from "zustand/shallow";
import { useNavigation } from "@react-navigation/native";
import { weEventTrack } from "@utils/analytics/webengage/userLog";

const AiScanItemAddModule = () => {
  const navigation = useNavigation();
  const [text, setText] = useState<string>("");
  const { addSelectedItem } = useCameraImage(
    (state) => ({
      addSelectedItem: state.addSelectedItem,
    }),
    shallow
  );

  const onSave = () => {
    if (text) {
      addSelectedItem(text);
      navigation.goBack();
      weEventTrack("AiScanItemAddModule_saveItem", {});
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-[#232136] "
      contentContainerStyle={{ flex: 1 }}
    >
      <Header
        centerTitle={true}
        back={true}
        headerColor="#232136"
        tone="dark"
        headerType="solid"
      />
      <AddItem text={text} setText={setText} />
      <AddButton
        cta="Save this item"
        onPress={onSave}
        showIcon={false}
        disable={!text}
      />
    </KeyboardAvoidingView>
  );
};

export default AiScanItemAddModule;
