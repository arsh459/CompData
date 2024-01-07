import { Post } from "@models/Post/Post";
import { createNewPostRef, viewLevelsTypes } from "@utils/post/utils";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { ScrollView, Text, View } from "react-native";
import CurrPost from "./CurrPost";
import clsx from "clsx";
import { usePostReview } from "@hooks/postsV3/usePostReviews";

interface Props {
  gameId?: string;
  teamId?: string;
  currentPost: Post;
  postRef: FirebaseFirestoreTypes.DocumentReference;
  numInitialElements: number;
  viewLevel: viewLevelsTypes;
  hideAction?: boolean;
}

const RepliesThread: React.FC<Props> = ({
  gameId,
  teamId,
  currentPost,
  postRef,
  numInitialElements,
  viewLevel,
  hideAction,
}) => {
  const { postReviews, nextExists, onNext } = usePostReview(
    postRef,
    viewLevel !== "postReply",
    numInitialElements
  );

  return (
    <ScrollView className="flex-1">
      <CurrPost
        gameId={gameId}
        teamId={teamId}
        currentPost={currentPost}
        postRef={postRef}
        viewLevel={viewLevel}
        hideAction={hideAction}
      />
      {viewLevel !== "postReply" ? (
        <>
          {postReviews.map((each) => (
            <View key={each.id}>
              <RepliesThread
                gameId={gameId}
                teamId={teamId}
                currentPost={each}
                postRef={createNewPostRef(postRef, each.id)}
                numInitialElements={1}
                viewLevel={viewLevel === "session" ? "post" : "postReply"}
              />
            </View>
          ))}
          {nextExists ? (
            <View
              className={clsx(
                viewLevel === "session"
                  ? "ml-[60px] iphoneX:ml-[64px]"
                  : "ml-[100px] iphoneX:ml-[104px]"
              )}
            >
              <Text className="text-sky-500" onPress={onNext}>
                Show more{viewLevel === "post" ? " sub" : ""} replies
              </Text>
            </View>
          ) : null}
        </>
      ) : null}
    </ScrollView>
  );
};

export default RepliesThread;
