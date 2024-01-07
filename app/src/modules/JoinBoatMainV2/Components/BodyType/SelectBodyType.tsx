import { View, Text, Image, useWindowDimensions } from "react-native";
import Swiper from "@components/Swiper";
import { EvolutionBodyType } from "@constants/Avatar/utils";
import { genderType } from "@models/User/User";

interface Props {
  gender?: genderType;
  targetBodyTypeArr: EvolutionBodyType[];
  onCurrentIndexChange: (val: number) => void;
  currentActiveIndex: number;
  isDesired?: boolean;
}

const SelectBodyType: React.FC<Props> = ({
  gender,
  targetBodyTypeArr,
  onCurrentIndexChange,
  currentActiveIndex,
  isDesired,
}) => {
  const { width } = useWindowDimensions();

  /**
   * onIndexChange = useCallback((newIndex: number) => {
   * setCurrentIndex(newIndex);
   *
   * // bodyType for index. bodyTypeArray (Constant array)
   * const currentBodyType = bodyTypeArray.find(newIndex)
   *
   * updateLocalUser((prev) => { if (prev) return {...prev, currentBodyType: currentBodyType, targetBodyType: undefined}})
   *
   * }, [bodyTypeArray])
   */

  /**
   * array of target.
   *
   *
   * const targetArr = BodyTypeObj[localUser.currentBodyType]
   * onIndexChange = useCallback((newIndex: number) => {
   * setCurrentIndex(newIndex);
   *
   * const currentBodyType = bodyTypeArray.find(newIndex)
   *
   * updateLocalUser((prev) => { if (prev) return {...prev, targetBodyType: currentBodyType}})
   *
   * }, [bodyTypeArray])
   *
   *
   *
   *
   */

  // set local user in callback not in useEffect
  // useEffect(() => {
  //   if (onCurrentBodyTypeUpdate) {
  //     onCurrentBodyTypeUpdate(targetBodyTypeArr[currentActiveIndex].id);
  //   }
  //   if (onDesiredBodyTypeUpdate) {
  //     onDesiredBodyTypeUpdate(
  //       targetBodyTypeArr[currentActiveIndex].id,
  //       targetBodyTypeArr[currentActiveIndex].duration,
  //       targetBodyTypeArr[currentActiveIndex].level
  //     );
  //   }
  // }, [currentActiveIndex, onCurrentBodyTypeUpdate, onDesiredBodyTypeUpdate]);

  return (
    <View className="flex-1 flex justify-around">
      <View style={{ height: width / 2 / 0.7 }}>
        <Swiper
          slideWidth={width / 2}
          centered={true}
          onIndexChange={onCurrentIndexChange}
          initialScrollIndex={currentActiveIndex}
        >
          {targetBodyTypeArr.map((each, index) => (
            <View
              key={each.name}
              className="relative z-0"
              style={{
                transform: [{ scale: currentActiveIndex === index ? 1 : 0.7 }],
              }}
            >
              <Image
                source={{
                  uri: each.image[
                    gender && gender !== "notSpecified" ? gender : "female"
                  ],
                }}
                className="w-full aspect-[200/250] bg-[#262630] rounded-2xl overflow-hidden"
                resizeMode="contain"
              />
              {currentActiveIndex === index ? (
                <Image
                  source={{
                    uri: "https://ik.imagekit.io/socialboat/tr:w-50,c-maintain_ratio,fo-auto/Group_397__1__Eps4M2u6a.png?ik-sdk-version=javascript-1.4.3&updatedAt=1657028769124",
                  }}
                  className="absolute top-2.5 right-2.5 w-5 aspect-square"
                  resizeMode="contain"
                />
              ) : null}
            </View>
          ))}
        </Swiper>
      </View>
      <View className="bg-[#262630] rounded-3xl overflow-hidden m-4 p-4">
        <Text
          numberOfLines={1}
          className="text-[#F1F1F1] text-base iphoneX:text-lg font-bold"
        >
          {targetBodyTypeArr[currentActiveIndex].name}
        </Text>
        <Text
          numberOfLines={isDesired ? 2 : 3}
          className="text-[#9F9F9F] text-sm iphoneX:text-base mt-2"
        >
          {targetBodyTypeArr[currentActiveIndex].description}
        </Text>
        {isDesired ? (
          <View className="bg-[#323242] rounded-xl overflow-hidden mt-4 flex flex-row justify-between items-center px-4 py-2">
            <Text
              numberOfLines={3}
              className="text-sm iphoneX:text-base"
              style={{
                color: targetBodyTypeArr[currentActiveIndex].color,
                fontFamily: "BaiJamjuree-SemiBold",
              }}
            >
              {`Level : ${targetBodyTypeArr[currentActiveIndex].level}`}
            </Text>
            <Text
              numberOfLines={3}
              className="text-sm iphoneX:text-base"
              style={{
                color: targetBodyTypeArr[currentActiveIndex].color,
                fontFamily: "BaiJamjuree-SemiBold",
              }}
            >
              {`Duration : ${targetBodyTypeArr[currentActiveIndex].duration} Months`}
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default SelectBodyType;
