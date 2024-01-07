import { useInteractionContext } from "@providers/InteractionProvider/InteractionProvider";
import Loading from "@components/loading/Loading";
import {
  NativeScrollEvent,
  ScrollView,
  View,
  useWindowDimensions,
} from "react-native";
import { SakhiExplainerProps } from "@screens/SakhiExplainer";
import { LinearGradient } from "expo-linear-gradient";
import Section1 from "./Section1";
import Section2 from "./Section2";
import SwipeDown from "./SwipeDown";
import { Section3Item, Section3StickyHeader, section3Data } from "./Section3";
import Section4 from "./Section4";
import Section5 from "./Section5";
import { useState } from "react";
import Header from "@modules/Header";
import ChatWithSakhi from "../ChatWithSakhi";

const stickyHeaderIndices = [0, 3, 3 + section3Data.length];

const SakhiOnboardV2: React.FC<SakhiExplainerProps> = ({ goBack }) => {
  const { height } = useWindowDimensions();
  const { interactionStatus } = useInteractionContext();
  const [endReached, setEndReached] = useState<boolean>(false);
  const [currIndex, setCurrIndex] = useState<number>(0);

  const handleScrollNativeEvent = (e: NativeScrollEvent) => {
    const section3 =
      Math.ceil(e.contentOffset.y / e.layoutMeasurement.height) - 2;

    if (section3 >= 0 && section3 < section3Data.length) {
      setCurrIndex(section3);
    }

    if (
      Math.ceil(e.layoutMeasurement.height + e.contentOffset.y) >=
      Math.ceil(e.contentSize.height)
    ) {
      setEndReached(true);
    } else if (endReached) {
      setEndReached(false);
    }
  };

  return (
    <View className="flex-1 relative z-0 bg-[#2B1862]">
      <LinearGradient
        colors={["#9B4DFF", "#2B1862", "#2B1862"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        className="flex-1"
      >
        <Header back={goBack} tone="dark" headerType="transparent" />

        <ScrollView
          style={{ height }}
          bounces={false}
          snapToInterval={height}
          snapToAlignment="center"
          decelerationRate="fast"
          disableIntervalMomentum={true}
          showsVerticalScrollIndicator={false}
          onScroll={({ nativeEvent }) => handleScrollNativeEvent(nativeEvent)}
          scrollEventThrottle={16}
          stickyHeaderIndices={stickyHeaderIndices}
        >
          <View className="w-full aspect-[375/70] absolute" />

          <Section1 />
          <Section2 />

          <LinearGradient
            colors={["#2B1862", "transparent"]}
            className="absolute"
          >
            <Section3StickyHeader currIndex={currIndex} />
          </LinearGradient>

          {section3Data.slice(0, section3Data.length - 1).map((each) => (
            <Section3Item key={each.phase} {...each} />
          ))}

          <View className="w-full aspect-[375/70] absolute" />
          <Section3Item {...section3Data[section3Data.length - 1]} />

          <Section4 />
          <Section5 />
        </ScrollView>

        {endReached ? (
          <ChatWithSakhi showScrollDown={endReached} goBack={false} />
        ) : (
          <View className="absolute left-0 right-0 bottom-5 iphoneX:bottom-8">
            <SwipeDown />
          </View>
        )}
      </LinearGradient>

      {interactionStatus ? null : (
        <View className="absolute left-0 right-0 top-0 bottom-0 bg-[#2B1862]">
          <LinearGradient
            colors={["#9B4DFF", "#2B1862", "#2B1862"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            className="flex-1 flex justify-center items-center"
          >
            <Loading width="w-16" height="h-16" />
          </LinearGradient>
        </View>
      )}
    </View>
  );
};

export default SakhiOnboardV2;
