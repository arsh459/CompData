import Header from "@modules/Header";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import JoinBoatProgress from "./JoinBoatProgress";
import clsx from "clsx";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { weEventTrack } from "@utils/analytics/webengage/userLog";

interface Props {
  children: React.ReactNode;
  headText?: string;
  title?: string;
  nextBtnText?: string;
  onNext?: () => void;
  current?: number;
  disabled?: boolean;
  skip?: JSX.Element;
  noBack?: boolean;
  backOnDone?: boolean;
}

const JoinBoatWrapper: React.FC<Props> = ({
  children,
  headText,
  title,
  nextBtnText,
  onNext,
  current,
  disabled,
  skip,
  noBack,
  backOnDone,
}) => {
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation();

  const onBack = () => {
    navigation.goBack();
    weEventTrack("fScan_goBack", {});
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <Header
        back={!noBack}
        onBack={onBack}
        headerColor="#100F1A"
        tone="dark"
        titleNode={
          backOnDone ? (
            <View />
          ) : (
            <View
              className={clsx(
                "flex-1 flex justify-center items-center",
                top ? "" : "pt-2"
              )}
            >
              <Text className="text-center text-[#F5F5F7] text-xs">
                {headText}
              </Text>
              <JoinBoatProgress current={current ? current : 0} total={12} />
            </View>
          )
        }
        centerTitle={true}
      />
      <SafeAreaView className="flex-1 bg-[#100F1A]">
        {title ? (
          <Text
            className="text-center text-[#F1F1F1] text-xl iphoneX:text-2xl p-4"
            style={{ fontFamily: "BaiJamjuree-Bold" }}
          >
            {title}
          </Text>
        ) : null}

        <View className="flex-1">{children}</View>

        {onNext ? (
          <TouchableOpacity
            className={clsx(
              "rounded-full px-4 py-3 m-4",
              disabled ? "bg-[#757575]" : "bg-white"
            )}
            onPress={onNext}
            disabled={disabled}
          >
            <Text
              className="text-[#100F1A] text-base iphoneX:text-xl text-center"
              style={{ fontFamily: "BaiJamjuree-Bold" }}
            >
              {nextBtnText ? nextBtnText : backOnDone ? "Done" : "Next"}
            </Text>
          </TouchableOpacity>
        ) : null}
        {skip}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default JoinBoatWrapper;
