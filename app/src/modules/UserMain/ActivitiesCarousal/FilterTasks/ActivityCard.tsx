import MediaCard from "@components/MediaCard";
import { useActivityReview } from "@hooks/activity/useActivityReview";
import { Post } from "@models/Post/Post";
import PrivateMedia from "@modules/PrivatePostMedia/PrivateMedia";
// import { useUserContext } from "@providers/user/UserProvider";
import { format } from "date-fns";
import { LinearGradient } from "expo-linear-gradient";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { View, Text } from "react-native";
import CardAction from "./CardActions";
interface Props {
  uid: string;
  post: Post;
  postRef: FirebaseFirestoreTypes.DocumentReference;
  cardWidth: number;
  isLive?: boolean;
}
const ActivityCard: React.FC<Props> = ({
  uid,
  post,
  postRef,
  cardWidth,
  isLive,
}) => {
  const { activityName } = useActivityReview(post.id, uid, true);
  // const { user } = useUserContext();

  return (
    <View
      className="relative rounded-lg overflow-hidden h-64 cursor-pointer  p-2"
      style={{ width: cardWidth }}
    >
      <View className="relative flex flex-col justify-between w-full h-full border-white border-1 rounded-xl overflow-hidden">
        <LinearGradient
          colors={["#000000DE", "#00000077", "#00000000"]}
          className="absolute top-0 z-20 w-full p-2 rounded-lg rounded-b-none rounded-r-lg bg-gradient-to-b from-smoke-750 to-transparent"
        >
          <Text
            numberOfLines={1}
            className="font-extrabold text-white w-27 capitalize text-ellipsis overflow-hidden h-5 mb-[3px] "
          >
            {activityName}
          </Text>
          <Text className=" text-white text-[11px]	 whitespace-nowrap mt-1 ">
            {post.updatedOn ? format(new Date(post.updatedOn), "dd") : ""}{" "}
            {post.updatedOn ? format(new Date(post.updatedOn), "MMM") : ""}
          </Text>
        </LinearGradient>
        {post.view === "private" ? (
          <PrivateMedia
            // isOwner={user?.uid === post.creatorId}
            media={post.media}
            heightStr="h-full"
            imgSizeStr="w-4 h-4 iphoneX:w-5 iphoneX:h-5"
            textSizeStr="text-sm iphoneX:text-base"
          />
        ) : (
          <MediaCard
            media={post.media.length ? post.media[0] : undefined}
            roundedStr={"rounded-xl"}
            notPlayable={true}
            fluid={true}
          />
        )}
        <LinearGradient
          colors={["#00000000", "#00000077", "#000000DE"]}
          className="absolute bottom-0 z-10 flex flex-row items-end w-full text-white border-0 rounded-lg h-1/4 "
        >
          <CardAction
            post={post}
            postRef={postRef}
            isLive={isLive}
            activityName={activityName}
          />
        </LinearGradient>
      </View>
    </View>
  );
};
export default ActivityCard;
