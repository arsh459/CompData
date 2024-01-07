import { useState } from "react";
import { useRouter } from "next/router";
import { TextField } from "@mui/material";
import { UserInterface } from "@models/User/User";
import { saveNewTask } from "@models/Tasks/createUtils";
import BottomNavComV2 from "@templates/listing/Book/BottomNavComV2";
import { mediatype, useTask } from "@hooks/tasks/useTask";
import { useTaskParams } from "@hooks/tasks/useTaskParams";
import Loading from "@components/loading/Loading";
import BackIcon from "../../public/icons/BackIcon";
import { TaskTypes } from "@models/Tasks/Task";
import MediaContainer from "./MediaContainer";
import CommonFields from "./V2/CommonFields";
import WorkoutFields from "./V2/WorkoutFields";
import WorkoutPathLiveFields from "./V2/WorkoutPathLiveFields";
import PathFields from "./V2/PathFields";
import LiveFields from "./V2/LiveFields";
import NutritionFields from "./V2/NutritionFields";
import SubTaskElements from "./SubTaskElements";

const getMediaArr = (isReel?: boolean, taskType?: TaskTypes) => {
  let arr: mediatype[] = [];

  if (isReel || taskType === "nutrition") {
    arr = [...arr, "reelMedia", "reelThumbnail"];
  }

  switch (taskType) {
    case "workout":
      arr = [
        ...arr,
        "specialityIcon",
        "avatar",
        "lowResMedia",
        "videoThumbnail",
        "previewMedia",
        "thumbnails",
      ];
      break;
    case "nutrition":
    case "path":
    case "live":
      arr = [
        ...arr,
        "specialityIcon",
        "avatar",
        "videoThumbnail",
        "thumbnails",
      ];
      break;
  }

  return arr;
};
interface Props {
  user: UserInterface;
}

const AddWorkoutTemplate: React.FC<Props> = ({ user }) => {
  const { id, gptGenerated } = useTaskParams();

  const {
    task,
    onMediaDelete,
    onMediaUpload,
    onUpdateDifficultyLevel,
    onhandleAwardsLevel,
    onOrientationUpdate,
    onUpdateTaskType,
    onUpdateCoords,
    onUpdateNutriFacts,
    addEquipment,
    removeEquipment,
    addExercise,
    removeExercise,
    onUpdateMealTypes,
    addSteps,
    removeSteps,
    addIngredients,
    removeIngredients,
    addSubTaskEle,
    removeSubTaskEle,
    editSubTaskEle,
    addTags,
    removeTags,
    onBoolUpdate,
    onStringUpdate,
    onNumberUpdate,
    onUpdateDishCategory,
  } = useTask(user.uid, id, gptGenerated);

  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const onSave = async () => {
    if (loading === false) {
      setLoading(true);

      if (task) {
        try {
          onhandleAwardsLevel();
          await saveNewTask(task, gptGenerated);
          router.back();
        } catch (error) {
          console.log("error", error);
        }
      }
    }
  };

  return (
    <div className="p-4 pt-8">
      <div className="pb-3">
        <p className="text-gray-700 text-4xl font-semibold flex items-center">
          <span onClick={() => router.back()}>
            <BackIcon style={{ height: "30", width: "30", fill: "gray" }} />{" "}
          </span>
          &nbsp; Add Task
        </p>
      </div>
      <hr />
      <>
        <p className="text-base font-medium py-4 pb-1">ID: {id}</p>
        {task?.gptGeneratedNutrition ? (
          <p className="text-red-500 pb-4">GPT GENERATED</p>
        ) : (
          <p className="text-green-500 pb-4">MANUAL</p>
        )}
        {loading ? (
          <div className="pt-4">
            <div className="flex justify-center items-center">
              <Loading fill="#ff735c" width={48} height={48} />
            </div>
          </div>
        ) : (
          <div className="pt-4 pb-24">
            <CommonFields
              task={task}
              onNumberUpdate={onNumberUpdate}
              onUpdateTaskType={onUpdateTaskType}
              onStringUpdate={onStringUpdate}
              onBoolUpdate={onBoolUpdate}
              addTags={addTags}
              removeTags={removeTags}
              gptGenerated={gptGenerated}
            />

            {user ? (
              <MediaContainer
                user={user}
                task={task}
                collectionArray={getMediaArr(task?.isReel, task?.taskType)}
                onMediaDelete={onMediaDelete}
                onMediaUpload={onMediaUpload}
              />
            ) : null}

            {task?.taskType === "workout" ||
            task?.taskType === "path" ||
            task?.taskType === "live" ? (
              <WorkoutPathLiveFields
                task={task}
                onBoolUpdate={onBoolUpdate}
                onNumberUpdate={onNumberUpdate}
                onStringUpdate={onStringUpdate}
                addEquipment={addEquipment}
                removeEquipment={removeEquipment}
                onUpdateDifficultyLevel={onUpdateDifficultyLevel}
              />
            ) : null}

            {task?.taskType === "workout" || task?.taskType === "nutrition" ? (
              <SubTaskElements
                task={task}
                addSubTaskEle={addSubTaskEle}
                removeSubTaskEle={removeSubTaskEle}
                editSubTaskEle={editSubTaskEle}
                isExercise={task?.taskType === "workout"}
              />
            ) : null}

            {task?.taskType === "workout" || task?.taskType === "live" ? (
              <div className="pt-8">
                <TextField
                  style={{ width: "100%" }}
                  placeholder={"Duration of the workout"}
                  label={"Duration in minutes"}
                  variant="outlined"
                  onChange={(e) =>
                    onNumberUpdate("durationMinutes", e.target.value)
                  }
                  value={task?.durationMinutes || 0}
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
            ) : null}

            {task?.taskType === "workout" ? (
              <WorkoutFields
                uid={user.uid}
                task={task}
                onNumberUpdate={onNumberUpdate}
                onStringUpdate={onStringUpdate}
                onOrientationUpdate={onOrientationUpdate}
                addExercise={addExercise}
                removeExercise={removeExercise}
              />
            ) : task?.taskType === "nutrition" ? (
              <NutritionFields
                task={task}
                onStringUpdate={onStringUpdate}
                onNumberUpdate={onNumberUpdate}
                onUpdateMealTypes={onUpdateMealTypes}
                addIngredients={addIngredients}
                removeIngredients={removeIngredients}
                addSteps={addSteps}
                removeSteps={removeSteps}
                onUpdateNutriFacts={onUpdateNutriFacts}
                onUpdateDishCategory={onUpdateDishCategory}
              />
            ) : task?.taskType === "path" ? (
              <PathFields
                task={task}
                onNumberUpdate={onNumberUpdate}
                onUpdateCoords={onUpdateCoords}
              />
            ) : task?.taskType === "live" ? (
              <LiveFields
                task={task}
                onStringUpdate={onStringUpdate}
                onNumberUpdate={onNumberUpdate}
              />
            ) : null}
          </div>
        )}
      </>

      <div className="fixed bottom-0 left-0 right-0 z-50">
        <BottomNavComV2 cta={"Save Activity"} onClick={onSave} />
      </div>
    </div>
  );
};

export default AddWorkoutTemplate;
