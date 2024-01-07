import GradientText from "@components/GradientText";
import {
  genderFemale,
  genderMale,
  iconFemale,
  iconMale,
} from "@constants/imageKitURL";
import { iPhoneX } from "@constants/screen";
import { LocalUser } from "@hooks/user/useLocalUserV2";
import { genderType } from "@models/User/User";
import clsx from "clsx";
import { View, Image, useWindowDimensions, Pressable } from "react-native";

interface Props {
  localUser?: LocalUser | undefined;
  onGenderUpdate: (val: genderType) => void;
}

const SelectGender: React.FC<Props> = ({ localUser, onGenderUpdate }) => {
  const { width } = useWindowDimensions();

  return (
    <View className="flex flex-row justify-center items-center p-4">
      <Pressable
        className={clsx(
          "w-1/2 flex justify-center items-center relative",
          localUser?.gender === "male" ? "scale-110 z-10" : "scale-90 z-20"
        )}
        onPress={() => onGenderUpdate("male")}
      >
        <Image
          source={{
            uri: "https://ik.imagekit.io/socialboat/tr:w-400,c-maintain_ratio,fo-auto/Group_765__1__8-V6d8Fp5i.png?ik-sdk-version=javascript-1.4.3&updatedAt=1665995790862",
          }}
          className={clsx(
            "aspect-square absolute -top-10 -left-1/2 -right-1/2 -z-10 transition-all",
            localUser?.gender === "male" ? "scale-100" : "scale-0"
          )}
          resizeMode="contain"
        />
        <Image
          source={{ uri: genderMale }}
          className={clsx(
            "w-full",
            localUser?.gender === "male" ? "opacity-100" : "opacity-50"
          )}
          style={{ aspectRatio: 720 / 1280 }}
          resizeMode="contain"
        />
        {localUser?.gender === "female" ? null : (
          <View className="flex flex-row justify-center items-center py-4">
            <Image
              source={{ uri: iconMale }}
              className="w-4 iphoneX:w-5 aspect-square"
              resizeMode="contain"
            />
            <View className="w-2" />
            <GradientText
              text="Male"
              textStyle={{
                fontSize: width > iPhoneX ? 20 : 16,
                fontFamily: "BaiJamjuree-Bold",
                fontWeight: "900",
                color: "white",
              }}
              colors={["#60BFFF", "#849FFF"]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              fallbackColor="white"
            />
          </View>
        )}
      </Pressable>
      <Pressable
        className={clsx(
          "w-1/2 flex justify-center items-center relative",
          localUser?.gender === "female" ? "scale-110 z-10" : "scale-90 z-20"
        )}
        onPress={() => onGenderUpdate("female")}
      >
        <Image
          source={{
            uri: "https://ik.imagekit.io/socialboat/tr:w-400,c-maintain_ratio,fo-auto/Group_766__1__RjSuF3yfi.png?ik-sdk-version=javascript-1.4.3&updatedAt=1665995790842",
          }}
          className={clsx(
            "aspect-square absolute -top-10 -left-1/2 -right-1/2 -z-10 transition-all",
            localUser?.gender === "female" ? "scale-100" : "scale-0"
          )}
          resizeMode="contain"
        />
        <Image
          source={{ uri: genderFemale }}
          className={clsx(
            "w-full",
            localUser?.gender === "female" ? "opacity-100" : "opacity-50"
          )}
          style={{ aspectRatio: 720 / 1280 }}
          resizeMode="contain"
        />
        {localUser?.gender === "male" ? null : (
          <View className="flex flex-row justify-center items-center py-4">
            <Image
              source={{ uri: iconFemale }}
              className="w-4 iphoneX:w-5 aspect-square"
              resizeMode="contain"
            />
            <View className="w-2" />
            <GradientText
              text="Female"
              textStyle={{
                fontSize: width > iPhoneX ? 20 : 16,
                fontFamily: "BaiJamjuree-Bold",
                fontWeight: "900",
                color: "white",
              }}
              colors={["#FF5D7F", "#FF72D8"]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              fallbackColor="white"
            />
          </View>
        )}
      </Pressable>
    </View>
  );
};

export default SelectGender;
