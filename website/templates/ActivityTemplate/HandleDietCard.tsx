import { v4 as uuidv4 } from "uuid";

import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { DietCard, Task } from "@models/Tasks/Task";
import { Button, TextField } from "@mui/material";
import MediaTile from "@templates/listing/HeaderImage/MediaTile";
import React, { useCallback, useState } from "react";
import UppyWidgetContainer from "@components/Uppy/UppyWidgetContainer";

interface Props {
  task: Task;
  addDietCard: (val: DietCard) => void;
  removeDietCard: (val: string) => void;
  updateDietCard: (val: DietCard) => void;
  uid: string;
}

const HandleDietCard: React.FC<Props> = ({
  task,
  addDietCard,
  removeDietCard,
  updateDietCard,
  uid,
}) => {
  const [dietCardData, setDietCardData] = useState<DietCard>({
    taskName: "",
    taskMedia: undefined,
    fp: undefined,
    // isSaved: false,
    id: "",
  });

  const [editingDietCardId, setEditingDietCardId] = useState("");

  const onHandleDietCardFields = () => {
    if (editingDietCardId) {
      const existingDietCard = task.dietCards?.find(
        (d) => d.id === editingDietCardId
      );
      if (existingDietCard) {
        updateDietCard({
          ...existingDietCard,
          ...dietCardData,
        });
      }
      setEditingDietCardId("");
    } else {
      addDietCard({ ...dietCardData, id: uuidv4() });
    }
    setDietCardData({
      taskName: "",
      taskMedia: undefined,
      fp: undefined,
      // isSaved: false,
      id: "",
    });
  };

  const handleInput = (
    value: string | boolean,
    key: "taskName" | "taskMedia" | "fp" | "isSaved"
  ) => {
    setDietCardData((prev) => ({
      ...prev,
      [key]: key === "fp" ? parseInt(value as string) : value,
    }));
  };

  const onEditDietCard = (dietCard: DietCard) => {
    setDietCardData(dietCard);
    setEditingDietCardId(dietCard.id);
  };
  const onMediaUpload = useCallback(
    (newFiles: (CloudinaryMedia | AWSMedia)[]) => {
      setDietCardData((prev) => ({
        ...prev,
        taskMedia: newFiles.length ? newFiles[0] : undefined,
      }));
    },
    []
  );

  const onMediaDelete = useCallback(() => {
    setDietCardData((prev) => ({
      ...prev,
      taskMedia: undefined,
    }));
  }, []);
  return (
    <div className="mt-2 border-dashed border-2 border-red-500 p-4 my-8">
      <p className="text-lg text-gray-700">DietCard Field Table</p>

      <div>
        {/* <UppyWidget
          onUpload={onMediaUpload}
          uid={uid}
          onRemove={onMediaDelete}
          styles="rounded-none bg-red-500 border-dash w-1/2 m-2 text-white"
          filterButton={true}
          leftButtonText="Add DietCard Media"
          screenName="admin"
          taskName="admin"
        /> */}

        <div className="p-4">
          <UppyWidgetContainer
            onUpload={onMediaUpload}
            screenName="admin"
            taskName="admin"
            onDelete={onMediaDelete}
            media={dietCardData?.taskMedia ? [dietCardData.taskMedia] : []}
            uid={uid}
            heading=""
            helperText=""
            height="none"
            filterButton={true}
            tileHeight="small"
            bgWhite={true}
            styles="rounded-none bg-red-500 border-none text-white"
            containerStyles="border border-dashed border-2 border-slate-500 bg-gray-100 h-64 flex justify-center items-center"
          />
        </div>
        {/* {dietCardData.taskMedia && (
          <div>
            <MediaTile
              media={dietCardData.taskMedia}
              alt="execise media"
              height={55}
              width={55}
            />
            <div className="p-2">
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={onMediaDelete}
              >
                {editingDietCardId ? "Update" : "Add"}
              </Button>
            </div>
          </div>
        )} */}

        <div className="pt-4">
          <TextField
            style={{ width: "100%" }}
            placeholder={"Diet Card Task Name"}
            label="Task Name"
            multiline={true}
            minRows={1}
            variant="outlined"
            onChange={(val) => handleInput(val.target.value, "taskName")}
            value={dietCardData.taskName || ""}
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
            value={dietCardData.fp || 0}
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        {/* <div className="p-2">
          <Checkbox
            id="isSaved"
            checked={dietCardData.isSaved}
            onChange={(e) => handleInput(e.target.checked, "isSaved")}
            inputProps={{ "aria-label": "controlled" }}
          />
          <label htmlFor="isSaved" className="ml-2">
            Is Saved
          </label>
        </div> */}

        <div className="p-2">
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={onHandleDietCardFields}
          >
            {editingDietCardId ? "Update" : "Add"}
          </Button>
        </div>
      </div>

      {task.dietCards &&
        task.dietCards.map((dietCard) => {
          return (
            <div
              className={`mt-2 p-2 border-solid border-2 rounded-xl border-gray-500 ${
                editingDietCardId === dietCard.id ? "bg-yellow-200" : ""
              }`}
              key={dietCard.id}
            >
              <div className="flex justify-between">
                <div>
                  <p className="text-lg text-gray-700">
                    Task Name: {dietCard.taskName}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => onEditDietCard(dietCard)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => removeDietCard(dietCard.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>

              <div className="flex justify-between">
                <div>
                  <p className="text-lg text-gray-700 ">
                    Media:
                    {dietCard?.taskMedia ? (
                      <MediaTile
                        media={dietCard.taskMedia}
                        alt="execise media"
                        height={20}
                        width={20}
                      />
                    ) : null}
                  </p>
                </div>
                {/* <div>
                  <Checkbox
                    id={`isSaved_${dietCard.id}`}
                    checked={dietCard.isSaved}
                    disabled
                    inputProps={{ "aria-label": "controlled" }}
                  />
                  <label
                    htmlFor={`isSaved_${dietCard.id}`}
                    className="ml-2 text-gray-500"
                  >
                    Is Saved
                  </label>
                </div> */}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default HandleDietCard;
