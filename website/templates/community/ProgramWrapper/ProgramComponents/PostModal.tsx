import Typewriter from "typewriter-effect";
import { Dispatch, SetStateAction } from "react";
import clsx from "clsx";
import UppyWidget from "@components/Uppy";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import MediaFile from "@templates/editEvent/Form/MediaGrid/MediaFile";
import { useNewPost } from "@hooks/community/useNewPost";
import { saveNewPost } from "@models/Posts/createUtils";
import { weEventTrack } from "@analytics/webengage/user/userLog";
import { Post } from "@models/Posts/Post";
import {
  // where,
  DocumentReference,
  // startAfter,
} from "firebase/firestore";

interface Props {
  isOpen: boolean;
  onCloseModal: () => void;
  signedInUserId?: string;

  eventId: string;
  communityId?: string;
  authorName: string;
  gameId: string;
  authorImage?: CloudinaryMedia | AWSMedia;
  editingPost?: Post;
  canAlterMedia?: boolean;
  setPosts: Dispatch<SetStateAction<{ post: Post; ref: DocumentReference }[]>>;
}

const PostModal: React.FC<Props> = ({
  isOpen,
  onCloseModal,
  signedInUserId,

  eventId,
  communityId,
  authorName,
  authorImage,
  gameId,
  editingPost,
  canAlterMedia,
  setPosts,
}) => {
  const { newPost, onUpdateText, onMediaDelete, onMediaUpload } = useNewPost(
    communityId,
    "public",
    eventId,
    gameId,
    undefined,
    signedInUserId,
    authorName,
    authorImage,
    signedInUserId === communityId,
    undefined,
    "",
    isOpen,
    undefined,
    editingPost,
    editingPost?.id ? true : false
  );

  // console.log("newPost", newPost);

  const savePost = async () => {
    if (newPost && !newPost.text && !newPost.media.length) {
      return;
    } else if (newPost) {
      await saveNewPost(
        eventId,
        { ...newPost, view: "public" },
        undefined,
        undefined,
        editingPost?.id ? true : false,
        setPosts
      );
      onCloseModal();

      if (!editingPost?.id) {
        console.log("scrolling to top");
        // scroll to top
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 200);
      }
    }
    weEventTrack("gameCommunity_postPost", {});
  };

  // const [text, setText] = useState<string>("");
  // const [media, setMedia] = useState<(CloudinaryMedia | AWSMedia)[]>([]);

  const words = [
    "Cycled for 50kms 🚴",
    "Did a handstand for 45secs ⏱️",
    "100kg deadlift! Feeling 💪 ",
    "Join me for a run! 🏃‍♀️",
  ];

  // const onMediaUpload = (newFiles: (CloudinaryMedia | AWSMedia)[]) => {
  //   setMedia((prev) => [...prev, ...newFiles]);
  // };

  // const onMediaDelete = (toDelete: CloudinaryMedia | AWSMedia) => {
  //   setMedia((prev) => [...prev.filter((item) => item.id !== toDelete.id)]);
  // };

  return (
    <div
      className={clsx(
        "fixed inset-0 z-50 transition-transform",
        "flex flex-col bg-[#EEEEEE]/[85%] backdrop-blur-xl",
        isOpen ? "" : "translate-y-full"
      )}
    >
      <div className="flex justify-between items-center p-4">
        <div className="cursor-pointer" onClick={onCloseModal}>
          <img
            src={`https://ik.imagekit.io/socialboat/Component_5_BYt6BOh13.png?ik-sdk-version=javascript-1.4.3&updatedAt=1650970656691`}
            alt="Back Icon"
            className="w-6 iphoneX:w-8"
          />
        </div>
        <button
          onClick={savePost}
          className="w-max text-white text-sm iphoneX:text-xl rounded-full px-8 py-1 bg-gradient-to-r from-[#F29C39] to-[#F98258]"
        >
          Post
        </button>
      </div>
      <div className="flex-1 m-4 relative">
        <textarea
          value={newPost?.text}
          placeholder="How was your experience"
          onChange={(e) => onUpdateText(e.target.value)}
          className={clsx(
            "w-full h-full p-2 text-lg resize-none bg-transparent text-[#7D7D7D] peer",
            "placeholder:opacity-0 focus:outline-none focus:placeholder:opacity-50"
          )}
        />
        <div
          className={clsx(
            "text-sm iphoneX:text-lg opacity-50 absolute top-2 left-2 text-[#7D7D7D] pointer-events-none peer-focus:hidden",
            newPost?.text === "" ? "" : "hidden"
          )}
        >
          <Typewriter
            options={{
              strings: words,
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      {newPost?.media && newPost?.media.length > 0 ? (
        <div className="h-px bg-[#7D7D7D]" />
      ) : null}
      {newPost?.media && newPost?.media.length > 0 ? (
        <div className="flex flex-wrap p-4">
          {newPost?.media.map((el, index) => {
            if (el)
              return (
                <div key={el.id}>
                  <div>
                    <MediaFile
                      selected={false}
                      mediaElement={el}
                      tileHeight="small"
                      onDelete={canAlterMedia ? onMediaDelete : undefined}
                      index={index}
                    />
                  </div>
                </div>
              );
          })}
        </div>
      ) : null}
      {signedInUserId ? <div className="h-px bg-[#7D7D7D]" /> : null}
      {signedInUserId && canAlterMedia ? (
        <div
          className="flex justify-center items-center p-4"
          onClick={() => weEventTrack("gameCommunity_addMedia", {})}
        >
          <UppyWidget
            uid={signedInUserId}
            onUpload={onMediaUpload}
            screenName="community"
            taskName="post"
          >
            <div className="w-max flex justify-center items-center cursor-pointer">
              <img
                src={`https://ik.imagekit.io/socialboat/Group_ZIQuYlrkO.png?ik-sdk-version=javascript-1.4.3&updatedAt=1651573047413`}
                alt="image icon"
                className="w-6 iphoneX:w-8"
              />
              <p className="pl-4 text-[#7D7D7D] text-sm iphoneX:text-base">
                Add Media
              </p>
            </div>
          </UppyWidget>
        </div>
      ) : null}
    </div>
  );
};

export default PostModal;
