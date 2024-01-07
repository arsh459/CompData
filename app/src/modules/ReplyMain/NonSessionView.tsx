import { formatDistanceToNow } from "date-fns";
import UserImage from "@components/UserImage";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Autolink from "react-native-autolink";
import { Post } from "@models/Post/Post";
import clsx from "clsx";
import { viewLevelsTypes } from "@utils/post/utils";
import HeartIcon from "@components/SvgIcons/HeartIcon";
import ReplyIcon from "@components/SvgIcons/ReplyIcon";

interface Props {
  currentPost: Post;
  viewLevel: viewLevelsTypes;
  handleClap: () => void;
  handleReply: () => void;
  hideAction?: boolean;
  isClapped?: boolean;
  isReplied?: boolean;
}

const NonSessionView: React.FC<Props> = ({
  currentPost,
  viewLevel,
  handleClap,
  handleReply,
  hideAction,
  isClapped,
  isReplied,
}) => {
  const actionIconStr = clsx(
    "aspect-square mr-2",
    viewLevel === "post" ? "w-4 iphoneX:w-5" : "w-3 iphoneX:w-4"
  );

  const actionTextStr = clsx(
    viewLevel === "post"
      ? "text-sm iphoneX:text-base"
      : "text-xs iphoneX:text-sm"
  );

  return (
    <View className="flex flex-row p-4">
      {viewLevel === "postReply" ? (
        <View className="w-8 iphoneX:w-9 mr-3 mt-2" />
      ) : null}
      <View
        className={clsx(
          "aspect-square mr-3 mt-2",
          viewLevel === "post" ? "w-8 iphoneX:w-9" : "w-6 iphoneX:w-7"
        )}
      >
        <UserImage
          image={currentPost.creatorImg}
          name={currentPost.creatorName}
          width="w-full"
          height="h-full"
        />
      </View>
      <View className="flex-1 bg-[#343150] rounded-lg">
        <View className="flex px-3 py-2 pb-4">
          <Text
            className="text-[#D0CFE4] text-base font-bold"
            style={{ fontFamily: "Nunito-Bold" }}
            numberOfLines={1}
          >
            {currentPost.creatorName}
          </Text>
          <Text className="text-[#D0CFE4] text-[10px]">
            {formatDistanceToNow(currentPost.updatedOn)} ago
          </Text>

          {/* <View className="w-1 h-1 bg-[#81809B] rounded-full mx-3" />
          <Text className="text-[#D0CFE4] text-[10px] iphoneX:text-xs">
            {formatDistanceToNow(currentPost.updatedOn)} ago
          </Text> */}
        </View>
        <View className="px-3 pb-2">
          <Autolink
            text={currentPost.text}
            renderText={(text) => (
              <Text
                className={clsx(
                  "text-[#D0CFE4]",
                  viewLevel === "post"
                    ? "text-sm iphoneX:text-base"
                    : "text-xs iphoneX:text-sm"
                )}
              >
                {text}
              </Text>
            )}
            linkStyle={{ color: "blue" }}
          />
        </View>
        {hideAction ? null : (
          <>
            <View className="h-px bg-[#100F1A]" />
            <View className="flex flex-row">
              <TouchableOpacity
                style={styles.TouchableOpacityStyle}
                onPress={handleClap}
              >
                <View className={actionIconStr}>
                  <HeartIcon color={"#FF3FBE"} fill={isClapped} />
                </View>
                <Text
                  className={actionTextStr}
                  style={{ fontFamily: "Nunito-Bold", color: "#FF3FBE" }}
                >
                  {currentPost?.numClaps || 0}
                </Text>
              </TouchableOpacity>
              {viewLevel === "post" ? (
                <>
                  <View className="w-px bg-[#100F1A]" />
                  <TouchableOpacity
                    style={styles.TouchableOpacityStyle}
                    onPress={handleReply}
                  >
                    <View className={actionIconStr}>
                      <ReplyIcon color={"#7972BB"} fill={isReplied} />
                    </View>
                    <Text
                      className={actionTextStr}
                      style={{ fontFamily: "Nunito-Bold", color: "#7972BB" }}
                    >
                      {currentPost?.numCheckins || 0}
                    </Text>
                  </TouchableOpacity>
                </>
              ) : null}
            </View>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  TouchableOpacityStyle: {
    flex: 1,
    padding: 10,
    marginBottom: 4,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NonSessionView;
