import { mediaIcon, privateIcon, shareMideaIcon } from "@constants/imageKitURL";
import { Post } from "@models/Post/Post";
import { useNavigation } from "@react-navigation/native";
import { Image, Pressable, Text, View } from "react-native";

interface Props {
  post: Post;
  onViewMedia: () => void;
}

const Owner: React.FC<Props> = ({ post, onViewMedia }) => {
  const navigation = useNavigation();

  return (
    <View className="bg-[#111111D6] border border-[#E0E0E0] rounded-3xl overflow-hidden mt-4">
      <View className="flex flex-row items-center p-2.5 iphoneX:px-4 iphoneX:py-2.5">
        <Image
          source={{ uri: privateIcon }}
          className="w-4 h-4 iphoneX:w-5 iphoneX:h-5 mr-2 iphoneX:mr-3"
          resizeMode="contain"
        />
        <Text className="text-white flex-1 iphoneX:text-xl font-semibold">
          This post is Private
        </Text>
      </View>
      <Text className="text-white text-xs iphoneX:text-base border border-[#E0E0E0] p-2.5 iphoneX:px-4 iphoneX:py-2.5">
        Share this post with the community. Best post will{" "}
        <Text className="text-[#FF5F75]">get a Special Prize</Text> and will be
        featured in spotlight.
      </Text>
      <View className="flex flex-row items-center text-sm iphoneX:text-lg font-medium">
        <Pressable
          className="flex-1 flex flex-row justify-center items-center px-3 py-2 iphoneX:px-4 iphoneX:py-3 bg-[#261C3D] border-r border-[#E0E0E0]"
          onPress={onViewMedia}
        >
          <Image
            source={{ uri: mediaIcon }}
            className="w-4 h-4 iphoneX:w-5 iphoneX:h-5 object-contain mr-2 iphoneX:mr-3"
          />
          <Text className="text-white ">View Media</Text>
        </Pressable>
        <Pressable
          className="flex-1 flex flex-row justify-center items-center px-3 py-2 iphoneX:px-4 iphoneX:py-3 bg-[#FF556C]"
          onPress={() => {
            navigation.navigate("WritePost", {
              gameId: post.gameId ? post.gameId : "",
              teamId: post.eventId ? post.eventId : "",
              postId: post.id,
            });
          }}
        >
          <Image
            source={{ uri: shareMideaIcon }}
            className="w-4 h-4 iphoneX:w-5 iphoneX:h-5 object-contain mr-2.5 iphoneX:mr-4"
          />
          <Text className="text-white ">Share post</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Owner;
