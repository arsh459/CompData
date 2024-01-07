import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { Animated, View } from "react-native";

interface Props {
  data: any[];
  scrollX: Animated.Value;
  width: number;
  paginationTopSpace?: number;
  paginationBottomSpace?: number;
  dotColor?: string;
  dotWidth?: number;
  dotHeight?: number;
  activeDotWidth?: number;
  activeDotHeight?: number;
  position?: string;
  gradient?: boolean;
  gradientArr?: string[];
  dynamicPagination?: boolean;
}

export const Pagination: React.FC<Props> = ({
  data,
  scrollX,
  width,
  paginationTopSpace,
  paginationBottomSpace,
  dotColor,
  dotWidth,
  dotHeight,
  activeDotWidth,
  activeDotHeight,
  position,
  gradient,
  gradientArr,
  dynamicPagination,
}) => {
  const dotWidthConst = dotWidth ? dotWidth : 10;
  const dotHeightConst = dotHeight ? dotHeight : dotWidthConst;
  const activeDotWidthConst = activeDotWidth ? activeDotWidth : dotWidthConst;
  const activeDotHeightConst = activeDotHeight
    ? activeDotHeight
    : dotHeightConst;
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    const listenerId = scrollX.addListener(({ value }) => {
      setActiveIndex(value / width);
    });

    return () => {
      scrollX.removeListener(listenerId);
    };
  }, []);

  return (
    <LinearGradient
      colors={
        gradient && gradientArr ? gradientArr : ["transparent", "transparent"]
      }
      className={position}
      pointerEvents="none"
    >
      <View
        style={{
          width: dynamicPagination ? 3 * (dotWidthConst + 20) : undefined,
          overflow: dynamicPagination ? "hidden" : undefined,
          flexDirection: "row",
          alignSelf: "center",
        }}
      >
        <Animated.View
          style={{
            paddingTop: paginationTopSpace ? paginationTopSpace : 0,
            paddingBottom: paginationBottomSpace ? paginationBottomSpace : 0,
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "center",
            marginVertical: 10,
            left: dynamicPagination
              ? dotWidthConst + 20 - activeIndex * (dotWidthConst + 20)
              : undefined,
          }}
        >
          {data.map((_, index) => {
            const inputRange = [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ];

            const dotWidthSize = scrollX.interpolate({
              inputRange,
              outputRange: [
                activeDotWidthConst,
                dotWidthConst,
                activeDotWidthConst,
              ],
              extrapolate: "clamp",
            });

            const dotHeightSize = scrollX.interpolate({
              inputRange,
              outputRange: [
                activeDotHeightConst,
                dotHeightConst,
                activeDotHeightConst,
              ],
              extrapolate: "clamp",
            });

            const dotOpacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.5, 1, 0.5],
              extrapolate: "clamp",
            });

            const scale = scrollX.interpolate({
              inputRange,
              outputRange: [0.75, 1.15, 0.75],
              extrapolate: "clamp",
            });

            return index < 0 ? null : (
              <Animated.View
                key={`dot-${index}`}
                style={{
                  width: dotWidthSize,
                  height: dotHeightSize,
                  borderRadius: dotWidthConst / 2,
                  opacity: dotOpacity,
                  marginHorizontal: 10,
                  backgroundColor: dotColor ? dotColor : "black",
                  transform: [{ scale: dynamicPagination ? scale : 1 }],
                }}
              />
            );
          })}
        </Animated.View>
      </View>
    </LinearGradient>
  );
};
