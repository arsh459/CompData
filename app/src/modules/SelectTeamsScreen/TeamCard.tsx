import WaveBtn from "@components/Buttons/WaveBtn";
import UserImage from "@components/UserImage";
import { CoachRank } from "@models/Activity/Activity";
import Arrow from "@modules/Community/Arrow";
// import { useNavigation } from "@react-navigation/native";
import { getDateStrings } from "@utils/leaderboard/utils";
import { getPointsToShow, getRank } from "@utils/rank/utils";
import { View, Text } from "react-native";

interface Props {
  team: CoachRank;
  month?: string;
  week?: string;
}

const TeamCard: React.FC<Props> = ({ team, month, week }) => {
  // const navigation = useNavigation();
  const rank = getRank(team, "overall", month);
  const pts = getPointsToShow(team, "overall", month);
  const { yesterday, dayBefore } = getDateStrings();

  return (
    <View className="rounded-2xl p-2 relative bg-gray-100 mt-2">
      <View className="flex flex-row rounded-2xl p-2  bg-white">
        <View className="flex justify-center items-center">
          <UserImage image={team.authorImg} name={team.authorName} />
        </View>
        <View className="flex-1">
          <View className="flex flex-row items-center pl-2 iphoneX:pl-4">
            <Arrow
              size="small"
              each={team}
              yesterday={yesterday}
              dayBefore={dayBefore}
            />
            <Text
              numberOfLines={1}
              className="pl-2 text-gray-700 text-sm iphoneX:text-base font-medium text-left"
            >
              {team.teamName ? team.teamName : "Influencer Team"}
            </Text>
          </View>
          <Text
            numberOfLines={1}
            className="pl-2 iphoneX:pl-4 text-xs iphoneX:text-sm text-gray-700 text-left"
          >
            {team.authorName}
          </Text>

          <Text className="pl-2 iphoneX:pl-4 text-blue-500 font-medium text-left text-xs iphoneX:text-sx">
            {pts ? `${pts} FPs` : "yet to start"}
          </Text>
        </View>
        <View className="flex-1 flex flex-col items-end px-2">
          <Text className="text-right italic font-semibold text-xs iphoneX:text-sx">
            Rank {rank}
          </Text>
        </View>
      </View>

      <View className="absolute right-0 bottom-0 bg-gray-100 rounded-2xl">
        <View className="w-24 m-1.5">
          <WaveBtn
            text="Join"
            showWave={true}
            fontsStyle="text-white px-4 py-2"
            gradient={true}
            gradientDirection="right"
            color1="#FD6F6F"
            color2="#F19B38"
            onPress={() => {}}
          />
        </View>
      </View>
    </View>
  );
};

export default TeamCard;
