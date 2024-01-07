import MembersImage from "@components/MembersImage";
import UserImage from "@components/UserImage";
import { useLatestPost } from "@hooks/posts/useLatestPost";
import { useTeamContext } from "@providers/team/TeamProvider";
import { getGameNameReadable } from "@utils/challange/utils";
import { formatDistanceToNow } from "date-fns";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text } from "react-native";

const TeamCard = () => {
  const { team: sbEvent, teamMembers, teamMembersCount } = useTeamContext();
  const { post } = useLatestPost(sbEvent?.parentId);

  return (
    <LinearGradient
      colors={["#335E7D", "#736969"]}
      className="flex flex-col justify-between rounded-xl"
    >
      <View className="flex flex-row px-2.5 iphoneX:px-4">
        <View className="self-center py-2.5 iphoneX:py-4 flex justify-center items-center">
          <MembersImage
            members={teamMembers}
            membersCount={teamMembersCount}
            size="small"
            hidePlusOthers={true}
          />
          <Text className="text-white text-sm pt-1.5">
            {teamMembersCount} Players
          </Text>
        </View>
        <View className="w-px mx-2.5 iphoneX:mx-4 bg-white" />
        <View className="py-2.5 iphoneX:py-4">
          <Text
            numberOfLines={2}
            className="iphoneX:text-xl font-bold pb-[3px] text-white italic"
          >
            {sbEvent?.name}
          </Text>
          <Text className="text-sm text-white italic">
            {getGameNameReadable(sbEvent?.parentId)}
          </Text>
        </View>
      </View>
      <View className="h-px bg-white" />
      {post ? (
        <View className="bg-white rounded-xl m-2.5 iphoneX:m-4 p-2 flex flex-row">
          <UserImage
            image={post.creatorImg}
            name={post.creatorName}
            width="w-10 iphoneX:w-14"
            height="h-10 iphoneX:h-14"
          />
          <View className="pl-2 flex-1 flex flex-col">
            <Text
              numberOfLines={1}
              className="text-[#335E7D] italic font-semibold leading-tight text-sm iphoneX:text-base"
            >{`${post.creatorName} posted recently`}</Text>
            <View className="flex-1 flex flex-row items-center">
              <View className="flex-1 pr-2 flex flex-col justify-evenly">
                {post.taskName ? (
                  <Text
                    numberOfLines={1}
                    className="text-[#335E7D] italic text-xs leading-tight"
                  >
                    {post.taskName}
                  </Text>
                ) : post.teamName ? (
                  <Text
                    numberOfLines={1}
                    className="text-[#335E7D] font-medium italic text-sm leading-tight"
                  >
                    @{post.teamName}
                  </Text>
                ) : null}
                <Text className="text-[#335E7D] italic text-xs leading-tight">
                  {formatDistanceToNow(new Date(post.updatedOn))} ago
                </Text>
              </View>
              <LinearGradient
                colors={["#FD807C", "#F4A252"]}
                className="self-end rounded-xl"
              >
                <Text className="px-4 iphoneX:px-6 py-1 iphoneX:py-1.5 font-medium text-white text-sm">
                  Open
                </Text>
              </LinearGradient>
            </View>
          </View>
        </View>
      ) : null}
    </LinearGradient>
  );
};

export default TeamCard;
