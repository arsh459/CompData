import { LinearGradient } from "expo-linear-gradient";
import { useRef } from "react";
import {
  View,
  Image,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Dimensions,
} from "react-native";
import PlusMinus from "./PlusMinus";
import clsx from "clsx";

const { width } = Dimensions.get("window");

const scaleEnd = 200;
const scaleWidth = 2038;
const scaleHeight = 47;
const scaleMarginX = 17;
const scaleIndicatorWidth = 4;
const scaleIndicatorSpaceBetween = 6;
const multiplicationConst = scaleIndicatorSpaceBetween + scaleIndicatorWidth;
const scrollSpacingX = Math.round(
  width / 2 - scaleMarginX - scaleIndicatorWidth / 2
);

interface Props {
  initialValue: number;
  onNumberFieldsUpdate: (val: number) => void;
  target: "weight" | "desiredWeight";
  isTransparent?: boolean;
  containerStyleTw?: string;
  scaleStyleTw?: string;
}

const SetWeight: React.FC<Props> = ({
  initialValue,
  onNumberFieldsUpdate,
  target,
  isTransparent,
  containerStyleTw,
  scaleStyleTw,
}) => {
  // console.log("RenderTest SetWeight");
  const scaleScrollView = useRef<ScrollView>(null);

  const onPress = (val: number) => {
    scaleScrollView.current &&
      scaleScrollView.current.scrollTo({
        x: val * multiplicationConst,
        y: 0,
        animated: true,
      });
  };

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const remoteWeight = Math.round(
      e.nativeEvent.contentOffset.x / multiplicationConst
    );
    if (remoteWeight !== initialValue) {
      onNumberFieldsUpdate(remoteWeight);
    }
  };

  // useEffect(() => {
  //   console.log("outside", { init, initialValue });
  //   if (init && scaleScrollView.current) {
  //     console.log({ init, initialValue });
  //     scaleScrollView.current.scrollTo({
  //       x: initialValue * multiplicationConst,
  //       y: 0,
  //     });
  //     setInit(false);
  //   }
  // }, [scaleScrollView, init]);

  return (
    <View
      className={clsx(
        "w-full flex-1 flex justify-center items-centers relative z-0",
        containerStyleTw
      )}
    >
      <PlusMinus
        current={initialValue}
        onChange={onPress}
        max={scaleEnd}
        unit="kg"
      />

      <View className={clsx("w-full py-12 relative", scaleStyleTw)}>
        <ScrollView
          ref={scaleScrollView}
          bounces={false}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={handleScroll}
          onLayout={() => {
            scaleScrollView.current &&
              scaleScrollView.current.scrollTo({
                x: initialValue * multiplicationConst,
                y: 0,
              });
          }}
        >
          <Image
            source={{
              uri: "https://ik.imagekit.io/socialboat/tr:w-2038,c-maintain_ratio,fo-auto/Frame_2_BASLVp8Fq.png?ik-sdk-version=javascript-1.4.3&updatedAt=1671624559972",
            }}
            style={{
              width: scaleWidth,
              height: scaleHeight,
              marginHorizontal: scrollSpacingX,
            }}
          />
        </ScrollView>
        <View className="w-full absolute top-16" pointerEvents="none">
          <Image
            source={{
              uri:
                target === "weight"
                  ? "https://ik.imagekit.io/socialboat/tr:w-400,c-maintain_ratio,fo-auto/Component_63_VwN_lBofS.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668446554261"
                  : "https://ik.imagekit.io/socialboat/tr:w-400,c-maintain_ratio,fo-auto/Component_62_Mp8lTuD1f.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668446554501",
            }}
            className="w-full h-full"
            style={{ aspectRatio: 4 }}
            resizeMode="contain"
          />
        </View>
        <LinearGradient
          colors={
            isTransparent
              ? ["transparent", "transparent"]
              : ["#232136", "#23213600"]
          }
          className="absolute left-0 bottom-0 top-0 w-12"
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          pointerEvents="none"
        />
        <LinearGradient
          colors={
            isTransparent
              ? ["transparent", "transparent"]
              : ["#23213600", "#232136"]
          }
          className="absolute top-0 right-0 bottom-0 w-12"
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          pointerEvents="none"
        />
      </View>
    </View>
  );
};

export default SetWeight;
