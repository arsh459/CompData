import { TouchableOpacity, View } from "react-native";
import FeedChips from "./FeedChips";
import ParticipantsComp from "./components/ParticipantsComp";
import { FlashList } from "@shopify/flash-list";
import FeedPostCard from "./components/FeedPostCard";
import { PostT, usePosts } from "@hooks/postsV3/usePosts";
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ImageWithURL from "@components/ImageWithURL";
import Loading from "@components/loading/Loading";

const FeedSection = () => {
  const navigation = useNavigation();
  const { posts, onNext, fetched, postFilter, setPostFilter, onPostRefresh } =
    usePosts();

  const renderItem = ({ item }: { item: PostT }) => {
    return (
      <FeedPostCard
        item={item}
        onPostRefresh={(deletePostId?: string) =>
          onPostRefresh(item.ref, deletePostId)
        }
      />
    );
  };

  const keyExtractor = (item: PostT) => item.post.id;

  const handlePress = () => {
    setPostFilter((prev) => (prev === "Highlights" ? "All posts" : prev));
    navigation.navigate("WritePost", {});
  };

  return (
    <View className="flex-1 relative z-0">
      <FeedChips onSelect={setPostFilter} selectedChips={postFilter} />
      <FlashList
        data={posts}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        bounces={false}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.4}
        onEndReached={onNext}
        ItemSeparatorComponent={() => <View className="w-8 aspect-square" />}
        ListHeaderComponent={<ParticipantsComp />}
        ListFooterComponent={
          <View className="flex-1 flex items-center justify-center py-8">
            {!fetched ? (
              <Loading width="w-12" height="h-12" />
            ) : !posts.length ? (
              <Text className="text-3xl text-white text-center font-bold">
                No Posts to show
              </Text>
            ) : null}
          </View>
        }
        estimatedItemSize={400}
      />

      <TouchableOpacity
        onPress={handlePress}
        className="absolute right-4 bottom-4 z-10 rounded-full"
      >
        <ImageWithURL
          source={{
            uri: "https://ik.imagekit.io/socialboat/Group%201000001235_opvvNSLQa.png?updatedAt=1695812057131",
          }}
          className="w-20 aspect-square"
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default FeedSection;
