import {
  View,
  Text,
  ColorValue,
  Pressable,
  GestureResponderEvent,
  useWindowDimensions,
} from "react-native";
import { useState } from "react";
import { useUserStore } from "@providers/user/store/useUserStore";
import SvgIcons from "@components/SvgIcons";
import clsx from "clsx";
import { useNavigation } from "@react-navigation/native";
import { onDeletePost, onPinPost } from "@utils/postsV3/utils";
import { PostT } from "@hooks/postsV3/usePosts";
import ReportPost, {
  ReportStateTypes,
} from "../../../Community/Program/ProgramCard/ReportModal/ReportPost";
import UseModal from "@components/UseModal";

interface MoreOptionInterface {
  type: "forMe" | "notMe" | "forAdmin" | "forMeAndAdmin" | "everyone";
  text: string;
  onPress: () => void;
  color: ColorValue;
}

export type ModalStateTypes = "menu" | "none" | ReportStateTypes;

interface Props {
  item: PostT;
  onPostRefresh: (deletePostId?: string) => void;
}

const MoreMenu: React.FC<Props> = ({ item, onPostRefresh }) => {
  const { post } = item;
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const [menuPos, setMenuPos] = useState<{ x: number; y: number }>();
  const [showStatus, setShowStatus] = useState<ModalStateTypes>("none");

  const onOpen = (e: GestureResponderEvent) => {
    setMenuPos({ x: e.nativeEvent.pageX, y: e.nativeEvent.pageY });
    setShowStatus("menu");
  };

  const onClose = () => {
    setShowStatus("none");
  };

  const { isAdmin, isMe } = useUserStore(({ user }) => ({
    isAdmin: user?.role === "admin",
    isMe: user?.uid === post.creatorId,
  }));

  const moreOption: MoreOptionInterface[] = [
    {
      type: "forMe",
      text: "Edit Post",
      onPress: () => {
        onClose();
        navigation.navigate("WritePost", { postId: post.id });
      },
      color: "#FFFFFF",
    },
    {
      type: "forMeAndAdmin",
      text: "Delete Post",
      onPress: () => {
        onDeletePost(post.id, post.gameId);
        onPostRefresh(post.id);
        onClose();
      },
      color: "#FF6069",
    },
    {
      type: "notMe",
      text: "Report Post",
      onPress: () => {
        setShowStatus("selector");
      },
      color: "#FF6069",
    },
    {
      type: "forAdmin",
      text: post.pinned ? "Unpin Post" : "Pin Post",
      onPress: () => {
        onPinPost(post.id, !post.pinned);
        onPostRefresh();
        onClose();
      },
      color: "#3FB1FF",
    },
    {
      type: "everyone",
      text: "Cancel",
      onPress: () => {
        setShowStatus("none");
      },
      color: "#FFFFFF",
    },
  ];

  return (
    <>
      <Pressable onPress={onOpen} className="w-4 aspect-square">
        <SvgIcons iconType="moredot" color="#FFFFFF" />
      </Pressable>

      <UseModal
        visible={showStatus !== "none"}
        onClose={onClose}
        width="w-full"
        height="h-full"
        blurAmount={18}
        fallbackColor="#100F1A"
        tone="dark"
      >
        {showStatus === "none" ? null : showStatus === "menu" ? (
          <View
            className="bg-[#4E497D] rounded-xl py-1"
            style={
              menuPos
                ? {
                    position: "absolute",
                    top: menuPos.y,
                    right: width - menuPos.x,
                  }
                : undefined
            }
          >
            {moreOption.map((each) => {
              let shouldRender: boolean = false;
              if (each.type === "forMe" && isMe) {
                shouldRender = true;
              } else if (each.type === "everyone") {
                shouldRender = true;
              } else if (each.type === "forAdmin" && isAdmin) {
                shouldRender = true;
              } else if (each.type === "forMeAndAdmin" && (isMe || isAdmin)) {
                shouldRender = true;
              } else if (each.type === "notMe" && !isMe) {
                shouldRender = true;
              }

              console.log("e", each.text, each.type, shouldRender);

              if (shouldRender) {
                return (
                  <Text
                    key={each.text}
                    onPress={each.onPress}
                    className={clsx(
                      "px-4 text-center text-sm py-1",
                      each.text === "Cancel" && "border-t border-[#918EAC] mt-2"
                    )}
                    style={{ color: each.color }}
                  >
                    {each.text}
                  </Text>
                );
              } else {
                return null;
              }
            })}
          </View>
        ) : (
          <ReportPost
            userId={post.creatorId}
            postId={post.id}
            state={showStatus}
            setState={setShowStatus}
            onCancel={onClose}
            target="Post"
            screen="community"
          />
        )}
      </UseModal>
    </>
  );
};

export default MoreMenu;
