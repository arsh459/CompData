import { useNewCampaignPost } from "@hooks/campaign/useNewCampaignPost";
import CreateModal from "@templates/community/Program/CreateModal/CreateModal";
import TopClose from "@templates/community/Program/Feed/TopClose";
import Divider from "@components/divider/Divider";
import PostTextField from "@templates/community/Program/PostTextField";
// import CloudinaryWidget from "@templates/editEvent/Form/CloudinaryWidget";
import clsx from "clsx";
import { saveCampaignPost } from "@models/Event/createCampaignUtils";
import { CampaignPost } from "@models/Event/Campaign";

interface Props {
  isOpen: boolean;
  onCloseModal: () => void;
  onBackdrop: () => void;
  onButtonPress: () => void;
  eventId?: string;
  uid: string;
  editingPost?: CampaignPost;
  editFlag?: boolean;
}

const CampaignCreateModal: React.FC<Props> = ({
  isOpen,
  onCloseModal,
  onBackdrop,
  onButtonPress,
  eventId,
  uid,
  editingPost,
  editFlag,
}) => {
  const {
    newPost,
    onCaptionUpdate,
    onTagUpdate,
    onHashtagUpdate,
    // onMediaDelete,
    // onMediaUpload,
  } = useNewCampaignPost(eventId, uid, isOpen, editingPost, editFlag);

  const saveCampaignPostInEvent = async () => {
    if (newPost) {
      onCloseModal();
      await saveCampaignPost(newPost, newPost.eventId);
    }
  };

  return (
    <CreateModal
      onBackdrop={onBackdrop}
      onButtonPress={onButtonPress}
      isOpen={isOpen}
      heading=""
      onCloseModal={onCloseModal}
    >
      <div className="px-4 py-4 max-h-[75vh] overflow-y-auto relative">
        <div>
          <div className="pb-2 cursor-pointer">
            <TopClose onCloseModal={onCloseModal} />
          </div>
          <div>
            <Divider />
          </div>

          <div className="pt-2">
            <PostTextField
              text={newPost?.caption}
              placeholder="Caption"
              onChangeText={onCaptionUpdate}
              multiline={true}
              label="Caption"
            />
          </div>

          <div className="pt-2">
            <PostTextField
              text={newPost?.tags}
              placeholder="Tags"
              onChangeText={onTagUpdate}
              multiline={false}
              label="Tags"
            />
          </div>

          <div className="pt-2">
            <PostTextField
              text={newPost?.hashtags}
              placeholder="Hashtags"
              onChangeText={onHashtagUpdate}
              multiline={false}
              label="Hashtags"
            />
          </div>

          <div
            className={clsx(
              "pt-2",
              newPost?.media && newPost?.media?.length > 0 ? "h-40" : "h-24"
            )}
          >
            {/* <CloudinaryWidget
              media={newPost?.media ? newPost.media : []}
              leftButtonText="Add media"
              onDelete={onMediaDelete}
              onUpload={onMediaUpload}
              heading=""
              helperText=""
              height="none"
              filterButton={true}
              tileHeight="small"
              bgWhite={true}
            /> */}
          </div>

          <div className="mt-4 z-50 flex justify-end fixed bottom-4 right-4">
            <button
              type="button"
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
              onClick={saveCampaignPostInEvent}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </CreateModal>
  );
};

export default CampaignCreateModal;
