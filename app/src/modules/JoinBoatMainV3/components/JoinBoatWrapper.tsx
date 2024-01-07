import Header from "@modules/Header";
import clsx from "clsx";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ClickButton from "./ClickButton";

interface Props {
  children: React.ReactNode;
  title?: string;
  nextBtnText?: string;
  onNext?: () => void;
  disabled?: boolean;
  progress?: number;
  noBack?: boolean;
  oldCta?: boolean;
  bgColor?: string;
  onSkip?: () => void;
}

const JoinBoatWrapper: React.FC<Props> = ({
  children,
  title,
  nextBtnText,
  onNext,
  disabled,
  progress,
  noBack,
  oldCta,
  bgColor,
  onSkip,
}) => {
  const { bottom } = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <Header
        back={noBack ? false : true}
        headerColor={bgColor ? bgColor : "#232136"}
        tone="dark"
        optionNode={
          onSkip ? (
            <TouchableOpacity
              className="bg-white rounded-full px-4 py-1"
              onPress={onSkip}
            >
              <Text
                className="text-black text-sm font-medium"
                // style={{ fontFamily: "Nunito-Regular" }}
              >
                Skip for now
              </Text>
            </TouchableOpacity>
          ) : undefined
        }
      />
      <View
        className="flex-1 flex flex-col"
        style={{ backgroundColor: bgColor ? bgColor : "#232136" }}
      >
        <View className="px-4">
          {progress ? (
            <View className="w-full h-1 bg-white/25 rounded-full overflow-hidden my-4">
              <View
                className="h-full bg-[#FE3394] rounded-full"
                style={{
                  width: `${
                    100 * (progress > 1 ? 1 : progress < 0 ? 0 : progress)
                  }%`,
                }}
              />
            </View>
          ) : null}

          {title ? (
            <Text
              className="text-[#F1F1F1] text-xl iphoneX:text-2xl font-popM mb-4"
              style={{
                fontFamily: oldCta ? "BaiJamjuree-Bold" : "Nunito-Bold",
              }}
            >
              {title}
            </Text>
          ) : null}
        </View>

        <View className="flex-1">{children}</View>

        {onNext ? (
          <View className="w-full p-4" style={{ paddingBottom: bottom || 16 }}>
            {oldCta ? (
              <TouchableOpacity
                className={clsx(
                  "rounded-full px-4 py-3 w-full",
                  disabled ? "bg-[#757575]" : "bg-white"
                )}
                onPress={onNext}
                disabled={disabled}
              >
                <Text className="text-[#232136] font-popR text-base iphoneX:text-xl text-center">
                  {nextBtnText ? nextBtnText : "Next"}
                </Text>
              </TouchableOpacity>
            ) : (
              <ClickButton
                disabled={disabled}
                nextBtnText={nextBtnText}
                onNext={onNext}
              />
            )}
          </View>
        ) : null}
      </View>
    </KeyboardAvoidingView>
  );
};

export default JoinBoatWrapper;
