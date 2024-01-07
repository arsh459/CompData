import { View, Text } from "react-native";
import MediaCard from "@components/MediaCard";
import { formatDistanceToNow } from "date-fns";
import Autolink from "react-native-autolink";
import { Post } from "@models/Post/Post";
import UserImage from "@components/UserImage";
import ReplyIcon from "@components/SvgIcons/ReplyIcon";

interface Props {
  currentPost: Post;
  isOwner: boolean;
}

const SessionView: React.FC<Props> = ({ currentPost, isOwner }) => {
  return (
    <>
      <View className="flex flex-row items-center px-4 pb-2 ">
        <UserImage
          image={currentPost.creatorImg}
          name={currentPost.creatorName}
          width="w-10 iphoneX:w-11"
          height="h-10 iphoneX:h-11"
        />
        <View className="flex-1 pl-4 flex items-start w-full">
          {/* <View className="w-8/12"> */}
          <Text
            className="font-extrabold text-[#D0CFE4] text-base iphoneX:text-lg"
            style={{ fontFamily: "Nunito-Bold" }}
            numberOfLines={2}
          >
            {currentPost.creatorName}
          </Text>
          <Text className="opacity-70 text-[#D0CFE4] text-xs ">
            {formatDistanceToNow(currentPost.updatedOn)} ago
          </Text>
          {/* </View> */}

          {/* <View className="w-4/12 flex-1 flex flex-row items-center justify-start pt-2">
              <View className="w-1 h-1 bg-[#81809B] rounded-full mx-3" /> 
          </View> */}
        </View>
      </View>
      <View className="mx-4 pb-4 ">
        <Autolink
          text={currentPost.text}
          renderText={(text) => (
            <Text className="text-[#D0CFE4] text-base whitespace-pre-wrap">
              {text}
            </Text>
          )}
          linkStyle={{ color: "blue" }}
        />
      </View>
      {currentPost.media[0] ? (
        <View className="w-full aspect-[150/88]">
          <MediaCard media={currentPost.media[0]} fluid={true} />
        </View>
      ) : null}
      <View className="flex flex-row items-center p-4">
        <View className="w-5 iphoneX:w-7 aspect-square -mb-1">
          <ReplyIcon color="#D0CFE4" fill={true} />
        </View>
        <Text
          className="pl-2.5 iphoneX:pl-4 text-[#D0CFE4] text-lg iphoneX:text-2xl"
          style={{ fontFamily: "Nunito-Bold" }}
        >
          Replies
        </Text>
      </View>
    </>
  );
};

export default SessionView;
