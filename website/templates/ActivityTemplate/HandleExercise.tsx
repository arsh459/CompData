import UppyWidget from "@components/Uppy";

import { AWSMedia } from "@models/Media/cloudinaryUpload";
import { Exercise, Task } from "@models/Tasks/Task";
import { Button, Checkbox, TextField } from "@mui/material";
import MediaTile from "@templates/listing/HeaderImage/MediaTile";
import React, { useState } from "react";
interface Props {
  task: Task;
  addExercise: (val: Exercise) => void;
  removeExercise: (val: Exercise) => void;
  uid: string;
}
const HandleExercise: React.FC<Props> = ({
  task,
  addExercise,
  removeExercise,
  uid,
}) => {
  const [exerciseData, setExerciseData] = useState<Exercise>({
    exerciseName: "",

    exerciseMedia: undefined,
    fp: undefined,
    isSaved: false,
  });
  //   console.log(task.equipmentNeeded);

  const onHandleExerciseFields = () => {
    addExercise(exerciseData);
    setExerciseData({
      exerciseName: "",
      exerciseMedia: undefined,
    });
  };

  const onMediaUpload = (newFiles: AWSMedia[]) => {
    setExerciseData((prev) => ({
      ...prev,
      exerciseMedia: newFiles.length ? newFiles[0] : undefined,
    }));
  };

  const onMediaDelete = (newFiles: string) => {
    setExerciseData((prev) => ({
      ...prev,
      exerciseMedia: undefined,
    }));
  };
  const handleInput = (
    value: string | boolean,
    key: "exerciseName" | "exerciseMedia" | "fp" | "isSaved"
  ) => {
    setExerciseData((prev) => ({
      ...prev,
      [key]: key === "fp" ? parseInt(value as string) : value,
    }));
  };
  return (
    <div className="mt-2 border-dashed border-2 border-red-500 ">
      <p className="text-lg text-gray-700">Exercise Field Table</p>

      <div>
        <UppyWidget
          onUpload={onMediaUpload}
          uid={uid}
          onRemove={onMediaDelete}
          styles="rounded-none bg-red-500 border-dash w-1/2 m-2 text-white"
          filterButton={true}
          leftButtonText="Add Exercise Media"
          screenName="admin"
          taskName="admin"
        />
      </div>
      <div className="w-4 aspect-1 m-2 bg-black">
        {exerciseData?.exerciseMedia ? (
          <MediaTile
            media={exerciseData.exerciseMedia}
            alt="execise media"
            height={20}
            width={20}
          />
        ) : null}
      </div>
      <div className="pt-4">
        <TextField
          style={{ width: "100%" }}
          placeholder={"Exercise in Video"}
          label={"Exercise Name"}
          multiline={true}
          minRows={1}
          variant="outlined"
          onChange={(val) => handleInput(val.target.value, "exerciseName")}
          value={exerciseData.exerciseName || ""}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div className="py-4">
        <TextField
          style={{ width: "100%" }}
          placeholder={"Fp of this activity"}
          label={"Fp"}
          variant="outlined"
          onChange={(val) => handleInput(val.target.value, "fp")}
          value={exerciseData.fp || 0}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div className="pr-4 flex items-center">
        <Checkbox
          color="primary"
          checked={exerciseData.isSaved ? true : false}
          onChange={() => handleInput(!exerciseData?.isSaved, "isSaved")}
        />
        <p className="text-gray-700">isSaved?</p>
      </div>
      <Button>
        <div
          onClick={onHandleExerciseFields}
          className="text-black font-bold border p-2"
        >
          Add Exercises
        </div>
      </Button>
      <div className="flex rounded-lg  overflow-x-scroll">
        {task?.exercises?.map((i, index) => {
          return (
            <div key={`${i.exerciseName}-${index}`} className="m-2 relative">
              <div onClick={() => removeExercise(i)}>❌</div>
              <div className="p-2 border-2">
                {i?.exerciseMedia ? (
                  <div className="w-4 aspect-1 m-2 bg-black">
                    <MediaTile
                      media={i.exerciseMedia}
                      alt="equipment icon"
                      height={20}
                      width={20}
                    />
                  </div>
                ) : null}
                <p>exerciseName:{i.exerciseName}</p>
                <p>fp:{i.fp}</p>
                <p>isSaved:{i.isSaved ? "true" : "false"}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HandleExercise;
