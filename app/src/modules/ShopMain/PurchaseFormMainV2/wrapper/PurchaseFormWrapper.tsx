import Header from "@modules/Header";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  ScrollView,
  View,
} from "react-native";
import FormProgress from "../components/FormProgress";
import ClickButton from "@modules/JoinBoatMainV3/components/ClickButton";
import React from "react";
interface Props {
  children: React.ReactNode;
  formTitle: string;
  onNext?: () => void;
  onBack?: () => void;
  disabled?: boolean;
  progress?: number;
  noBack?: boolean;
  oldCta?: boolean;
  bgColor?: string;
  onSkip?: () => void;
}

const PurchaseFormWrapper: React.FC<Props> = ({
  children,
  onNext,
  onBack,
  formTitle,
  disabled,
}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <Header
        title="Fill-Up the details"
        centerTitle={true}
        back={true}
        tone="dark"
        headerColor="#232136"
        onBack={onBack}
      />
      <View className="flex-1  bg-[#232136]">
        <FormProgress />
        <View className="px-4">
          <Text className=" text-white text-base">{formTitle}</Text>
        </View>
        <ScrollView className="flex-1 pt-4">{children}
        <Text className="text-[#C6C6C6]/50 px-4">Note : The items are only restricted to India as they are shipped within India</Text></ScrollView>
        <View className="p-4">
          <ClickButton
            disabled={disabled}
            nextBtnText="Proceed next"
            onNext={onNext ? onNext : () => {}}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default PurchaseFormWrapper;
