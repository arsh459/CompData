import UppyWidgetContainer from "@components/Uppy/UppyWidgetContainer";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { useState } from "react";
import { LocalUser } from "@models/User/User";
import { v4 as uuidv4 } from "uuid";
import { Button, TextField } from "@mui/material";
import MediaCard from "@components/MediaCard";

export type DietAndWorkoutType = {
  id: string;
  text?: string;
  img?: CloudinaryMedia | AWSMedia;
};

const intial: DietAndWorkoutType = { id: "new", text: "" };

interface Props {
  localUser?: LocalUser;
  onAddDietAndWorkout: (val: DietAndWorkoutType) => void;
  onRemoveDietAndWorkout: (id: string) => void;
}

const DietAndWorkout: React.FC<Props> = ({
  localUser,
  onAddDietAndWorkout,
  onRemoveDietAndWorkout,
}) => {
  const [tempObj, setTempObj] = useState<DietAndWorkoutType>(intial);

  const onMediaUpload = (newFiles: AWSMedia[]) => {
    setTempObj((prev) => {
      return newFiles.length ? { ...prev, img: newFiles[0] } : prev;
    });
  };

  const onDeletMedia = () => {
    setTempObj((prev) => {
      return { ...prev, img: undefined };
    });
  };

  const onSave = () => {
    if (tempObj.id === "new") {
      onAddDietAndWorkout({ ...tempObj, id: uuidv4() });
    } else {
      onAddDietAndWorkout(tempObj);
    }
    setTempObj(intial);
  };

  return (
    <div className="mt-2 border-2 border-dashed border-blue-500 ">
      <p className="text-lg text-gray-700">Diet And Workout</p>

      <div className="p-4">
        <UppyWidgetContainer
          media={[tempObj.img]}
          leftButtonText={`Add Img`}
          onDelete={onDeletMedia}
          uid={localUser?.uid || ""}
          onUpload={(newFiles) => onMediaUpload(newFiles)}
          onRemove={onDeletMedia}
          screenName="admin"
          taskName="admin"
          heading=""
          helperText=""
          height="none"
          filterButton={true}
          tileHeight="small"
          bgWhite={true}
          styles="rounded-none bg-red-500 border-none text-white"
          containerStyles=" border border-dashed border-2 border-slate-500 bg-gray-100 h-64 flex justify-center items-center"
        />
      </div>
      <div className="pt-4">
        <TextField
          style={{ width: "100%" }}
          placeholder={"Text"}
          label={"Text"}
          minRows={1}
          variant="outlined"
          onChange={(val) =>
            setTempObj((prev) => ({ ...prev, text: val.target.value }))
          }
          value={tempObj.text}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div className="pt-4">
        <Button variant="contained" color="primary" onClick={onSave}>
          Save
        </Button>
      </div>
      <div className="pt-4">
        {localUser?.landingContent?.dietAndWorkout?.length ? (
          <div className="bg-gray-200 p-2">
            {localUser.landingContent.dietAndWorkout.map((each) => (
              <div key={each.id} className="border-b border-gray-300 py-2">
                <div className="flex mb-2">
                  <MediaCard media={each.img} HWClassStr="w-20 aspect-1" />
                  <div className="ml-2">
                    <p>Id: {each.id}</p>
                    <p>Text: {each.text}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setTempObj(each)}
                    className="mx-4"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => onRemoveDietAndWorkout(each.id)}
                    className="ml-2"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default DietAndWorkout;
