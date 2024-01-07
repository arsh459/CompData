import BlurBG from "@components/BlurBG";
import InfoBtn from "@components/Buttons/InfoBtn";
import Loading from "@components/loading/Loading";
import { CoachRank, UserRank } from "@models/Activity/Activity";
import { useGameContext } from "@providers/game/GameProvider";
import { useUserContext } from "@providers/user/UserProvider";
import { useNavigation } from "@react-navigation/native";
import { getRank } from "@utils/rank/utils";
import clsx from "clsx";
import { ColorValue, Pressable, Text, View, ViewToken } from "react-native";
import Player from "./PlayersWise/Player";
import Teams from "./TeamsWise/Teams";

export type stickyItemStateTypes = "hidden" | "bottom-0" | "top-0";

export const getItemState = (
  viewableItems: ViewToken[],
  target?: UserRank | CoachRank
) => {
  for (let i = 0; i < viewableItems.length; i++) {
    const each = viewableItems[i];
    if (each.isViewable && each.key === target?.uid) {
      return "hidden";
    }
  }
  if (viewableItems.length && target) {
    const firstItem = viewableItems[0].item as UserRank | CoachRank;
    if (firstItem.rank >= target.rank) {
      return "top-0";
    }
  }
  return "bottom-0";
};

export const ListFooterComponent = (
  loading: boolean,
  text?: string,
  textColor?: ColorValue
) => {
  return loading ? (
    <View className="flex justify-center items-center my-2">
      <Loading width="w-5" height="h-5" />
    </View>
  ) : text ? (
    <View className="flex justify-center items-center my-2">
      <Text
        style={{
          fontFamily: "BaiJamjuree-Bold",
          fontSize: 16,
          color: textColor ? textColor : "#FFFFFF",
        }}
      >
        {text}
      </Text>
    </View>
  ) : null;
};

interface Props {
  userRank?: UserRank;
  coachRank?: CoachRank;
  stickyItemState: stickyItemStateTypes;
  onPress: () => void;
  currentSprint?: string;
}

const StickyItem: React.FC<Props> = ({
  userRank,
  coachRank,
  stickyItemState,
  onPress,
  currentSprint,
}) => {
  const { user } = useUserContext();
  const { params } = useGameContext();
  const navigation = useNavigation();
  const genderSpecific =
    params?.currentSprint?.filter === "gender:female" &&
    user?.gender !== "female"
      ? true
      : false;

  const goToReOnboard = () => navigation.navigate("ReOnBoard");

  return (
    <View className={clsx("absolute left-0 right-0", stickyItemState)}>
      <Pressable
        className="relative -my-1"
        onPress={genderSpecific ? goToReOnboard : onPress}
      >
        <BlurBG
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            marginVertical: 4,
          }}
          blurType="dark"
          blurAmount={10}
          fallbackColor="#100F1A"
        />

        {genderSpecific ? (
          <View className="bg-[#5C5C74] flex flex-row justify-center items-center p-5">
            <Text
              className="text-white text-base"
              style={{ fontFamily: "BaiJamjuree-Medium" }}
            >
              This challenge is only for women
            </Text>
            <View className="w-5 aspect-square" />
            <InfoBtn onPress={goToReOnboard} />
          </View>
        ) : (
          <>
            {userRank ? (
              <Player
                each={userRank}
                isMe={true}
                currentSprint={currentSprint}
                rank={getRank(userRank, "overall", currentSprint)}
              />
            ) : coachRank ? (
              <Teams
                each={coachRank}
                isMe={true}
                currentSprint={currentSprint}
                rank={getRank(coachRank, "overall", currentSprint)}
              />
            ) : null}
          </>
        )}
      </Pressable>
    </View>
  );
};

export default StickyItem;

interface TabProps {
  color: string;
  heightFromBottom: number;
}

export const BottomTabHandler: React.FC<TabProps> = ({
  color,
  heightFromBottom,
}) => {
  return (
    <View
      style={{
        height: heightFromBottom,
        backgroundColor: color,
      }}
    />
  );
};
