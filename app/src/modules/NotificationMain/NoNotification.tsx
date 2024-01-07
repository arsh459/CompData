import { View, Text } from "react-native";
// import ButtonWithIcon from "@modules/TeamInvite/ButtonWithIcon";
// import { groupIconWhite } from "@constants/imageKitURL";
// import { useNavigation } from "@react-navigation/native";

interface Props {
  text: string;
}

const NoNotification: React.FC<Props> = ({ text }) => {
  // const navigation = useNavigation();

  return (
    <View className="flex  flex-1">
      <View className="flex items-center justify-center mt-20 px-4">
        <Text
          className="text-[#616161] text-3xl text-center"
          style={{ fontFamily: "BaiJamjuree-SemiBold" }}
        >
          {text}
        </Text>
      </View>
      {/* <View className="flex-1 " />
      <View className="mx-4  mb-8">
        <ButtonWithIcon
          iconUrl={groupIconWhite}
          title="Browse Teams"
          textColor="text-[#fff]"
          textStyle="pl-2 text-base iphoneX:text-lg"
          roundedStr="rounded-[5px] "
          bgColor="flex-1"
          iconStyle="w-4 aspect-square"
          fontFamily="BaiJamjuree-SemiBold"
          onPress={() => navigation.navigate("TeamBrowseScreen")}
          layoutStyle={{
            paddingTop: 8,
            paddingBottom: 8,
            justifyContent: "center",

            backgroundColor: "#FFFFFF42",
          }}
        />
      </View> */}
    </View>
  );
};

export default NoNotification;
