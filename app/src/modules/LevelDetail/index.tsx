import Loading from "@components/loading/Loading";
import Header from "@modules/Header";
import { LevelDetailScreenProps } from "@screens/LevelDetailScreen";
import {
  View,
  Text,
  FlatList,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import Details from "./Details";
import { useLevels } from "@hooks/level/useLevels";
import { LevelInterface } from "@models/Level/interface";
import ArrowIcon from "@components/SvgIcons/ArrowIcon";
import { useEffect, useRef, useState } from "react";
import SvgIcons from "@components/SvgIcons";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";

const LevelDetail: React.FC<LevelDetailScreenProps> = ({ lvlNumber }) => {
  const { width } = useWindowDimensions();
  const { loading } = useLevels();
  const { levels } = useUserStore((state) => {
    return { levels: state.levelsArray };
  }, shallow);

  const flatListRef = useRef<FlatList>(null);
  const [currIndex, setCurrIndex] = useState<number>(lvlNumber - 1);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ index: currIndex, animated: true });
    }
  }, [currIndex, flatListRef.current]);

  const renderItem = ({ item }: { item: LevelInterface }) => {
    return <Details level={item} isLocked={item.lvlNumber > lvlNumber} />;
  };

  const keyExtractor = (item: LevelInterface) => item.id;

  const handleLeft = () => {
    setCurrIndex((p) => (p > 0 ? p - 1 : p));
  };

  const handleRight = () => {
    setCurrIndex((p) => (p < levels.length - 1 ? p + 1 : p));
  };

  const getItemLayout = (
    _: ArrayLike<unknown> | null | undefined,
    index: number
  ) => {
    return {
      length: width,
      offset: width * index,
      index,
    };
  };

  return (
    <View className="flex-1 bg-[#232136]">
      {loading ? (
        <View className="flex-1 flex justify-center items-center">
          <Loading width="w-12" height="h-12" />
        </View>
      ) : (
        <>
          <Header
            back={true}
            tone="dark"
            title="My Profile"
            headerType="transparent"
            centerTitle={true}
            titleNode={
              <View className="flex flex-row justify-center items-center">
                <View className="w-4 aspect-square mr-1">
                  <SvgIcons
                    iconType="star"
                    color={
                      (levels[currIndex] && levels[currIndex].textColor) ||
                      "#FFFFFF"
                    }
                  />
                </View>

                <Text
                  className="text-sm iphoneX:text-base text-center text-[#DFCB7F]"
                  style={{
                    fontFamily: "Nunito-Bold",
                    color:
                      (levels[currIndex] && levels[currIndex].textColor) ||
                      "#FFFFFF",
                  }}
                >
                  Lvl {currIndex + 1}
                </Text>
              </View>
            }
          />
          <View className="h-16" />

          {levels.length ? (
            <View className="flex-1 relative z-0">
              <View className="absolute top-0 bottom-0 left-4 z-10 flex justify-center items-center">
                {currIndex <= 0 ? null : (
                  <TouchableOpacity
                    onPress={handleLeft}
                    className="w-8 aspect-square rounded-full p-2 bg-[#00000059]"
                  >
                    <ArrowIcon direction="left" />
                  </TouchableOpacity>
                )}
              </View>

              <FlatList
                ref={flatListRef}
                data={levels}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                bounces={false}
                snapToInterval={width}
                getItemLayout={getItemLayout}
                decelerationRate="fast"
                initialScrollIndex={lvlNumber - 1}
                scrollEnabled={false}
              />

              <View className="absolute top-0 bottom-0 right-4 z-10 flex justify-center items-center">
                {currIndex >= levels.length - 1 ? null : (
                  <TouchableOpacity
                    onPress={handleRight}
                    className="w-8 aspect-square rounded-full p-2 bg-[#00000059]"
                  >
                    <ArrowIcon direction="right" />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ) : (
            <View className="flex-1 flex justify-center items-center">
              <Text
                className="text-2xl iphoneX:tex-3xl text-center text-white"
                style={{ fontFamily: "Nunito-Bold" }}
              >
                Somthing wrong,
              </Text>
              <Text
                className="text-2xl iphoneX:tex-3xl text-center text-white"
                style={{ fontFamily: "Nunito-Bold" }}
              >
                Try after some time.
              </Text>
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default LevelDetail;
