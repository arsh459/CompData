import clsx from "clsx";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { ReactNode, useEffect, useState } from "react";

interface Props {
  showInsideComp?: boolean;
  height: number;
  progress: number;
  activeColor?: string;
  inActiveColor?: string;
  showLable?: "above" | "below" | "inside";
  lableText?: string;
  textColor?: string;
  textStyle?: string;
  padding?: number;
  borderWidth?: number;
  heightOfContainer?: number;
  borderColor?: string;
  fontBai?: boolean;
  hideArrow?: boolean;
  textPositioningLeft?: number;
  noRoundedProgress?: boolean;
  children?: ReactNode;
}

const ProgressBar: React.FC<Props> = ({
  height,
  progress,
  activeColor,
  inActiveColor,
  showLable,
  lableText,
  textColor,
  textStyle,
  padding,
  borderWidth,
  borderColor,
  heightOfContainer,
  fontBai,
  hideArrow,
  textPositioningLeft,
  noRoundedProgress,
  showInsideComp = false,
  children,
}) => {
  const [width, setWidth] = useState<number>(0);
  const [lableDimension, setLableDimension] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });
  // console.log({ progress });

  // const animatedValue = useRef(new Animated.Value(-1000)).current;
  // const reactive = useRef(new Animated.Value(-1000)).current;
  // const opacity = useRef(new Animated.Value(0)).current;

  // useEffect(() => {
  //   Animated.sequence([
  //     Animated.timing(animatedValue, {
  //       toValue: reactive,
  //       duration: 300,
  //       useNativeDriver: true,
  //     }),
  //     Animated.delay(100),
  //     Animated.timing(opacity, {
  //       toValue: 1,
  //       duration: 100,
  //       useNativeDriver: true,
  //     }),
  //   ]).start();
  // }, []);

  // useEffect(() => {
  //   reactive.setValue(width * (progress / 100));
  // }, [width, progress]);

  const linear = useSharedValue(0);
  // const animatedChanged = useAnimatedStyle(() => ({
  //   width: `${linear.value}%`,
  // }));
  const animatedChangedLabel = useAnimatedStyle(() => ({
    left: `${linear.value}%`,
  }));

  useEffect(() => {
    linear.value = withTiming(progress, {
      duration: Math.max(200, progress * 10),
      easing: Easing.linear,
    });
  }, [progress]);
  // -----
  // ---

  return (
    <View
      style={{
        width: "100%",
        position: "relative",
        paddingTop: showLable === "above" ? lableDimension.height - height : 0,
        paddingBottom:
          showLable === "below" ? lableDimension.height - height : 0,
      }}
    >
      <View
        style={{
          padding,
          borderWidth,
          borderColor,
          backgroundColor: inActiveColor ? inActiveColor : "#000000",
        }}
        className="rounded-full"
      >
        <View
          style={{
            height: heightOfContainer ? heightOfContainer : 5,
            width: "100%",
            overflow: "hidden",
            position: "relative",
          }}
          className="rounded-full"
          onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
        >
          <Animated.View
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: "-100%",
              width: "100%",
              // transform: [{ translateX: animatedValue }],
              transform: [{ translateX: width * (progress / 100) }],
              backgroundColor: activeColor ? activeColor : "#FFFFFF",
            }}
            className={!noRoundedProgress ? "rounded-full" : ""}
          />
          {children ? children : null}
        </View>
      </View>
      {showLable ? (
        <Animated.View
          style={[
            {
              display: "flex",
              justifyContent: "center",
              alignItems:
                progress >= 90
                  ? "flex-end"
                  : progress >= 10
                  ? "center"
                  : "flex-start",
              position: "absolute",

              transform: [
                {
                  translateX:
                    progress >= 90
                      ? -lableDimension.width
                      : progress >= 10
                      ? -(lableDimension.width / 2)
                      : 0,
                },
              ],

              opacity: 1,
            },
            showLable === "above" ? styles.above : styles.below,
            animatedChangedLabel,
          ]}
          onLayout={(e) =>
            setLableDimension({
              width: e.nativeEvent.layout.width,
              height: e.nativeEvent.layout.height,
            })
          }
        >
          {showLable === "below" && !hideArrow ? (
            <View
              className="w-0 h-0 border-x-4 border-b-4 border-x-transparent"
              style={{ borderBottomColor: textColor ? textColor : "#FFFFFF" }}
            />
          ) : null}
          <Text
            className={clsx(textStyle ? textStyle : "text-xs", "py-px")}
            style={{
              color: textColor ? textColor : "#FFFFFF",
              fontFamily: fontBai ? "BaiJamjuree-Bold" : undefined,
            }}
          >
            {lableText}
          </Text>
          {showLable === "above" && !hideArrow ? (
            <View
              className="w-0 h-0 border-x-4 border-t-4 border-x-transparent"
              style={{ borderTopColor: textColor ? textColor : "#FFFFFF" }}
            />
          ) : null}
        </Animated.View>
      ) : null}
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  above: {
    bottom: "100%",
    paddingBottom: 5,
  },
  below: {
    top: "100%",
    paddingTop: 5,
  },
});
