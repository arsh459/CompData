import SvgIcons from "@components/SvgIcons";
import { useSingleGhostPost } from "@hooks/ghost/useSingleGhostPost";
import { Image, Text, View } from "react-native";
import WebView from "react-native-webview";

interface Props {
  postId: string;
}

const SinglePost: React.FC<Props> = ({ postId }) => {
  const { post } = useSingleGhostPost(postId);

  return (
    <View className="flex-1 bg-white">
      {/* <ScrollView bounces={false} showsVerticalScrollIndicator={false}> */}
      <Image
        source={{
          uri: post?.feature_image
            ? post.feature_image
            : "https://ik.imagekit.io/socialboat/tr:w-200,c-maintain_ratio,fo-auto/Component_6_57EhzLjTF.png?ik-sdk-version=javascript-1.4.3&updatedAt=1675241713238",
        }}
        className="w-full aspect-video bg-[#100F1A]"
        resizeMode="contain"
      />
      <Text className="text-xl m-4">
        {post?.title ? post.title : "UNKNOWN"}
      </Text>
      <View className="flex flex-row justify-between items-center px-4">
        <View className="flex flex-row items-center">
          <Image
            source={{
              uri: post?.primary_author?.profile_image
                ? post.primary_author.profile_image
                : "https://ik.imagekit.io/socialboat/tr:w-200,c-maintain_ratio,fo-auto/Component_6_57EhzLjTF.png?ik-sdk-version=javascript-1.4.3&updatedAt=1675241713238",
            }}
            className="w-5 aspect-square bg-[#100F1A] rounded-full"
            resizeMode="contain"
          />
          <Text className="text-black/60 text-xs ml-2">
            {post?.primary_author?.name ? post.primary_author.name : "UNKNOWN"}
          </Text>
        </View>
        {post?.reading_time ? (
          <View className="flex flex-row items-center">
            <View className="w-3.5 aspect-square mr-2">
              <SvgIcons iconType="book" color="#00000099" />
            </View>
            <Text className="text-black/60 text-xs">{`${post.reading_time} mins Read`}</Text>
          </View>
        ) : null}
      </View>
      {post?.html ? (
        <WebView
          className="m-4"
          originWhitelist={["*"]}
          source={{
            html: post.html,
          }}
        />
      ) : null}
      {/* </ScrollView> */}
    </View>
  );
};

export default SinglePost;
