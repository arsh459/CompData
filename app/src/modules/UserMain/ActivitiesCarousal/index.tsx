import { useUserPosts } from "@hooks/posts/useUserPosts";
import { Post } from "@models/Post/Post";
import { useProfileContext } from "@providers/profile/ProfileProvider";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { useState } from "react";
import { View, Text, FlatList } from "react-native";
// import { getAspriant } from "../utils";
import FilterTasks from "./FilterTasks";
import ActivityCard from "./FilterTasks/ActivityCard";
interface Props {}

const ActivitiesCarousal: React.FC<Props> = ({}) => {
  const { profile, selectedGameId } = useProfileContext();
  const { posts, onNext } = useUserPosts(profile?.uid, selectedGameId);
  const [cardWidth, setCardWidth] = useState(0);
  //   const { colorPrimary } = getAspriant(
  //     profile?.userLevelV2 ? profile.userLevelV2 : 0
  //   );
  // bf906210-4dd3-474c-ad11-febb5de23fb7   postid
  // 5f5a4b5a-b194-488b-9dbf-611474498e83 gameId

  function renderItem(
    post: Post,
    ref: FirebaseFirestoreTypes.DocumentReference,
    index: number
  ) {
    return (
      <ActivityCard
        post={post}
        uid={profile ? profile.uid : ""}
        postRef={ref}
        cardWidth={cardWidth}
        isLive={index < 5}
      />
    );
  }
  return (
    <>
      {/* <ActivityCard
       uid={uid}
       img={img}
       name={name}
       canEdit={canEdit}
       color={color}
       viewerId={viewerId}
       viewerIsCreator={viewerIsCreator}
       gameId={selectedGameId}
     /> */}

      {posts.length ? (
        <FlatList
          data={posts}
          className="flex-1 mx-2"
          renderItem={({ item, index }) =>
            renderItem(item.post, item.ref, index)
          }
          keyExtractor={(item) => item.post.id}
          ListHeaderComponent={<FilterTasks />}
          //   onEndReachedThreshold={50}
          onEndReached={onNext}
          bounces={false}
          numColumns={2}
          onLayout={(e) => setCardWidth(e.nativeEvent.layout.width / 2)}
        />
      ) : (
        <View className="flex-1 flex items-center justify-center">
          <Text className="text-3xl text-gray-700 text-center font-bold">
            No Posts to show
          </Text>
        </View>
      )}
    </>
  );
};
export default ActivitiesCarousal;
