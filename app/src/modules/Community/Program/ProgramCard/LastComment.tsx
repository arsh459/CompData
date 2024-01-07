import { View, Text } from "react-native";
import UserImage from "@components/UserImage";
import { formatDistanceToNow } from "date-fns";
import { usePostReview } from "@hooks/posts/usePostReviews";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import CardAction from "./CardAction";
import { createNewPostRef } from "@utils/post/utils";

interface Props {
  postRef: FirebaseFirestoreTypes.DocumentReference;
}

const LastComment: React.FC<Props> = ({ postRef }) => {
  const { postReviews } = usePostReview(postRef, true, 1);

  return postReviews.length && postReviews[0] ? (
    <>
      <View className="h-px bg-[#100F1A]" />
      <View className="flex flex-row p-4">
        <View className="mr-3 mt-2">
          <UserImage
            image={postReviews[0].creatorImg}
            name={postReviews[0].creatorName}
            width="w-8"
            height="h-8"
          />
        </View>
        <View className="flex-1 bg-[#3D3D48] rounded-lg">
          <View className="flex flex-row items-center px-3 py-2">
            <Text
              className="text-[#D0CFE4] text-base iphoneX:text-lg font-bold"
              style={{ fontFamily: "BaiJamjuree-Bold" }}
              numberOfLines={1}
            >
              {postReviews[0].creatorName}
            </Text>
            {postReviews[0].updatedOn ? (
              <>
                <View className="w-1 h-1 bg-[#81809B] rounded-full mx-3" />
                <Text className="text-[#D0CFE4] text-[10px] iphoneX:text-xs">
                  {formatDistanceToNow(postReviews[0].updatedOn)} ago
                </Text>
              </>
            ) : null}
          </View>
          <Text className="text-[#D0CFE4] text-sx iphoneX:text-sm mx-3 mb-2">
            {postReviews[0].text}
          </Text>
          <CardAction
            post={postReviews[0]}
            postRef={createNewPostRef(postRef, postReviews[0].id)}
            isLive={true}
            level="post"
          />
        </View>
      </View>
    </>
  ) : null;
};

export default LastComment;
