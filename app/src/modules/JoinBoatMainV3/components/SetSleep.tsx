import ImageWithURL from "@components/ImageWithURL";
import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  Text,
  NativeScrollEvent,
  Dimensions,
  Pressable,
  FlatList,
} from "react-native";
import {
  lowerNormalSleepTime,
  upperNormalSleepTime,
} from "./AchievementPath/utils/constants";
import { useRef } from "react";

const { width } = Dimensions.get("window");

const itemSize = width / 5;
const listOffsetY = (width - itemSize) / 2;
const data: number[] = Array.from(Array(17).keys()).slice(1);

interface Props {
  target: number;
  onChange: (val: number) => void;
}

const SetSleep: React.FC<Props> = ({ target, onChange }) => {
  const flashlistRef = useRef<FlatList>(null);

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
        className="aspect-square rounded-full flex justify-center items-center mx-auto"
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
    onChange(Math.floor(nativeEvent.contentOffset.y / itemSize) + 1);
  };

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
    <View className="flex-1 flex justify-center items-center">
      <View className="w-full aspect-square relative z-0">
        <View className="absolute left-0 right-0 top-0 bottom-0 -z-10">
          <ImageWithURL
            source={{
              uri: "https://ik.imagekit.io/socialboat/Group_1758_14U2jjgJrX.png?updatedAt=1685442300223",
            }}
            className="w-full h-full"
            resizeMode="contain"
          />
        </View>
        <FlatList
          data={data}
          ref={flashlistRef}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          getItemLayout={getItemLayout}
          showsVerticalScrollIndicator={false}
          bounces={false}
          ListHeaderComponent={<View style={{ height: listOffsetY }} />}
          ListFooterComponent={<View style={{ height: listOffsetY }} />}
          scrollEventThrottle={100}
          onScroll={onScroll}
          snapToInterval={itemSize}
          decelerationRate="fast"
          initialScrollIndex={target - 1}
        />
        <LinearGradient
          pointerEvents="none"
          className="absolute left-0 right-0 top-0 h-12 z-10"
          colors={["#232136", "#23213600"]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />
        <LinearGradient
          pointerEvents="none"
          className="absolute left-0 right-0 bottom-0 h-12 z-10"
          colors={["#232136", "#23213600"]}
          start={{ x: 0.5, y: 1 }}
          end={{ x: 0.5, y: 0 }}
        />
      </View>
      <View className="w-1/2 mx-auto mt-8">
        <Text
          className="text-white/50 text-sm iphoneX:text-base text-center"
          style={{ fontFamily: "Nunito-Regular" }}
        >
          {`${lowerNormalSleepTime}-${upperNormalSleepTime} Hours is a considered to be a good sleep`}
        </Text>
      </View>
    </View>
  );
};

export default SetSleep;
