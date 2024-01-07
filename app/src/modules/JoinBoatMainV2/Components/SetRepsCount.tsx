import { LocalUser } from "@hooks/user/useLocalUserV2";
// import { UserInterface } from "@models/User/User";
import { View, Text, TouchableOpacity, Image } from "react-native";
import PlusMinus from "./PlusMinus";

export const defaultRepsCount = 15;

interface Props {
  localUser: LocalUser | undefined;
  onNumberFieldsUpdate: (val: number) => void;
}

const SetRepsCount: React.FC<Props> = ({ localUser, onNumberFieldsUpdate }) => {
  const gifUrl =
    localUser?.gender && localUser.gender === "male"
      ? "push-up-2_1_0knQ7sTKr.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666273527428"
      : "new4__1__Ch24noOKE.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1664949053990";
  const exersizeName =
    localUser?.gender && localUser.gender === "male"
      ? "Pushups"
      : "Jumping Jacks";

  return (
    <View className="flex-1 flex justify-center items-center">
      <Image
        source={{
          uri: `https://ik.imagekit.io/socialboat/tr:w-300,c-maintain_ratio,fo-auto/${gifUrl}`,
        }}
        className="w-3/4 aspect-square"
        resizeMode="contain"
      />
      <Text
        className="text-[#F1F1F1] text-xs iphoneX:text-sm"
        style={{ fontFamily: "BaiJamjuree-Light" }}
      >
        Exercise benchmark
      </Text>
      <Text
        className="text-[#F1F1F1] text-xl iphoneX:text-2xl pt-4 pb-10"
        style={{ fontFamily: "BaiJamjuree-Bold" }}
      >
        {exersizeName}
      </Text>
      <Text
        className="text-[#F1F1F1] text-xs iphoneX:text-sm"
        style={{ fontFamily: "BaiJamjuree-Light" }}
      >
        Rep count in 1 min
      </Text>
      <PlusMinus
        current={localUser?.repsCount ? localUser.repsCount : defaultRepsCount}
        onChange={onNumberFieldsUpdate}
        unit="Reps"
      />
      <View className="h-10" />
    </View>
  );
};

export default SetRepsCount;

interface SkipProps {
  onUserRepsCountUpdate: () => void;
}

export const Skip: React.FC<SkipProps> = ({ onUserRepsCountUpdate }) => {
  return (
    <TouchableOpacity
      className="w-max mx-auto px-4 py-2 rounded-lg"
      // onPress={onUserRepsCountUpdate}
      onPress={() => onUserRepsCountUpdate()}
    >
      <Text
        className="text-[#FF9F59] text-base"
        style={{ fontFamily: "BaiJamjuree-Bold" }}
      >
        I don't know!
      </Text>
    </TouchableOpacity>
  );
};
