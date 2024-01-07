import { TextField, Checkbox } from "@mui/material";
import { sessionTypes, SessionV2 } from "@models/Event/Event";
import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";
// import CloudinaryWidget from "../CloudinaryWidget";
import TypeSelector from "./TypeSelector";
// import Checkbox from "@mui/material/Checkbox";

interface Props {
  formState: "name" | "isLive" | "media" | "sessionType";
  session: SessionV2;
  onSessionChange: (
    keyToChange: "name" | "description" | "youtubeLink" | undefined,
    value: string,
    newMedia?: CloudinaryMedia,
    isLive?: boolean,
    isFree?: boolean,
    deleteMedia?: boolean,
    newSessionType?: sessionTypes
  ) => void;
}

export const SessionForm: React.FC<Props> = ({
  formState,
  session,
  onSessionChange,
}) => {
  // console.log("form", formState, session.sessionType);
  return (
    <div>
      {formState === "sessionType" ? (
        <TypeSelector
          selectedSession={session.sessionType}
          onClick={(newVal: sessionTypes) =>
            onSessionChange(
              undefined,
              "",
              undefined,
              undefined,
              undefined,
              undefined,
              newVal
            )
          }
        />
      ) : formState === "media" ? (
        <div className="">
          {/* <CloudinaryWidget
            media={session.media ? [session.media] : []}
            leftButtonText="Add Media"
            heading=""
            helperText=""
            buttonHelperText="*Your video tutorial or creative"
            onUpload={(newMedia: CloudinaryMedia) =>
              onSessionChange(undefined, "", newMedia)
            }
            onDelete={() =>
              onSessionChange(
                undefined,
                "",
                undefined,
                undefined,
                undefined,
                true
              )
            }
            height="none"
            bgWhite={true}
            // onDelete={removeMedia}
            multiple={false}
            maxFiles={1}
          />

          <div className="pt-4 pb-4 flex items-center">
            <div className="w-1/2">
              <Divider />
            </div>
            <p className="pl-4 pr-4 text-gray-700">Or</p>
            <div className="w-1/2">
              <Divider />
            </div>
          </div>

          <div>
            <TextField
              style={{ width: "100%" }}
              helperText="Unlisted videos won't be visible on your YouTube"
              placeholder="Unlisted YouTube video"
              label="Unlisted YouTube link"
              variant="outlined"
              onChange={
                (newVal) => onSessionChange("youtubeLink", newVal.target.value)

                //   onChange((prev: ListItem[]) => [
                //     ...prev.slice(0, selectedIndex),
                //     { ...prev[selectedIndex], heading: newVal.target.value },
                //     ...prev.slice(selectedIndex + 1, prev.length),
                //   ])
                // setSelectedItem({ ...item, heading: newVal.target.value })
              }
              value={session?.youtubeLink}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div> */}
        </div>
      ) : formState === "name" ? (
        <>
          <p className="text-gray-500 text-sm">
            For example - A demo session or a live Zumba class
          </p>
          <div className="pt-2">
            <TextField
              style={{ width: "100%" }}
              helperText=""
              placeholder="Try - Orientation session or Crossfit Basics I"
              label="Session name"
              variant="outlined"
              onChange={
                (newVal) => onSessionChange("name", newVal.target.value)
                //   onChange((prev: ListItem[]) => [
                //     ...prev.slice(0, selectedIndex),
                //     { ...prev[selectedIndex], heading: newVal.target.value },
                //     ...prev.slice(selectedIndex + 1, prev.length),
                //   ])
                // setSelectedItem({ ...item, heading: newVal.target.value })
              }
              value={session.name}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>

          <div className="pt-4">
            <TextField
              style={{ width: "100%" }}
              multiline={true}
              rows={4}
              helperText="Optional: A short description"
              placeholder="Today I will understand your goals and create your personal plan..."
              label="Session description"
              variant="outlined"
              onChange={
                (newVal) => onSessionChange("description", newVal.target.value)
                //   onChange((prev: ListItem[]) => [
                //     ...prev.slice(0, selectedIndex),
                //     { ...prev[selectedIndex], heading: newVal.target.value },
                //     ...prev.slice(selectedIndex + 1, prev.length),
                //   ])
                // setSelectedItem({ ...item, heading: newVal.target.value })
              }
              value={session.description}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
        </>
      ) : formState === "isLive" ? (
        <div className="">
          <p className="text-gray-700text-lg">Additional information:</p>
          <div className="flex items-center">
            <Checkbox
              color="primary"
              checked={session.live}
              onChange={() =>
                onSessionChange(undefined, "", undefined, !session.live)
              }
            />
            <p className="text-gray-700">This is a live session</p>
          </div>

          <div className="flex items-center">
            <Checkbox
              checked={session.free}
              onChange={() =>
                onSessionChange(
                  undefined,
                  "",
                  undefined,
                  undefined,
                  !session.free
                )
              }
              color="primary"
            />
            <p className="text-gray-700">This is a free session</p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SessionForm;
