import Loading from "@components/loading/Loading";
import { Post, postTypes } from "@models/Post/Post";
import { useGamePostsContext } from "@providers/gamePosts/GamePostProvider";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { View, Text, FlatList } from "react-native";
import ProgramCard from "./ProgramCard";

interface Props {
  postType: postTypes;
}

const FilteredProgram: React.FC<Props> = ({ postType }) => {
  const { posts, onNext, fetched } = useGamePostsContext();

  const renderItem = ({
    item,
    index,
  }: {
    item: { post: Post; ref: FirebaseFirestoreTypes.DocumentReference };
    index: number;
  }) => {
    return (
      <ProgramCard post={item.post} postRef={item.ref} isLive={index < 5} />
    );
  };

  const keyExtractor = (item: {
    post: Post;
    ref: FirebaseFirestoreTypes.DocumentReference;
  }) => item.post.id;

  return (
    <>
      {fetched ? (
        <FlatList
          data={posts}
          className="flex-1 bg-[#100F1A]"
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          onEndReachedThreshold={0.4}
          onEndReached={onNext}
          bounces={false}
          ListHeaderComponent={
            <>
              {posts?.length ? null : (
                <View className="flex-1 flex items-center justify-center py-8">
                  <Text className="text-3xl text-white text-center font-bold">
                    No Posts to show
                  </Text>
                </View>
              )}
            </>
          }
        />
      ) : (
        <View className="flex-1 bg-[#100F1A] flex justify-center items-center">
          <Loading />
        </View>
      )}
    </>
  );
};

export default FilteredProgram;
