import { View } from "react-native";
import StartButton from "@modules/HomeScreen/NewHome/StartButton";
import BlurBG from "@components/BlurBG";
import { LinearGradient } from "expo-linear-gradient";

interface Props {
  btn1?: boolean;
  paddingBottom?: number;
  createCalendlySession?: () => void;
  onClickGetAccess?: () => void;
}

const ProCta: React.FC<Props> = ({
  paddingBottom,
  btn1,
  createCalendlySession,
  onClickGetAccess,
}) => {
  return (
    <LinearGradient
      colors={["#23213600", "#232136", "#232136", "#232136"]}
      className={paddingBottom ? "absolute left-0 right-0 bottom-0 p-4" : "p-4"}
      style={{ paddingBottom }}
    >
      {btn1 ? (
        <View className="relative overflow-hidden rounded-2xl">
          <StartButton
            title="Book FREE Consultation"
            bgColor="border border-[#6D55D1] z-10 p-3"
            textColor="text-[#6D55D1]"
            roundedStr="rounded-2xl"
            textStyle="text-center text-base iphoneX:text-lg"
            onPress={createCalendlySession}
            fontFamily="Nunito-Bold"
          />
          <BlurBG
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: -55,
            }}
            blurType="dark"
            blurAmount={35}
            fallbackColor="#343150"
          />
        </View>
      ) : null}
      <View className="h-4" />
      <StartButton
        onPress={onClickGetAccess}
        bgColor="p-3"
        title="Get Access"
        textColor="text-black"
        textStyle="text-center text-base iphoneX:text-lg"
        roundedStr="rounded-2xl bg-white"
        fontFamily="Nunito-Bold"
      />
    </LinearGradient>
  );
};

export default ProCta;
