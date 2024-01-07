import { viewLevelsTypes } from "@utils/post/utils";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import RepliesThread from "./RepliesThread";
import { useState } from "react";
import Header from "@modules/Header";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { usePinnedPost } from "@hooks/postsV3/usePinnedPost";
import { savePostReply } from "@utils/postsV3/utils";
import { TEAM_ALPHABET_GAME } from "@constants/gameStats";
import { useUserStore } from "@providers/user/store/useUserStore";
import { createNewPost } from "@utils/postsV3/createUtills";
import ActionBarPost from "./ActionBarPost";

interface Props {
  gameId?: string;
  path: string;

  // postId: string;
  teamId?: string;
  viewLevel: viewLevelsTypes;
}

const ReplyMain: React.FC<Props> = ({
  gameId,
  path,

  // postId,
  teamId,
  viewLevel,
}) => {
  const { pinnedPost } = usePinnedPost(path);

  // const [textInputHeight, setTextInputHeight] = useState<number>(0);
  const [replyText, onUpdateText] = useState<string>("");

  const { uid, name, profileImage } = useUserStore(({ user }) => ({
    uid: user?.uid,
    name: user?.name,
    profileImage: user?.profileImage,
  }));

  const onPost = async () => {
    if (replyText && pinnedPost && uid) {
      const { post, ref } = pinnedPost;
      const newPost = createNewPost(
        "public",
        gameId || post?.gameId || TEAM_ALPHABET_GAME,
        uid,
        name,
        profileImage
      );

      weEventTrack("Reply_clickPost", {
        postId: newPost.id || "no_postId",
        creatorId: uid || "no_creatorId",
      });

      try {
        await savePostReply(ref, { ...newPost, text: replyText });
        onUpdateText("");
        // setTextInputHeight(0);
      } catch (e) {
        weEventTrack("postError", { error: JSON.stringify(e) });
        console.log("Error creating Post", e);
      }
    }
  };

  return (
    <>
      <Header
        back={true}
        defaultOption={true}
        headerColor="#232136"
        tone="dark"
      />
      {pinnedPost?.post && pinnedPost.ref ? (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          contentContainerStyle={{ flex: 1 }}
          className="flex-1"
        >
          <View className="flex-1 bg-[#232136] relative z-0">
            <RepliesThread
              gameId={gameId}
              teamId={teamId}
              currentPost={pinnedPost.post}
              postRef={pinnedPost.ref}
              numInitialElements={3}
              viewLevel={viewLevel}
              hideAction={viewLevel !== "session"}
            />
          </View>
          <ActionBarPost
            onSend={onPost}
            messageTyped={replyText}
            setMessageTyped={onUpdateText}
          />
        </KeyboardAvoidingView>
      ) : null}
    </>
  );

  // return pinnedPost?.post && pinnedPost?.ref ? (
  //   <>
  //     <Header
  //       back={true}
  //       defaultOption={true}
  //       headerColor="#232136"
  //       tone="dark"
  //     />
  //     <View
  //       className="flex-1 bg-[#232136]"
  //       style={{
  //         paddingBottom: inset.bottom ? inset.bottom : 12,
  //       }}
  //     >
  //       <ScrollView
  //         className="flex-1"
  //         bounces={false}
  //         showsVerticalScrollIndicator={false}
  //       >
  //         <RepliesThread
  //           gameId={gameId}
  //           teamId={teamId}
  //           currentPost={pinnedPost.post}
  //           postRef={pinnedPost.ref}
  //           numInitialElements={3}
  //           viewLevel={viewLevel}
  //           hideAction={viewLevel !== "session"}
  //         />
  //         <View className="w-4 aspect-square" />
  //       </ScrollView>
  //       <KeyboardAvoidingView
  //         behavior={Platform.OS === "ios" ? "padding" : "height"}
  //         keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
  //         className="flex flex-row items-end"
  //         style={{
  //           flex: Platform.OS === "ios" ? 1 : undefined,
  //           height: Math.max(50, textInputHeight + 16),
  //         }}
  //       >
  //         <TextInput
  //           style={{
  //             height: Math.max(40, textInputHeight),
  //             textAlignVertical: "center",
  //             color: "#D0CFE4",
  //           }}
  //           className="flex-1 text-base px-4 mx-4 bg-[#D4CFFF2E] rounded-[20px]"
  //           placeholder="Type something"
  //           placeholderTextColor="#C5C4D9"
  //           onChangeText={(newText) => onUpdateText(newText)}
  //           onContentSizeChange={(event) => {
  //             setTextInputHeight(event.nativeEvent.contentSize.height);
  //           }}
  //           value={replyText}
  //           multiline={true}
  //         />
  //         <TouchableOpacity onPress={onPost}>
  //           <View className="w-10 aspect-square p-2.5 mr-4 bg-[#454454] rounded-full">
  //             <SvgIcons iconType="send" />
  //           </View>
  //         </TouchableOpacity>
  //       </KeyboardAvoidingView>
  //     </View>
  //   </>
  // ) : null;
};

export default ReplyMain;
