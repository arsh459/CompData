import Header from "@modules/Header";
import clsx from "clsx";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import PeriodOnboardOptionNode from "./PeriodOnboardOptionNode";

interface Props {
  children: React.ReactNode;
  title?: string;
  nextBtnText?: string;
  onNext?: () => void;
  disabled?: boolean;
  progress?: number;
  noBack?: boolean;
}

const PeriodOnboardWrapper: React.FC<Props> = ({
  children,
  title,
  nextBtnText,
  onNext,
  disabled,
  progress,
  noBack,
}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <Header
        back={noBack ? false : true}
        headerColor="#100F1A"
        tone="dark"
        titleNode={<PeriodOnboardOptionNode progress={progress} />}
        centerTitle={true}
      />
      <View className="flex-1 bg-[#100F1A] flex flex-col">
        <View className="px-4">
          {title ? (
            <Text
              className="text-[#F1F1F1] text-lg text-center mb-4"
              style={{ fontFamily: "Nunito-Bold" }}
            >
              {title}
            </Text>
          ) : null}
        </View>

        <View className="flex-1">{children}</View>

        {onNext ? (
          <View className="w-full p-4">
            <TouchableOpacity
              className={clsx(
                "rounded-2xl px-4 py-3 w-full",
                disabled ? "bg-[#757575]" : "bg-[#6D55D1]"
              )}
              onPress={onNext}
              disabled={disabled}
            >
              <Text
                className="text-white  text-base iphoneX:text-xl text-center"
                style={{ fontFamily: "Nunito-Bold" }}
              >
                {nextBtnText ? nextBtnText : "Next"}
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </KeyboardAvoidingView>
  );
};

export default PeriodOnboardWrapper;
