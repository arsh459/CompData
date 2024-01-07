import { View, Text, Image } from "react-native";

import ButtonWithIcon from "@modules/TeamInvite/ButtonWithIcon";
import {
  baseImageKit,
  championOBWelcome,
  plusSignBlack,
} from "@constants/imageKitURL";
import GradientText from "@components/GradientText";
import Header from "@modules/Header";

import { createTeamInviteLinkV2 } from "@utils/dynamicLinks/inviteLink";
import { useUserContext } from "@providers/user/UserProvider";
import { shareNatively } from "@components/ShareWrapper";
import { useRoute } from "@react-navigation/native";

interface Props {
  teamName: string;
  teamId: string;
  onClose: () => void;
}

const WelcomeTeam: React.FC<Props> = ({ teamName, teamId, onClose }) => {
  const { user } = useUserContext();
  const route = useRoute();

  const onAddNewPlayer = async () => {
    if (user?.uid) {
      const url = await createTeamInviteLinkV2(
        user?.uid,
        user?.userKey ? user?.userKey : ""
      );
      shareNatively(url, route.name);
    }
  };

  return (
    <View className="flex-1  bg-[#100F1A]">
      <Header headerType="overlay" tone="dark" />
      <Text
        className="text-[#F1F1F1]  text-lg iphoneX:text-xl pt-16 iphoneX:pt-24 text-center"
        style={{ fontFamily: "BaiJamjuree-Bold" }}
      >
        Welcome to the championship
      </Text>
      <View className="relative w-4/5  iphoneX:w-full mx-auto">
        <Image
          source={{
            uri: championOBWelcome,
          }}
          className=" w-full aspect-[302/235] "
          resizeMode={"contain"}
        />
        <View className="absolute left-0 right-0 top-0 bottom-0 flex items-center justify-center">
          <GradientText
            text={teamName}
            colors={["#D2B35E", "#FFE9AC", "#CBAA52"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            textStyle={{
              fontFamily: "BaiJamjuree-SemiBold",
              fontSize: 36,
              textAlign: "center",
            }}
          />
        </View>
      </View>

      <View className="flex justify-center items-center  flex-1">
        {/* <View className="flex  items-center"> */}
        <Text className="text-[#F1F1F1] text-base iphoneX:text-lg font-normal  text-center   px-11 ">
          Add an accountability partner and make fitness fun!
        </Text>
        <View className="pt-2 iphoneX:pt-4 w-4/5">
          <ButtonWithIcon
            iconUrl={`${plusSignBlack}`}
            title={"Add A New Player "}
            textColor="text-[#14131E] "
            textStyle="pl-2 text-xs iphoneX:text-sm "
            roundedStr="rounded-full py-3  px-4 flex flex-row  justify-center"
            iconStyle="w-[21px] aspect-square "
            fontFamily="BaiJamjuree-Bold"
            layoutStyle={{ backgroundColor: "#FFFFFF", alignItems: "center" }}
            onPress={onAddNewPlayer}
          />
          {/* </View> */}
          <View className="pt-3 iphoneX:pt-4">
            <ButtonWithIcon
              iconUrl={`${baseImageKit}/${""}`}
              title={"I want to Play Solo"}
              textColor="text-[#696969] "
              textStyle="pl-2 text-xs iphoneX:text-sm "
              roundedStr="rounded-full py-3  px-4 flex flex-row  justify-center"
              iconStyle="w-[12px] aspect-square "
              fontFamily="BaiJamjuree-Bold"
              layoutStyle={{
                backgroundColor: "#14131E",
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#696969",
              }}
              onPress={onClose}
              // onPress={() => navigation.navigate("FitPointExpanderScreen")}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default WelcomeTeam;
