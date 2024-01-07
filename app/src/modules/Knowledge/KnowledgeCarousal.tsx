import { View, FlatList, Text, Pressable } from "react-native";
import { PostOrPage } from "@tryghost/content-api";
import { useEffect, useState } from "react";
import { getRelatedPostsUsingTags } from "@utils/ghost/ghostutils";
import KnowledgeCarousalCard from "./KnowledgeCarousalCard";

import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { useNavigation } from "@react-navigation/native";

// const tagsToFetch = [];

const KnowledgeCarousal = () => {
  const [posts, setPosts] = useState<PostOrPage[]>([]);

  useEffect(() => {
    const getPosts = async () => {
      const allPosts = await getRelatedPostsUsingTags([]);

      if (allPosts?.length) {
        setPosts(allPosts);
      }
    };
    // if (tagsToFetch.length) {
    getPosts();
    // }
  }, []);

  const navigation = useNavigation();

  const renderItem = ({ item }: { item: PostOrPage }) => {
    const onPress = () => {
      weEventTrack("home_blogClick", {});
      item.title &&
        item.slug &&
        navigation.navigate("BlogScreen", {
          name: item.title,
          source: `https://socialboat.live/blog/post/${item.slug}?noHeader=true`,
        });
    };

    return (
      <Pressable onPress={onPress}>
        <KnowledgeCarousalCard
          imgUri={
            item.feature_image ? (item.feature_image as string) : undefined
          }
          title={item.title}
          btnText={`${item.reading_time} mins Read`}
        />
      </Pressable>
    );
  };

  const keyExtractor = (item: PostOrPage) => item.id;

  return posts.length ? (
    <>
      <Text className="text-[#FFFFFF] capitalize font-medium text-sm iphoneX:text-base p-4">
        Stories for you
      </Text>

      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        horizontal={true}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={<View className="w-4 aspect-square" />}
        ListFooterComponent={<View className="w-4 aspect-square" />}
        ItemSeparatorComponent={() => <View className="w-4 aspect-square" />}
      />
    </>
  ) : null;
};

export default KnowledgeCarousal;
