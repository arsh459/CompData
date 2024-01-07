import Divider from "@components/divider/Divider";
import UppyWidgetContainer from "@components/Uppy/UppyWidgetContainer";
import { useNewPost } from "@hooks/community/useNewPost";
import { sessionTypes } from "@models/Event/Event";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { saveNewPost } from "@models/Posts/createUtils";
import { Post } from "@models/Posts/Post";
// import CloudinaryWidget from "@templates/editEvent/Form/CloudinaryWidget";
// import FilterButton from "@templates/editEvent/Form/FilterButton";
// import CreateModal from "../CreateModal/CreateModal";
import TopClose from "../Feed/TopClose";
import PostText from "../PostText";
import LiveSelector from "./LiveSelector";
import mixpanel from "@config/mixpanel";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  eventId: string;
  cohortId?: string;
  communityId: string;
  authorName: string;
  gameId: string;
  //   onBackdrop: () => void;
  authorUID: string;
  authorImage?: CloudinaryMedia | AWSMedia;
  initalSessionType: sessionTypes;
  heading?: string;
  submitOverride?: (newPost: Post) => void;
  liveAbsent?: boolean;
}

const PostCreateModalContent: React.FC<Props> = ({
  isOpen,
  onClose,
  gameId,
  authorUID,
  authorName,
  authorImage,
  initalSessionType,
  eventId,
  cohortId,
  communityId,
  heading,
  submitOverride,
  liveAbsent,
}) => {
  const {
    newPost,
    onUpdateText,
    onMediaUpload,
    onMediaDelete,
    onRemoveById,
    // onUpdateSessionType,
    sessionStart,
    setSessionStart,
    editingNow,
    setEditingNow,
  } = useNewPost(
    communityId,
    "public",
    eventId,
    gameId,
    cohortId,
    authorUID,
    authorName,
    authorImage,
    authorUID === communityId,
    undefined,
    // "",
    "",
    isOpen,
    initalSessionType
  );

  // console.log("newPost here", newPost);

  const saveSession = async () => {
    if (editingNow === "datetime") {
      setEditingNow("text");
      return;
    } else if (submitOverride && newPost) {
      submitOverride(newPost);
      return;
    } else if (newPost && sessionStart) {
      await saveNewPost(eventId, {
        ...newPost,
        scheduledOnTime: sessionStart?.getTime(),
        sessionType: "live",
      });
    } else if (newPost && !newPost.text && !newPost.media.length) {
      return;
    } else if (newPost) {
      await saveNewPost(eventId, newPost);
    }

    try {
      mixpanel.track("submit_post", {
        text_length: newPost?.text.length,
        media_length: newPost?.media.length,
      });
    } catch (error) {}

    onClose();
  };
  //   console.log("new", newSession);

  return (
    <div className="px-4 py-4 max-h-[75vh] overflow-y-auto relative">
      <div>
        <div className="pb-2 pl-2 cursor-pointer">
          <TopClose onCloseModal={onClose} />
        </div>
        <div>
          <Divider />
        </div>
        {editingNow === "text" ? (
          <div className="pt-4">
            <PostText
              img={authorImage}
              placeholder={heading}
              name={authorName}
              text={newPost?.text ? newPost?.text : ""}
              onChangeText={onUpdateText}
            />

            <div className="">
              <UppyWidgetContainer
                media={newPost?.media ? newPost.media : []}
                uid={authorUID}
                leftButtonText="Add Workout image"
                screenName="post_feed_dep"
                taskName="post"
                onDelete={onMediaDelete}
                onUpload={onMediaUpload}
                onRemove={onRemoveById}
                heading=""
                helperText=""
                height="none"
                filterButton={true}
                tileHeight="small"
                bgWhite={true}
              />
              {/* {liveAbsent ? null : (
                  <div className="pl-2">
                    <FilterButton
                      cancelVisible={sessionStart ? true : false}
                      onCancel={() => setSessionStart(null)}
                      buttonText={
                        sessionStart
                          ? `${sessionStart.toLocaleDateString("default", {
                              hour12: true,
                              hour: "numeric",
                              minute: "2-digit",
                              day: "numeric",
                              month: "short",
                              // weekday: "short",
                            })}`
                          : "Add Live time"
                      }
                      onPress={() => setEditingNow("datetime")}
                    />
                  </div>
                )} */}
              {/* </onRemoveById> */}
            </div>
          </div>
        ) : editingNow === "datetime" && !liveAbsent ? (
          <div>
            <LiveSelector
              datetime={sessionStart}
              label="Start time"
              onChange={setSessionStart}
            />
          </div>
        ) : null}
      </div>
      <div className="mt-4 flex justify-end">
        <button
          type="button"
          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
          onClick={saveSession}
        >
          {editingNow === "datetime" ? "Confirm" : "Post"}
        </button>
      </div>
    </div>
  );
};

export default PostCreateModalContent;
