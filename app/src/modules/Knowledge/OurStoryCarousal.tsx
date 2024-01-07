import { View, FlatList, Text, Pressable } from "react-native";
import { PostOrPage } from "@tryghost/content-api";
import { useEffect, useState } from "react";
import { getRelatedPostsUsingTags } from "@utils/ghost/ghostutils";
import KnowledgeCarousalCard from "./KnowledgeCarousalCard";

const OurStoryCarousal = () => {
  const [posts, setPosts] = useState<PostOrPage[]>([]);
  const tagsToFetch = ["athlete"];
  useEffect(() => {
    const getPosts = async () => {
      const allPosts = await getRelatedPostsUsingTags(tagsToFetch);
      if (allPosts?.length) {
        setPosts(allPosts);
      }
    };
    if (tagsToFetch.length) {
      getPosts();
    }
  }, [tagsToFetch]);

  const renderItem = ({ item }: { item: PostOrPage }) => {
    const onPress = () => {};

    return (
      <Pressable onPress={onPress}>
        <KnowledgeCarousalCard
          imgUri={
            item.feature_image ? (item.feature_image as string) : undefined
          }
          title={item.title}
          btnText="Watch her story"
        />
      </Pressable>
    );
  };

  const keyExtractor = (item: PostOrPage) => item.id;

  return (
    <>
      <Text className="text-[#FFFFFF] capitalize font-medium text-sm iphoneX:text-base p-4">
        Our Stories
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
  );
};

export default OurStoryCarousal;
