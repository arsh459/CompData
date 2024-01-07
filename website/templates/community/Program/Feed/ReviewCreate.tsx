import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
// import CloudinaryWidget from "@templates/editEvent/Form/CloudinaryWidget";
import "react-circular-progressbar/dist/styles.css";
import { useNewPost } from "@hooks/community/useNewPost";
import { saveNewPostV2, updateCurrentPost } from "@models/Posts/createUtils";
import CreateModal from "../CreateModal/CreateModal";
import PostText from "../PostText";
import TopClose from "./TopClose";
import { Post } from "@models/Posts/Post";
import TopPostHeader from "../Post/TopHeader/TopHeader";
import PostContentWrapper from "../Post/Content/PostContentWrapper";
import { DocumentReference } from "@firebase/firestore";
import UppyWidgetContainer from "@components/Uppy/UppyWidgetContainer";
// import PostIcons from "../Post/PostIcons";

interface Props {
  postRef?: DocumentReference;
  communityId?: string;
  isOpen: boolean;
  heading: string;
  onCloseModal: () => void;
  eventId?: string;
  gameId?: string;
  userName?: string;
  view: "public" | "private";
  creatorImg?: CloudinaryMedia | AWSMedia;
  byAdmin?: boolean;
  score?: number;
  parentSessionName?: string;
  allowScore?: boolean;
  selectedCohortId: string;
  editingPost?: Post;

  replyingTo: {
    authorUID?: string;
    authorName?: string;
    authorImg?: CloudinaryMedia | AWSMedia;
    text?: string;
    createdOn: number;
    dayNumber?: number;
    sessionName?: string;
  };

  authorDetails: {
    uid?: string;
    name?: string;
    img?: CloudinaryMedia | AWSMedia;
  };

  editFlag?: boolean;
}

const ReviewCreate: React.FC<Props> = ({
  postRef,
  communityId,
  isOpen,
  onCloseModal,
  heading,
  eventId,
  view,
  byAdmin,
  score,
  parentSessionName,
  selectedCohortId,
  replyingTo,
  authorDetails,
  editingPost,
  editFlag,
  gameId,
}) => {
  const {
    newPost,
    onUpdateText,
    onMediaDelete,
    onMediaUpload,
    onRemoveById,
    // onUpdateSessionType,
  } = useNewPost(
    communityId,
    view,
    eventId,
    gameId ? gameId : "",
    selectedCohortId,
    authorDetails.uid,
    authorDetails.name,
    authorDetails.img,
    byAdmin,
    score,
    parentSessionName,
    isOpen,
    undefined,
    editingPost,
    editFlag
  );

  // console.log("author", authorDetails);
  // console.log("new post media", newPost);

  const onPost = async () => {
    if (newPost && postRef && !editFlag) {
      await saveNewPostV2(postRef, newPost);
    } else if (newPost && postRef && editFlag) {
      await updateCurrentPost(postRef, newPost);
    }
    onCloseModal();
  };

  return (
    <div className="">
      <CreateModal
        isOpen={isOpen}
        onBackdrop={onCloseModal}
        onCloseModal={onCloseModal}
        heading={heading}
        onButtonPress={() => {}}
      >
        <>
          <div className="pt-4 pl-2 pr-2">
            <div className="pb-2 pl-2 cursor-pointer">
              <TopClose onCloseModal={onCloseModal} />
            </div>
            {editFlag ? null : (
              <>
                <div className="p-4 pb-0">
                  <TopPostHeader
                    viewerUID={""}
                    // onProfileNameClick={() => {}}
                    authorUID={replyingTo.authorUID ? replyingTo.authorUID : ""}
                    onCommentClick={() => {}}
                    authorName={replyingTo.authorName}
                    authorImage={replyingTo.authorImg}
                    viewLevel="session"
                    communityId={communityId}
                  />
                  <PostContentWrapper
                    onClick={() => {}}
                    text={replyingTo.text}
                    pin={true}
                    viewLevel={"session"}
                    lineClamp={2}
                    postView={view}
                    isViewerOwner={false}
                  />
                </div>
                <div className="p-4 pt-0 pb-0">
                  <div className="pl-1 flex items-center pb-2">
                    <p className="text-xl">👇</p>
                    <p className="text-gray-500 text-sm pl-2">
                      Replying to{" "}
                      {replyingTo.authorName
                        ? replyingTo.authorName
                        : "Boat user"}
                    </p>
                  </div>
                </div>
              </>
            )}

            <div className="pl-4 pr-4 pb-4">
              {newPost ? (
                <>
                  <PostText
                    name={authorDetails.name}
                    img={authorDetails.img}
                    text={newPost.text}
                    onChangeText={onUpdateText}
                  />

                  <UppyWidgetContainer
                    media={newPost.media}
                    leftButtonText="Add media"
                    onDelete={onMediaDelete}
                    uid={authorDetails.uid ? authorDetails.uid : "noUser"}
                    onUpload={onMediaUpload}
                    onRemove={onRemoveById}
                    screenName="post_feed"
                    taskName="post"
                    heading=""
                    tileHeight="small"
                    helperText=""
                    height="none"
                    filterButton={true}
                    bgWhite={true}
                  />
                </>
              ) : null}

              <div className="mt-2 flex justify-end">
                {/* <div className="flex">
                  <PostIcons
                    onButtonPress={onUpdateSessionType}
                    selectedKey={newPost?.sessionType}
                  />
                </div> */}
                <button
                  type="button"
                  className="inline-flex justify-center px-8 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  onClick={onPost}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </>
      </CreateModal>
    </div>
  );
};

export default ReviewCreate;
