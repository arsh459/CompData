import {
  View,
  Text,
  TouchableOpacity,
  ColorValue,
  Dimensions,
  NativeScrollEvent,
  Pressable,
  FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  lowerNormalCycleLength,
  lowerNormalPeriodLength,
  upperNormalCycleLength,
  upperNormalPeriodLength,
} from "./AchievementPath/utils/constants";
import { useMemo, useRef, useState } from "react";
import SetCycleLength from "./SetCycleLength";

const { width } = Dimensions.get("window");

const itemSize = width / 5;
const listOffsetX = (width - itemSize) / 2;
const arrowWidth = 7;

const getData = (isCycle?: boolean): number[] => {
  return Array.from(Array(isCycle ? 71 : 17).keys()).slice(1);
};

const getCurrent = (
  length: number,
  isCycle?: boolean
): { text: string; color: ColorValue } => {
  if (length < (isCycle ? lowerNormalCycleLength : lowerNormalPeriodLength)) {
    return { text: "Short", color: "#FF7676" };
  } else if (
    length > (isCycle ? upperNormalCycleLength : upperNormalPeriodLength)
  ) {
    return { text: "Long", color: "#BA76FF" };
  } else {
    return { text: "Normal", color: "#81FF76" };
  }
};

interface Props {
  target: number;
  onChange: (val: number) => void;
  title: string;
  highlightedTitle: string;
  highlightedColor: ColorValue;
  currentText: string;
  isCycle?: boolean;
  isIrregulerCycle?: boolean;
}

const SetLength: React.FC<Props> = ({
  target,
  onChange,
  title,
  highlightedTitle,
  highlightedColor,
  currentText,
  isCycle,
  isIrregulerCycle,
}) => {
  const current = getCurrent(target, isCycle);
  const flashlistRef = useRef<FlatList>(null);
  const splidedTitle = `__${title}__`.split(highlightedTitle);
  const [cycleIrregular, setCycleIrregular] = useState<boolean>(
    !!isIrregulerCycle
  );

  const onPress = (item: number) => {
    if (flashlistRef.current) {
      const offset = Math.floor((item - 1) * itemSize);
      flashlistRef.current.scrollToOffset({ offset, animated: true });
    }
  };

  const renderItem = ({ item }: { item: number }) => {
    return (
      <Pressable
        onPress={() => onPress(item)}
        className="aspect-square rounded-full flex justify-center items-center"
        style={{ width: itemSize }}
      >
        <Text
          style={{
            fontWeight: item === target ? "bold" : "normal",
            color: item === target ? "#FFFFFF" : "#FFFFFFB2",
            fontSize: itemSize * (item === target ? 0.3 : 0.25),
            fontFamily: "Nunito-Regular",
            textAlignVertical: "center",
            textAlign: "center",
          }}
        >
          {item}
        </Text>
      </Pressable>
    );
  };

  const keyExtractor = (item: number) => `item-${item}`;

  const onScroll = ({ nativeEvent }: { nativeEvent: NativeScrollEvent }) => {
    onChange(Math.round(nativeEvent.contentOffset.x / itemSize) + 1);
  };

  const data = useMemo(() => getData(isCycle), [isCycle]);

  const getItemLayout = (
    _: ArrayLike<unknown> | null | undefined,
    index: number
  ) => {
    return {
      length: itemSize,
      offset: itemSize * index,
      index,
    };
  };

  return (
    <>
      <Text
        className="text-[#F1F1F1] text-xl px-4"
        style={{ fontFamily: "Nunito-Bold" }}
      >
        {splidedTitle[0].replaceAll("__", "")}
        <Text style={{ color: highlightedColor }}>
          {` ${highlightedTitle} `}
        </Text>
        {splidedTitle[1].replaceAll("__", "")}
      </Text>

      {isCycle && cycleIrregular ? (
        <View className="flex-1 flex justify-center">
          <SetCycleLength target={target} onChange={onChange} />
        </View>
      ) : (
        <View className="flex-1 flex justify-center">
          <View className="w-full relative z-0">
            <View className="absolute -left-px w-full h-full flex justify-center items-center">
              <View
                style={{
                  width: itemSize,
                  height: itemSize,
                  borderRadius: itemSize,
                  backgroundColor: highlightedColor || "transparent",
                }}
              />
            </View>
            <FlatList
              ref={flashlistRef}
              data={data}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
              getItemLayout={getItemLayout}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              bounces={false}
              ListHeaderComponent={<View style={{ width: listOffsetX }} />}
              ListFooterComponent={<View style={{ width: listOffsetX }} />}
              scrollEventThrottle={100}
              onScroll={onScroll}
              snapToInterval={itemSize}
              decelerationRate="fast"
              initialScrollIndex={target - 1}
            />
            <LinearGradient
              pointerEvents="none"
              className="absolute left-0 top-0 bottom-0 w-12 z-10"
              colors={["#232136", "#23213600"]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
            />
            <LinearGradient
              pointerEvents="none"
              className="absolute right-0 top-0 bottom-0 w-12 z-10"
              colors={["#232136", "#23213600"]}
              start={{ x: 1, y: 0.5 }}
              end={{ x: 0, y: 0.5 }}
            />
          </View>
          <View
            className="mx-auto mb-8"
            style={{
              width: 0,
              height: 0,
              borderBottomWidth: arrowWidth * 2,
              borderBottomColor: "white",
              borderRightWidth: arrowWidth,
              borderRightColor: "transparent",
              borderLeftWidth: arrowWidth,
              borderLeftColor: "transparent",
            }}
          />
          <Text
            className="text-[#B8B8B8] text-lg text-center px-4"
            style={{ fontFamily: "Nunito-Regular" }}
          >
            {currentText}
            <Text style={{ color: current.color }}>{current.text}</Text>
          </Text>
        </View>
      )}

      {isCycle && !isIrregulerCycle ? (
        <TouchableOpacity className="px-4">
          <Text
            onPress={() => setCycleIrregular(!cycleIrregular)}
            className="text-[#957BFF] text-xl text-center"
            style={{ fontFamily: "Nunito-Bold" }}
          >
            {cycleIrregular
              ? "I can specify an exact length"
              : "My Cycle is irregular"}
          </Text>
        </TouchableOpacity>
      ) : null}
    </>
  );
};

export default SetLength;
