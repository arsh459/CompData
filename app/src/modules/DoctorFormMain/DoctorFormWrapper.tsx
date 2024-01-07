import { View, Text } from "react-native";
import Header from "@modules/Header";
import DietFormOptionNode from "@modules/LifeStyleMain/DietFormOptionNode";
import clsx from "clsx";
import ClickButton from "@modules/JoinBoatMainV3/components/ClickButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
interface Props {
  progress?: number;
  headingProgress?: string;
  heading?: string;
  children?: React.ReactNode;
  headingStyleTw?: string;
  btnText?: string;
  onNext?: () => void;
  disabled?: boolean;
}
const DoctorFormWrapper: React.FC<Props> = ({
  heading,
  progress,
  children,
  headingProgress,
  headingStyleTw,
  onNext,
  disabled,
  btnText,
}) => {
  const { bottom } = useSafeAreaInsets();
  return (
    <View className="flex-1 bg-[#232136]">
      <Header
        back={true}
        headerColor="#232136"
        tone="dark"
        titleNode={
          <DietFormOptionNode
            progress={progress || 0}
            heading={headingProgress}
          />
        }
        centerTitle={true}
      />
      <Text
        className={clsx(
          "text-xl text-[#f1f1f1] px-2  w-11/12 mx-auto pt-10",
          headingStyleTw
        )}
        style={{ fontFamily: "Nunito-Bold" }}
      >
        {heading}
      </Text>
      {children}

      {onNext && btnText ? (
        <View style={{ paddingBottom: bottom || 16 }} className="p-4">
          <ClickButton
            nextBtnText={btnText}
            onNext={onNext}
            disabled={disabled}
          />
        </View>
      ) : null}
    </View>
  );
};

export default DoctorFormWrapper;
