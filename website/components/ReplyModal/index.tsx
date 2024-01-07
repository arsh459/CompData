import CreateModal from "@templates/community/Program/CreateModal/CreateModal";
import UserImage from "@templates/listing/Header/UserImage";
import { DocumentReference } from "firebase/firestore";
import RepliesThread from "./RepliesThread";
import { Post } from "@models/Posts/Post";
import { Dispatch, SetStateAction, useState } from "react";
import { saveNewPostV2 } from "@models/Posts/createUtils";
import { useNewPost } from "@hooks/community/useNewPost";
import { UserInterface } from "@models/User/User";

interface Props {
  isOpen: boolean;
  onCloseModal: () => void;
  currentPost: Post;
  postRef: DocumentReference;
  signedInUser: UserInterface;
  communityId: string;
  eventId: string;
  gameId: string;
  setReplies: Dispatch<SetStateAction<number>>;
}

const ReplyModal: React.FC<Props> = ({
  isOpen,
  onCloseModal,
  signedInUser,
  currentPost,
  postRef,
  communityId,
  eventId,
  gameId,
  setReplies,
}) => {
  const [refresh, setRefresh] = useState<number>(0);

  const { newPost, onUpdateText } = useNewPost(
    communityId,
    "public",
    eventId,
    gameId,
    undefined,
    signedInUser.uid,
    signedInUser.name,
    signedInUser.profileImage,
    false,
    undefined,
    undefined,
    isOpen,
    undefined,
    undefined,
    undefined,
    undefined,
    // undefined,
    // undefined,
    // undefined,
    refresh
  );

  const [targetPost, setTargetPost] = useState<Post>(currentPost);
  const [targetPostRef, setTargetPostRef] =
    useState<DocumentReference>(postRef);

  const [targetViewLevel, setTargetViewLevel] = useState<
    "session" | "post" | "postReply"
  >("session");

  const onPost = async () => {
    // console.log("here", newPost);
    if (newPost && targetPostRef) {
      // console.log("here 2");
      await saveNewPostV2(targetPostRef, newPost);
      onUpdateText("");
      setRefresh((prev) => prev + 1);
      setReplies((prev) => prev + 1);
      // onCloseModal();
    }
  };

  const handleBack = () => {
    if (targetViewLevel === "session") {
      onCloseModal();
    } else {
      setTargetPost(currentPost);
      setTargetPostRef(postRef);
      setTargetViewLevel("session");
    }
  };

  const handleInput = (target: HTMLTextAreaElement) => {
    const targetDiv = document.getElementById("targetDiv");
    target.style.height = "32px";
    target.style.height = `${target.scrollHeight}px`;
    if (targetDiv) {
      targetDiv.style.height = `${target.clientHeight + 32}px`;
    }
  };

  // console.log("isOpen", isOpen, targetPost.id);

  return (
    <CreateModal
      onBackdrop={handleBack}
      onButtonPress={handleBack}
      isOpen={isOpen}
      heading=""
      onCloseModal={handleBack}
      bgData="bg-gradient-to-b from-[#F3F6F8] to-white fixed inset-0 z-50 w-full h-full mx-auto"
    >
      <div className="w-full h-full max-w-md overflow-y-scroll">
        <div className="sticky top-0 z-10 bg-[#F3F6F8] flex justify-between items-center p-2.5 iphoneX:p-4">
          <div className="cursor-pointer" onClick={handleBack}>
            <img
              src={`https://ik.imagekit.io/socialboat/Component_5_BYt6BOh13.png?ik-sdk-version=javascript-1.4.3&updatedAt=1650970656691`}
              alt="Back Icon"
              className="w-6 iphoneX:w-8"
            />
          </div>
          <UserImage
            image={signedInUser.profileImage}
            name={signedInUser.name}
            pointer="cursor-default"
            boxWidth="w-10 iphoneX:w-12"
            boxHeight="h-10 iphoneX:h-12"
          />
        </div>
        {targetViewLevel === "post" ? (
          <div className="flex items-center text-2xl px-4 py-2 bg-[#F2F2F7]">
            <img
              src={`https://ik.imagekit.io/socialboat/Vector_qKsbpfH0k.png?ik-sdk-version=javascript-1.4.3&updatedAt=1650984148032`}
              alt="Replies icon"
            />
            <p className="pl-4">Replies</p>
          </div>
        ) : null}
        <RepliesThread
          currentPost={targetPost}
          signedInUserId={signedInUser.uid}
          postRef={targetPostRef}
          numInitialElements={1}
          viewLevel={targetViewLevel}
          targetViewLevel={targetViewLevel}
          setTargetPost={setTargetPost}
          setTargetPostRef={setTargetPostRef}
          setTargetViewLevel={setTargetViewLevel}
        />
        <div id="targetDiv" style={{ height: "64px" }} />
        <div className="w-full fixed left-0 right-0 bottom-0 z-10 p-4 iphoneX:text-xl bg-[#F2F2F7] flex">
          <textarea
            className="flex-1 iphoneX:text-xl bg-transparent resize-none focus:outline-none placeholder:opacity-25 mr-5"
            placeholder="Type something"
            value={newPost?.text}
            onChange={(e) => onUpdateText(e.target.value)}
            onInput={(e) => handleInput(e.currentTarget)}
            style={{ height: "32px" }}
          />
          <div className="cursor-pointer" onClick={onPost}>
            <img
              src={`https://ik.imagekit.io/socialboat/Vector_P3TJayNFy.png?ik-sdk-version=javascript-1.4.3&updatedAt=1651827270724`}
              alt="send icon"
              className="w-6 iphoneX:w-8"
            />
          </div>
        </div>
      </div>
    </CreateModal>
  );
};

export default ReplyModal;
