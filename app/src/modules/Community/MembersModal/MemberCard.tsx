import ProgressBar from "@components/ProgressBar";
import UserImage from "@components/UserImage";
import { UserRank } from "@models/Activity/Activity";
import { getLevelColor } from "@utils/level/levelColor";
import { View, Text } from "react-native";

interface Props {
  member: UserRank;
  EarnedFP: number;
}

const MemberCard: React.FC<Props> = ({ member, EarnedFP }) => {
  const { color: levelColor } = getLevelColor(
    member.userLevelV2 ? member.userLevelV2 : 0
  );

  return (
    <View className="flex flex-row px-4 py-2 bg-white">
      <View className="flex flex-col items-center">
        <View className="flex-1 flex justify-center items-center">
          <View
            className="p-0.5 rounded-full"
            style={{
              backgroundColor: levelColor,
            }}
          >
            <UserImage
              image={member.authorImg}
              name={member.authorName}
              width="w-10 iphoneX:w-12"
              height="h-10 iphoneX:h-12"
              color={levelColor}
            />
          </View>
        </View>
        <Text className="font-semibold iphoneX:text-lg italic">
          Rank {member.rank ? member.rank : 0}
        </Text>
      </View>
      <View className="flex-1 flex justify-between pl-4">
        <View className="flex flex-row justify-between items-end">
          <Text className="flex-1 font-semibold text-lg iphoneX:text-2xl italic">
            {member.authorName}
          </Text>
          <Text className="font-light italic iphoneX:text-xl whitespace-nowrap">
            Lvl {member.userLevelV2 ? member.userLevelV2 : 0}
          </Text>
        </View>
        <View className="py-1.5 iphoneX:py-3">
          <ProgressBar
            height={5}
            progress={member.progressV2 ? member.progressV2 * 100 : 0}
            activeColor="#203C51"
            inActiveColor="transparent"
            borderColor="#203C51"
            borderWidth={0.5}
            padding={1}
          />
        </View>
        <Text className="font-semibold iphoneX:text-lg italic text-right">
          Earned {EarnedFP} FP
        </Text>
      </View>
    </View>
  );
};

export default MemberCard;
