import { Post } from "@models/Post/Post";
import { View, Text, FlatList } from "react-native";
import PostProgram from "./PostProgram";
import ProgramCard from "./ProgramCard";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import ProgramWrapper from "./ProgramWrapper";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import AnnouncementSpotlight from "./AnnouncementSpotlight";
import {
  GamePostsProvider,
  useGamePostsContext,
} from "@providers/gamePosts/GamePostProvider";
import Loading from "@components/loading/Loading";
import { useForcePortrait } from "@hooks/orientation/useForcePortrait";
import { useUserContext } from "@providers/user/UserProvider";
import { isBlockedPost } from "@modules/UserMain/utils";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";

// import { usePortrait } from "@hooks/orientation/usePortrait";

const ProgramHelper = () => {
  const { posts, onNext, fetched } = useGamePostsContext();
  const tabBarHeight = useBottomTabBarHeight();
  useForcePortrait();
  // useUnlockAsync();

  const { user } = useUserContext();

  const renderItem = ({
    item,
    index,
  }: {
    item: { post: Post; ref: FirebaseFirestoreTypes.DocumentReference };
    index: number;
  }) => {
    return isBlockedPost(user, item.post) ? null : (
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
              <View className="py-4">
                <AnnouncementSpotlight />
                <PostProgram />
              </View>
              {posts?.length ? null : (
                <View className="flex-1 flex items-center justify-center py-8">
                  <Text className="text-3xl text-white text-center font-bold">
                    No Posts to show
                  </Text>
                </View>
              )}
            </>
          }
          ListFooterComponent={<View style={{ height: tabBarHeight }} />}
        />
      ) : (
        <View className="flex-1 bg-[#100F1A] flex justify-center items-center">
          <Loading />
        </View>
      )}
    </>
  );
};

const Program = () => {
  useScreenTrack();
  return (
    <ProgramWrapper>
      <GamePostsProvider>
        <ProgramHelper />
      </GamePostsProvider>
    </ProgramWrapper>
  );
};

export default Program;
