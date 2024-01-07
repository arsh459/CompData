import { currentPlanBgImg } from "@constants/imageKitURL";
import Help from "@components/Buttons/HelpBtn";
import { View, Image, SafeAreaView } from "react-native";

interface Props {
  children: React.ReactNode;
  headerText?: string;
  headerBackIcon?: string;
  bgImg?: string;
  showHelp?: boolean;
}

const CurrentPlanContainer: React.FC<Props> = ({
  bgImg,
  headerText,
  headerBackIcon,
  children,
  showHelp,
}) => {
  return (
    <SafeAreaView className="flex-1 relative bg-[#100F1A] ">
      <Image
        source={{ uri: bgImg ? bgImg : currentPlanBgImg }}
        style={{
          flex: 1,
          // maxHeight: "65%",
        }}
      />
      <View className="flex flex-col absolute bottom-0 right-0 left-0   min-h-[250px]">
        {showHelp ? (
          <View className="self-end pr-2 py-4">
            <Help />
          </View>
        ) : null}
        {children}
      </View>
    </SafeAreaView>
  );
};
export default CurrentPlanContainer;
