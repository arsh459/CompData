import "react-circular-progressbar/dist/styles.css";
import { useNewReview } from "@hooks/community/useNewReview";
import CreateModal from "../../CreateModal/CreateModal";
import TopClose from "../../Feed/TopClose";
import ReviewForm from "./ReviewForm";
import LiveSelector from "../LiveSelector";
import FilterButton from "@templates/editEvent/Form/FilterButton";
import { saveReview } from "@models/Activities/createUtils";
import { Activity } from "@models/Activities/Activity";
import { DocumentReference } from "firebase/firestore";

interface Props {
  adminReview?: Activity;
  authorUID: string;
  postId: string;
  gameId?: string;
  postRef: DocumentReference;
  cohortId?: string;
  isOpen: boolean;
  heading: string;
  onCloseModal: () => void;
  editFlag?: boolean;
}

const ReviewModal: React.FC<Props> = ({
  postId,
  // communityId,
  postRef,
  isOpen,
  authorUID,
  // parentId,
  editFlag,
  cohortId,
  onCloseModal,
  heading,
  adminReview,
  gameId,
}) => {
  const {
    newReview,
    // updateNewReview,
    onUpdateCalories,
    onUpdateFitPoints,
    editingNow,
    setEditingNow,
    sessionTime,
    setReviewTime,
    onUpdateDistance,
    onUpdateTime,
    updateNotify,
    updateTaskId,
    onSelectName,
  } = useNewReview(
    // communityId,
    // eventId,
    gameId,
    postId,
    authorUID,
    isOpen,
    editFlag,
    adminReview,
    cohortId
  );

  console.log("new post", newReview?.postRef);
  // console.log("new post media", newPost?.media.length);

  const onPost = async () => {
    if (editingNow === "datetime") {
      setEditingNow("text");
    } else if (newReview) {
      await saveReview(newReview, sessionTime, postRef);
      onCloseModal();
    } else {
      onCloseModal();
    }
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
                <div className="p-4 pb-0"></div>
                <div className="p-4 pt-0 pb-0"></div>
              </>
            )}

            <div className="pl-4 pr-4 pb-4">
              {newReview && editingNow === "text" ? (
                <>
                  <ReviewForm
                    calories={newReview.calories}
                    fitPoints={newReview.fitPoints}
                    distance={newReview.distanceInMeters}
                    time={newReview.timeInSeconds}
                    taskId={newReview.taskId ? newReview.taskId : ""}
                    updateTaskId={updateTaskId}
                    setCalories={onUpdateCalories}
                    onSelectName={onSelectName}
                    notifyFlag={newReview.notifyUser === "PENDING"}
                    updateNotify={updateNotify}
                    setFitPoints={onUpdateFitPoints}
                    setDistance={onUpdateDistance}
                    setTime={onUpdateTime}
                  />
                  <div className="pl-2 flex">
                    <FilterButton
                      cancelVisible={sessionTime ? true : false}
                      onCancel={() => setReviewTime(null)}
                      buttonText={
                        sessionTime
                          ? `${sessionTime.toLocaleDateString("default", {
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
                </>
              ) : newReview && editingNow === "datetime" ? (
                <>
                  <div className="pt-2">
                    <LiveSelector
                      datetime={sessionTime}
                      onChange={setReviewTime}
                      pastAllow={true}
                      label="Set post"
                    />
                  </div>
                </>
              ) : null}

              <div className="mt-4 flex justify-between">
                <div className="flex">
                  {/* <PostIcons
                    onButtonPress={onUpdateSessionType}
                    selectedKey={newPost?.sessionType}
                  /> */}
                </div>
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  onClick={onPost}
                >
                  Review
                </button>
              </div>
            </div>
          </div>
        </>
      </CreateModal>
    </div>
  );
};

export default ReviewModal;
