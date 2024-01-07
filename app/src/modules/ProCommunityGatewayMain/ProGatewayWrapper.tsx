import { View, ScrollView } from "react-native";
import { useState } from "react";
import ImageWithURL from "@components/ImageWithURL";
import { pauseIcon } from "@constants/imageKitURL";
import StartButton from "@modules/HomeScreen/NewHome/StartButton";
import Header from "@modules/Header";
interface Props {
  onPress: () => void;
  children?: React.ReactNode;
  icon: string;
  btnTitle: string;
}
const ProGatewayWrapper: React.FC<Props> = ({
  onPress,
  children,
  btnTitle,
  icon,
}) => {
  const [headerHeight, setHeaderHeight] = useState(0);
  return (
    <>
      <Header
        back={true}
        tone="dark"
        headerType="transparent"
        setHeaderHeight={setHeaderHeight}
      />
      <View className="flex-1 bg-[#232136]">
        <ScrollView
          className="flex-1 flex "
          style={{ marginTop: headerHeight }}
          contentContainerStyle={{ alignItems: "center" }}
        >
          <ImageWithURL
            source={{
              uri: icon ? icon : pauseIcon,
            }}
            className="w-4/5 mx-auto aspect-[216/216]"
          />
          {children}
        </ScrollView>
        <View className=" p-4">
          <StartButton
            title={btnTitle ? btnTitle : "Download App"}
            bgColor="bg-[#6D55D1]"
            textColor="text-white "
            roundedStr="rounded-2xl"
            textStyle="py-4 text-center text-sm iphoneX:text-base "
            fontFamily="Nunito-Bold"
            onPress={onPress}
          />
        </View>
      </View>
    </>
  );
};

export default ProGatewayWrapper;
