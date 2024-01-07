import React, { useState } from "react";
import { TextField } from "@mui/material";
import { useWorkoutTask } from "@hooks/tasks/useWorkoutTask";
// import CloudinaryWidget from "@templates/editEvent/Form/CloudinaryWidget";
import { useTaskImage } from "@hooks/tasks/useTaskImage";
import { XIcon } from "@heroicons/react/solid";
import PostPreview from "./PostPreview";
import { useWorkoutTaskStreamById } from "@hooks/tasks/useWorkoutTaskStreamById";
import { getProgressFitPoint } from "@modules/PaymentPopover/utils";
import { useUserRank } from "@hooks/activities/userUserRank";
import BottomNavComV2 from "@templates/listing/Book/BottomNavComV2";
import { useNewPost } from "@hooks/community/useNewPost";
import { UserInterface } from "@models/User/User";
import { saveNewPost } from "@models/Posts/createUtils";
import Loading from "@components/loading/Loading";
import BackIcon from "public/icons/BackIcon";
import UppyWidgetContainer from "@components/Uppy/UppyWidgetContainer";

interface Props {
  streamId: string;
  taskId: string;
  uid: string;
  user: UserInterface;
  parentId: string;
  onGoToTeam: () => void;
  onBack: () => void;
}

const PostWorkoutScreen: React.FC<Props> = ({
  streamId,
  taskId,
  uid,
  user,
  parentId,
  onGoToTeam,
  onBack,
}) => {
  const [postStep, setPostStep] = useState<
    "preview" | "changeMedia" | "addDescription" | "loading"
  >("preview");
  const { task } = useWorkoutTask(taskId);
  const { userStream } = useWorkoutTaskStreamById(taskId, streamId);
  const { selfie } = useTaskImage(taskId, streamId);
  const { myUserRank } = useUserRank(parentId, uid);

  const {
    newPost,
    onUpdateText,
    onMediaUpload,
    onMediaDelete,
    processing,
    onRemoveById,
  } = useNewPost(
    myUserRank?.coachCommunityId ? myUserRank?.coachCommunityId : "",
    "public",
    myUserRank?.coachEventId ? myUserRank?.coachEventId : "",
    parentId,
    "",
    user.uid,
    user.name,
    user.profileImage,
    false,
    undefined,
    "",
    true,
    undefined,
    undefined,
    false,
    task?.id
    // userStream?.id,
    // selfie?.img,
    // userStream?.media
  );

  // useEffect(() => {}, [newPost?.media]);

  const { round } = getProgressFitPoint(
    userStream?.streamedSeconds,
    task?.durationMinutes
  );

  const onNext = async () => {
    if (postStep === "preview") {
      setPostStep("addDescription");
    } else if (postStep === "changeMedia") {
      setPostStep("addDescription");
    } else if (newPost) {
      setPostStep("loading");

      await saveNewPost(
        myUserRank?.coachEventId ? myUserRank?.coachEventId : "",
        newPost,
        task?.id,
        userStream?.id
      );
      onGoToTeam();
    }
  };

  const onLeave = () => {
    setPostStep("loading");
    onGoToTeam();
  };

  // console.log("new", newPost);

  return (
    <div className="p-4 pt-6">
      <div className="flex">
        {user.terraUser ? (
          <div className="p-2 bg-gray-200 rounded-full" onClick={onLeave}>
            <XIcon style={{ height: "35", width: "35", fill: "gray" }} />
          </div>
        ) : (
          <div className="pb-4" onClick={onBack}>
            <BackIcon style={{ height: "30", width: "30", fill: "gray" }} />
          </div>
        )}
      </div>

      <div className="pt-4 rounded ">
        <h2 className="font-bold text-gray-700 text-3xl">
          {user.terraUser ? "Post your workout" : "Submit for review"}
        </h2>
        <h2 className="text-gray-500 text-lg pt-2">
          {user.terraUser
            ? "Post with best pictures/content gets prizes every week"
            : "Post your workout to be reviewed. Add some pictures to and win prizes"}
        </h2>
      </div>

      <div className="pt-8">
        {postStep === "loading" || processing ? (
          <div className="w-full h-[50vh] flex justify-center items-center">
            <Loading fill="#ff735c" width={48} height={48} />
          </div>
        ) : postStep === "preview" ? (
          <PostPreview
            img={selfie?.img}
            media={userStream?.media}
            points={round}
            time={userStream?.streamedSeconds}
            activityName={task?.name}
            rank={myUserRank?.rank}
          />
        ) : postStep === "changeMedia" && newPost?.media ? (
          <UppyWidgetContainer
            media={newPost?.media}
            leftButtonText="Add media"
            uid={user.uid}
            screenName="workout"
            taskName={task?.name ? task.name : "workout task"}
            onDelete={onMediaDelete}
            onUpload={onMediaUpload}
            onRemove={onRemoveById}
            heading=""
            helperText=""
            height="none"
            filterButton={true}
            tileHeight="small"
            bgWhite={true}
            styles="rounded-none bg-red-500 border-none text-white"
            containerStyles="border border-dashed border-2 border-slate-500 bg-gray-100 h-64 flex justify-center items-center"
          />
        ) : postStep === "addDescription" ? (
          <TextField
            multiline={true}
            style={{ width: "100%" }}
            minRows={8}
            placeholder="A brief about workout..."
            value={newPost?.text}
            variant="outlined"
            onChange={(val) => onUpdateText(val.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        ) : null}
      </div>

      <div className="fixed bottom-0 left-0 right-0 md:hidden z-50">
        <BottomNavComV2
          cta={
            postStep === "preview"
              ? "Add Description"
              : postStep === "changeMedia"
              ? "Add Description"
              : "Post Workout"
          }
          onClick={onNext}
        />
      </div>

      {/* {renderActionBtns()} */}
    </div>
  );

  // let [step, setStep] = useState(0);

  // const { workout, onMediaDelete, onMediaUpload } = useWorkout();

  // console.log("workout", workout);

  // const setStepFn = (step: number) => {
  //   console.log(step);
  //   switch (step) {
  //     case 0:
  //       break;

  //     default:
  //       break;
  //   }
  //   setStep(step);
  // };

  // const renderView = () => {
  //   switch (step) {
  //     case 0:
  //       return (
  //         <>
  //           <div className="pt-4 rounded ">
  //             <h2 className="font-bold text-gray-700 text-3xl">
  //               Share your workout
  //             </h2>
  //             <h2 className="text-gray-500 text-lg pt-2">
  //               Post with best pictures/content gets prizes every week
  //             </h2>
  //           </div>

  //           <div className="pt-8">
  //             <CloudinaryWidget
  //               media={[workout?.workoutImages]}
  //               leftButtonText="Add media"
  //               onDelete={() => onMediaDelete()}
  //               onUpload={onMediaUpload}
  //               heading=""
  //               helperText=""
  //               height="none"
  //               filterButton={true}
  //               tileHeight="small"
  //               bgWhite={true}
  //               styles="rounded-none bg-red-500 border-none text-white"
  //               containerStyles=" border border-dashed border-2 border-slate-500 bg-gray-100 h-64 flex justify-center items-center"
  //             />
  //           </div>
  //         </>
  //       );
  //     case 1:
  //       return (
  //         <div className="h-56 rounded">
  //           <h3 className="font-bold text-xl py-3 px-1">
  //             Share your workout by adding some description to it.
  //           </h3>
  //           <div className="text-4xl mb-2 mt-5 text-gray-700">
  //             Add description
  //           </div>
  //           <textarea
  //             id="file-upload"
  //             title="Add description"
  //             className="border-2 boder-gray-600 w-full h-64 rounded"
  //           />
  //         </div>
  //       );
  //     default:
  //       break;
  //   }
  //   return null;
  // };

  // const renderActionBtns = () => {
  //   switch (step) {
  //     case 0:
  //       return (
  //         <div
  //           className={`flex justify-between items-center mt-10 text-2xl text-gray-600 p-4 absolute inset-x-0 bottom-0 `}
  //         >
  //           <div className="inline-flex items-center">
  //             <span
  //               className="text-3xl mr-3 bg-slate-400 px-4 py-4 rounded-full"
  //               onClick={onBack}
  //             >
  //               <LeftArrowIcon
  //                 style={{ height: "18", width: "18", fill: "white" }}
  //               />
  //             </span>
  //             <span>Back</span>
  //           </div>
  //           <div className="inline-flex items-center">
  //             Next
  //             <span
  //               className=" text-3xl ml-3 bg-slate-400 px-4 py-4 rounded-full"
  //               onClick={() => setStepFn((step += 1))}
  //             >
  //               <RightArrowIcon
  //                 style={{ height: "18", width: "18", fill: "white" }}
  //               />
  //             </span>
  //           </div>
  //         </div>
  //       );
  //     case 1:
  //       return (
  //         <div
  //           className={`flex justify-center items-center mt-10 text-3xl text-gray-600 p-4 absolute inset-x-0 bottom-40 `}
  //         >
  //           <div
  //             className="shadow rounded-full border border-gray-600 text-xl text-gray-600 flex items-center justify-center w-36 p-4 px-6 "
  //             onClick={() => onPostWorkoutFn()}
  //           >
  //             <span>Share</span>
  //             <span className="ml-3">
  //               <ShareIcon
  //                 style={{ height: "40", width: "40", fill: "gray" }}
  //               />
  //             </span>
  //           </div>
  //         </div>
  //       );
  //   }
  // };

  // return (
  //   <div className="p-4 pt-6">
  //     <div className="flex">
  //       <div className="p-2 bg-gray-200 rounded-full" onClick={onBack}>
  //         <XIcon style={{ height: "35", width: "35", fill: "gray" }} />
  //       </div>
  //     </div>
  //     {renderView()}
  //     {/* {renderActionBtns()} */}
  //   </div>
  // );
};

export default PostWorkoutScreen;
