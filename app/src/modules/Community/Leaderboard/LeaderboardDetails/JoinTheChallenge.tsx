import { View, Text, Image } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { plusIconWithoutBorder, tripleArrowIcon } from "@constants/imageKitURL";
import ButtonWithIcon from "@modules/TeamInvite/ButtonWithIcon";
interface Props {}
const JoinTheChallenge: React.FC<Props> = ({}) => {
  const navigation = useNavigation();
  return (
    <View className="absolute left-0 right-0 bottom-0 bg-[#5B5689] flex flex-row items-center justify-center px-6 pb-4 border border-[#ffff6438]">
      <Text className="text-white  text-lg font-semibold">
        Join the challenge
      </Text>
      <Image
        source={{
          uri: tripleArrowIcon,
        }}
        className="h-full min-h-[50px]  mx-4   aspect-square"
        resizeMode="contain"
      />
      <View className=" flex items-center ">
        <ButtonWithIcon
          iconUrl={`${plusIconWithoutBorder}`}
          title={"Enroll now"}
          textColor="text-[#14131E] "
          textStyle="pl-2 text-xs iphoneX:text-sm "
          roundedStr="rounded-full py-1.5 px-3.5   flex flex-row  justify-center  "
          iconStyle="w-2.5 aspect-square "
          fontFamily="BaiJamjuree-Bold"
          layoutStyle={{
            backgroundColor: "#FFFFFF",
            alignItems: "center",
          }}
          onPress={() => navigation.navigate("CreateTeamEnterNameScreen")}
        />
      </View>
    </View>
  );
};

export default JoinTheChallenge;
