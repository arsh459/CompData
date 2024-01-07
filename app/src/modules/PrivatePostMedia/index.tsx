import { Post } from "@models/Post/Post";
// import { useUserContext } from "@providers/user/UserProvider";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { View } from "react-native";
import Common from "./Common";
// import Owner from "./Owner";
import PrivateMediaSwiper from "./PrivateMedia/PrivateMediaSwiper";

interface Props {
  post: Post;
  activityName: string;
  fitPoints: number;
  iButtonVisible: boolean;
  onEditPost?: (post: Post) => void;
}

const PrivatePostMedia: React.FC<Props> = ({
  post,
  activityName,
  fitPoints,
  iButtonVisible,
  onEditPost,
}) => {
  // const { user } = useUserContext();
  // const isViewerAuthor = user?.uid === post.creatorId;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <View className="bg-black">
      <LinearGradient
        colors={["#00000000", "#46276F72", "#9E388872", "#F8576DB2"]}
        className="p-4 relative z-0"
        start={{ x: 0.48, y: 0 }}
        end={{ x: 0.52, y: 1 }}
      >
        <Common
          post={post}
          activityName={activityName}
          fitPoints={fitPoints}
          iButtonVisible={iButtonVisible}
        />
        {/* {isViewerAuthor ? (
          <Owner post={post} onViewMedia={() => setIsOpen(true)} />
        ) : null} */}
      </LinearGradient>
      <PrivateMediaSwiper
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        media={post.media}
      />
    </View>
  );
};

export default PrivatePostMedia;
