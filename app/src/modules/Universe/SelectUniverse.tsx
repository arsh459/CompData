import CloseBtn from "@components/Buttons/CloseBtn";
import SocialBoat from "@components/SocialBoat";
import { completedIconGreenTick } from "@constants/imageKitURL";
import { useActiveGames } from "@hooks/game/useActiveGames";
import { EventInterface } from "@models/Event/Event";
import Header from "@modules/Header";
import { SOCIALBOAT_GAME, useAuthContext } from "@providers/auth/AuthProvider";
// import { useGameContext } from "@providers/game/GameProvider";
import { useUserContext } from "@providers/user/UserProvider";
import { useNavigation } from "@react-navigation/native";
// import { getTeamId } from "@utils/utills";
import clsx from "clsx";
import { Text, TouchableOpacity, View, Image, ScrollView } from "react-native";

const SelectUniverse = () => {
  const contentColor = "#FFFFFF";
  const navigation = useNavigation();
  const { games } = useActiveGames();

  const { onChangeGameId, state } = useAuthContext();
  // const { game } = useGameContext();
  const { user } = useUserContext();

  const handleClick = (gameObj: EventInterface) => {
    // const userTeam = getTeamId(user, gameObj.id);

    // if user doesn't have team
    if (gameObj?.inviteCode) {
      navigation.navigate("InviteCode", { gameId: gameObj.id });
    }
    // user team
    else if (!gameObj.inviteCode && !user?.onboarded) {
      onChangeGameId(gameObj.id);
      setTimeout(() => {
        navigation.navigate("JoinBoat", {
          section: "welcome",
        });
      }, 200);
    } else {
      onChangeGameId(gameObj.id);
      setTimeout(() => {
        navigation.navigate("Home");
      }, 200);
    }
  };

  return (
    <View className="flex-1 bg-[#100F1A]">
      <Header
        titleNode={
          <SocialBoat
            textColor="#FFFFFF"
            textClass="text-xxl iphoneX:text-2xl"
            iconClass="w-6 iphoneX:w-8 aspect-square"
          />
        }
        optionNode={
          <CloseBtn
            onClose={() => navigation.goBack()}
            classStr="w-4 aspect-square mr-2"
          />
        }
        headerColor="#100F1A"
        tone="dark"
      />
      <View className="h-px bg-white/25 my-3" />
      <Text className="text-[#FF576E] text-lg iphoneX:text-[22px] font-bold px-4">
        Switch your game Universe
      </Text>
      <ScrollView className="px-4 py-3" bounces={false}>
        {games.map((each) => (
          <TouchableOpacity onPress={() => handleClick(each)} key={each.id}>
            <View className="bg-[#FFFFFF1F] px-4 py-2.5 my-1 rounded-xl flex flex-row">
              <Text
                className="flex-1 text-lg iphoneX:text-[22px]"
                style={{ fontFamily: "BaiJamjuree-Bold", color: contentColor }}
              >
                {each.id === SOCIALBOAT_GAME ? "SocialBoat" : each.name}
              </Text>
              {/* {each.inviteCode ? (
                <>
                  <Text className="text-white text-base iphoneX:text-xl leading-8 mx-4">
                    &#8226;
                  </Text>

                  <Text
                    className="text-white text-xs iphoneX:text-sm leading-8"
                    style={{ fontFamily: "BaiJamjuree-Bold" }}
                  >
                    Invite only
                  </Text>
                </>
              ) : null} */}
              {each.id === state.gameId ? (
                <View className="rounded-full ml-4 h-8 flex justify-center items-center">
                  <Image
                    source={{ uri: completedIconGreenTick }}
                    className={clsx("w-5 h-5")}
                    resizeMode="contain"
                  />
                </View>
              ) : null}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default SelectUniverse;
