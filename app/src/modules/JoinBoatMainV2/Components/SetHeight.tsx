import { LocalUser } from "@hooks/user/useLocalUserV2";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import {
  View,
  Image,
  useWindowDimensions,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Animated,
} from "react-native";
import PlusMinus from "./PlusMinus";
import { getHeight, getIntialHeight } from "./utils";

const scaleEnd = 120;
const scaleWidth = 77;
const scaleHeight = 1095;
const scaleMarginY = 7;
const scaleIndicatorHeight = 3;
const scaleIndicatorSpaceBetween = 6;
const topFactor = 0.4;
const bottomFactor = 0.6;

interface Props {
  localUser?: LocalUser | undefined;
  onNumberFieldsUpdate: (val: number) => void;
}

const SetHeight: React.FC<Props> = ({ localUser, onNumberFieldsUpdate }) => {
  const { height } = useWindowDimensions();
  const scaleScrollView = useRef<ScrollView>(null);
  const [isInit, setIsInit] = useState<boolean>(true);
  const [pointerHeight, setPointerHeight] = useState<number>(0);
  const [selected, setSelected] = useState<number>(0);
  const [contentOffset, setContentOffset] = useState<{
    x: number;
    y: number;
  }>();

  const remoteHeight = height / 2;
  const scrollSpacingTop = Math.round(
    remoteHeight * topFactor - scaleMarginY - scaleIndicatorHeight / 2
  );
  const scrollSpacingBottom = Math.round(
    remoteHeight * bottomFactor - scaleMarginY - scaleIndicatorHeight / 2
  );
  const multiplicationConst = scaleIndicatorSpaceBetween + scaleIndicatorHeight;

  const translateY = useRef(
    new Animated.Value(selected * multiplicationConst)
  ).current;

  useEffect(() => {
    if (isInit && (localUser?.height || localUser?.gender)) {
      const intialVal = getIntialHeight(localUser.height, localUser.gender);
      setSelected(intialVal);
      setContentOffset({
        x: 0,
        y: (scaleEnd - intialVal) * multiplicationConst,
      });
      setIsInit(false);
    }
  }, [localUser?.height, localUser?.gender, isInit, multiplicationConst]);

  const onPress = (val: number) => {
    scaleScrollView.current &&
      scaleScrollView.current.scrollTo({
        x: 0,
        y: (scaleEnd - val) * multiplicationConst,
        animated: true,
      });
  };

  const handleChange = (val: number) => {
    setSelected(val);
    onNumberFieldsUpdate(val);
  };

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    handleChange(
      scaleEnd - Math.round(e.nativeEvent.contentOffset.y / multiplicationConst)
    );
  };

  return (
    <View className="flex-1">
      <View
        className="flex flex-row justify-center relative"
        style={{ height: remoteHeight }}
      >
        <Image
          source={{
            uri:
              localUser?.gender === "female"
                ? "https://ik.imagekit.io/socialboat/tr:w-400,c-maintain_ratio,fo-auto/Component_2_ygVS_JimY.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666003642479"
                : "https://ik.imagekit.io/socialboat/tr:w-400,c-maintain_ratio,fo-auto/Component_1_nxybATCYHt.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666003813978",
          }}
          className="h-full"
          style={{ aspectRatio: 113 / 352 }}
          resizeMode="contain"
        />
        <View
          className="h-full relative pl-2"
          style={{ aspectRatio: 160 / 352 }}
        >
          <ScrollView
            ref={scaleScrollView}
            bounces={false}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={handleScroll}
            contentOffset={contentOffset}
          >
            <Animated.View style={{ transform: [{ translateY }] }}>
              <Image
                source={{
                  uri: "https://ik.imagekit.io/socialboat/tr:w-77,c-maintain_ratio,fo-auto/Frame_3_nj0Xfp3PN.png?ik-sdk-version=javascript-1.4.3&updatedAt=1671784961281",
                }}
                style={{
                  width: scaleWidth,
                  height: scaleHeight,
                  marginTop: scrollSpacingTop,
                  marginBottom: scrollSpacingBottom,
                }}
              />
            </Animated.View>
          </ScrollView>
          <View
            className="absolute w-[170%] rounded-full bg-white"
            style={{ height: 4, right: 4, top: remoteHeight * topFactor - 2 }}
            pointerEvents="none"
          />
          <View
            className="absolute right-0 flex flex-row justify-center items-center"
            onLayout={(e) => setPointerHeight(e.nativeEvent.layout.height)}
            style={{
              top: remoteHeight * topFactor - pointerHeight / 2,
            }}
          >
            <PlusMinus
              current={selected}
              onChange={onPress}
              currStr={getHeight(selected)}
              max={scaleEnd}
              vertical={true}
              btnRounded="rounded-lg"
            />
          </View>
        </View>
        <LinearGradient
          colors={["#232136", "#23213600"]}
          className="absolute left-0 right-0 top-0 h-12"
          pointerEvents="none"
        />
        <LinearGradient
          colors={["#23213600", "#232136"]}
          className="absolute left-0 right-0 bottom-0 h-12"
          pointerEvents="none"
        />
      </View>
    </View>
  );
};

export default SetHeight;
