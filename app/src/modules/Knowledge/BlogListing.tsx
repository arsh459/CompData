import { useGhostPosts } from "@hooks/ghost/useGhostPosts";

import { FlashList } from "@shopify/flash-list";
import { PostOrPage } from "@tryghost/content-api";
import { useState } from "react";
import { View, Text, useWindowDimensions } from "react-native";
import KnowledgeHeader from "./KnowledgeHeader";
import KnowledgeItemCard from "./KnowledgeItemCard";

interface Props {
  tabBarHeight: number;
}

const BlogListing: React.FC<Props> = ({ tabBarHeight }) => {
  const [searchStr, setSearchStr] = useState<string>();
  const [searchTags, setSearchTags] = useState<string[]>([]);
  const [searchAuthors, setSearchAuthors] = useState<string[]>([]);
  const { width } = useWindowDimensions();
  const { posts, onNext, filters } = useGhostPosts(
    searchStr,
    searchTags,
    searchAuthors
  );

  const keyExtractor = (item: PostOrPage) => item.id;
  const estimatedItemSize = width * 0.5;

  const renderItem = ({ item }: { item: PostOrPage }) => {
    return (
      <KnowledgeItemCard
        height={estimatedItemSize}
        key={keyExtractor(item)}
        item={item}
      />
    );
  };

  const ListHeader = () => {
    return (
      <View className="my-2.5 ">
        <KnowledgeHeader
          filters={filters}
          searchStr={searchStr}
          searchTags={searchTags}
          searchAuthors={searchAuthors}
          setSearchStr={setSearchStr}
          setSearchTags={setSearchTags}
          setSearchAuthors={setSearchAuthors}
        />
      </View>
    );
  };
  return (
    <View className="flex-1 bg-[#232136]">
      <FlashList
        data={posts}
        // className="flex-1"
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReachedThreshold={0.4}
        onEndReached={onNext}
        estimatedItemSize={estimatedItemSize}
        bounces={false}
        ListHeaderComponent={ListHeader}
        ListFooterComponent={
          <>
            {posts.length ? null : (
              <View className="h-full flex justify-center items-center">
                <Text className="text-base text-white">No Match Found</Text>
              </View>
            )}
            <View style={{ height: tabBarHeight + 16 }} />
          </>
        }
        ItemSeparatorComponent={() => <View className="w-4 aspect-square" />}
      />
    </View>
  );
};

export default BlogListing;
