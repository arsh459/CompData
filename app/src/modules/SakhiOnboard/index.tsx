import {
  View,
  ImageBackground,
  ScrollView,
  useWindowDimensions,
  NativeScrollEvent,
} from "react-native";
import { sakhiLinearBg } from "@constants/imageKitURL";
import Header from "@modules/Header";
import SakhiPartOne from "./SakhiPartOne";
import ChatWithSakhi from "./ChatWithSakhi";
import SakhiPartTwo from "./SakhiPartTwo";
import SakhiPartThree from "./SakhiPartThree";
import SakhiPartLast from "./SakhiPartLast";
import SakhiDemoPart from "./SakhiDemoPart";
import { useState } from "react";
import { useInteractionContext } from "@providers/InteractionProvider/InteractionProvider";
import Loading from "@components/loading/Loading";
import { SakhiExplainerProps } from "@screens/SakhiExplainer";

const SakhiOnboard: React.FC<SakhiExplainerProps> = ({ goBack }) => {
  const { height } = useWindowDimensions();
  const { interactionStatus } = useInteractionContext();
  const [endReached, setEndReached] = useState<boolean>(false);

  const [startDemoAnimation1, setStartDemoAnimation1] =
    useState<boolean>(false);
  const [startDemoAnimation2, setStartDemoAnimation2] =
    useState<boolean>(false);

  const handleScrollNativeEvent = (e: NativeScrollEvent) => {
    const section = Math.ceil(e.contentOffset.y / e.layoutMeasurement.height);

    if (
      e.layoutMeasurement.height + e.contentOffset.y >=
      e.contentSize.height
    ) {
      setEndReached(true);
    } else if (section >= 3) {
      setStartDemoAnimation2(true);
    } else if (section >= 2) {
      setStartDemoAnimation1(true);
    } else if (endReached) {
      setEndReached(false);
    }
  };

  return (
    <View className="flex-1 relative z-0 bg-[#5F46C9]">
      <ImageBackground source={{ uri: sakhiLinearBg }} className="flex-1">
        <Header
          back={true}
          headerColor="#5F46C9CC"
          tone="dark"
          headerType="transparent"
        />

        <ScrollView
          className="flex-1"
          snapToInterval={height}
          snapToAlignment="center"
          decelerationRate="fast"
          disableIntervalMomentum={true}
          onScroll={({ nativeEvent }) => handleScrollNativeEvent(nativeEvent)}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <SakhiPartOne />
          <SakhiPartTwo />
          <SakhiDemoPart
            startDemoAnimation1={startDemoAnimation1}
            startDemoAnimation2={startDemoAnimation2}
          />
          <SakhiPartThree />
          <SakhiPartLast />
        </ScrollView>

        <ChatWithSakhi showScrollDown={endReached} goBack={goBack} />
      </ImageBackground>

      {interactionStatus ? null : (
        <View className="absolute left-0 right-0 top-0 bottom-0 bg-[#5F46C9] flex justify-center items-center">
          <Loading width="w-16" height="h-16" />
        </View>
      )}
    </View>
  );
};

export default SakhiOnboard;
