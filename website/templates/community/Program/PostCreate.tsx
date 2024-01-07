import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";
// import CloudinaryWidget from "@templates/editEvent/Form/CloudinaryWidget";
import PostText from "./PostText";
import { useNewPost } from "@hooks/community/useNewPost";
import { saveNewPost } from "@models/Posts/createUtils";
import UppyWidgetContainer from "@components/Uppy/UppyWidgetContainer";

interface Props {
  isOpen: boolean;
  heading: string;
  onCloseModal: () => void;
  postPostSubmittsion: () => void;
  eventId: string;
  userId: string;
  userName?: string;
  view: "public" | "private";
  creatorImg?: CloudinaryMedia;
  byAdmin?: boolean;
  score?: number;
  communityId: string;
  sessionId?: string;
  sessionName?: string;
  selectedCohortId: string;
}

const PostCreate: React.FC<Props> = ({
  isOpen,
  onCloseModal,
  heading,
  eventId,
  selectedCohortId,
  view,
  userId,
  userName,
  creatorImg,
  byAdmin,
  score,
  communityId,
  postPostSubmittsion,
  sessionId,
  sessionName,
}) => {
  const { newPost, onUpdateText, onMediaDelete, onMediaUpload, onRemoveById } =
    useNewPost(
      communityId,
      view,
      eventId,
      "",
      selectedCohortId,
      userId,
      userName,
      creatorImg,
      byAdmin,
      score,
      // sessionId,
      sessionName
    );

  const onPost = async () => {
    if (newPost) {
      await saveNewPost(eventId, newPost);
      postPostSubmittsion();
    }
    onCloseModal();
  };

  return (
    <div className="">
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={onCloseModal}
        >
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg text-center font-medium leading-6 text-gray-900"
                >
                  {heading}
                  {sessionName ? ` > ${sessionName}` : ""}
                </Dialog.Title>
                {/* <div className="mt-2">
                  <p className="text-sm text-gray-500"></p>
                </div> */}

                {newPost ? (
                  <>
                    <div>
                      <UppyWidgetContainer
                        media={newPost.media}
                        uid={userId}
                        leftButtonText="Add media"
                        onDelete={onMediaDelete}
                        onUpload={onMediaUpload}
                        onRemove={onRemoveById}
                        heading=""
                        helperText=""
                        height="none"
                        // multiple={false}
                        // maxFiles={1}
                        screenName="dep"
                        taskName="dep"
                        filterButton={true}
                        bgWhite={true}
                      />
                    </div>

                    <div className="pt-4">
                      <PostText
                        text={newPost.text}
                        onChangeText={onUpdateText}
                      />
                    </div>
                  </>
                ) : null}

                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={onPost}
                  >
                    Post
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default PostCreate;
