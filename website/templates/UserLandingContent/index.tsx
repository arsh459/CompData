import UppyWidgetContainer from "@components/Uppy/UppyWidgetContainer";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { LocalUser } from "@models/User/User";
import { MenuItem, TextField } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

import Select from "@mui/material/Select";

interface Props {
  localUser?: LocalUser;
  onBioUpdate: (val: string) => void;
  onLandingContentChange: (
    key:
      | "heading"
      | "docRegistrationId"
      | "subtitle"
      | "qualification"
      | "superWomanLeader"
      | "superWomanIncentive"
      | "experienceYears",
    val?: string | number | boolean
  ) => void;
  uploadLandingImg: (files: (CloudinaryMedia | AWSMedia)[]) => void;
  removeLandingImg: () => void;
}

const darkTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const UserLandingContent: React.FC<Props> = ({
  localUser,
  onBioUpdate,
  onLandingContentChange,
  uploadLandingImg,
  removeLandingImg,
}) => {
  return (
    <div className="w-full border p-4 mb-4">
      <p className="text-xl">Landing Content: </p>

      <div className="py-4">
        <TextField
          style={{ width: "100%" }}
          placeholder={""}
          label={"Registration ID"}
          onChange={(val) =>
            onLandingContentChange("docRegistrationId", val.target.value)
          }
          value={localUser?.landingContent?.docRegistrationId}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>

      <div className="py-4">
        <TextField
          style={{ width: "100%" }}
          placeholder={""}
          label={"Qualification"}
          onChange={(val) =>
            onLandingContentChange("qualification", val.target.value)
          }
          value={localUser?.landingContent?.qualification}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div className="py-4">
        <TextField
          style={{ width: "100%" }}
          placeholder={""}
          type="number"
          label={"Incentive like 12.5 or 2 etc"}
          onChange={(val) =>
            onLandingContentChange(
              "superWomanIncentive",
              parseFloat(val.target.value)
            )
          }
          value={localUser?.landingContent?.superWomanIncentive}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div className="py-4">
        <TextField
          style={{ width: "100%" }}
          placeholder={""}
          type="number"
          label={"Experience in their field"}
          onChange={(val) =>
            onLandingContentChange(
              "experienceYears",
              parseFloat(val.target.value)
            )
          }
          value={localUser?.landingContent?.experienceYears}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div className="w-[200px] py-8">
        <ThemeProvider theme={darkTheme}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              SuperWoman State
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={
                localUser?.landingContent?.superWomanLeader === true
                  ? 1
                  : localUser?.landingContent?.superWomanLeader === false
                  ? 2
                  : 0
              }
              // label="AuthKey"
              onChange={(e) =>
                onLandingContentChange(
                  "superWomanLeader",
                  e.target.value === 1
                    ? true
                    : e.target.value === 2
                    ? false
                    : false
                )
              }
            >
              <MenuItem value={0}>No Value</MenuItem>
              <MenuItem value={1}>Enrolled</MenuItem>
              <MenuItem value={2}>Not Enrolled</MenuItem>
            </Select>
          </FormControl>
        </ThemeProvider>
      </div>
      <div className="py-4">
        <TextField
          style={{ width: "100%" }}
          multiline={true}
          placeholder={""}
          label={"Bio"}
          onChange={(val) => onBioUpdate(val.target.value)}
          value={localUser?.bio}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div className="py-4">
        <TextField
          style={{ width: "100%" }}
          placeholder={""}
          label={"Landing heading"}
          onChange={(val) =>
            onLandingContentChange("heading", val.target.value)
          }
          value={localUser?.landingContent?.heading}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div className="py-4">
        <TextField
          style={{ width: "100%" }}
          placeholder={""}
          label={"Landing subtitle"}
          onChange={(val) =>
            onLandingContentChange("subtitle", val.target.value)
          }
          value={localUser?.landingContent?.subtitle}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div className="min-w-[200px] min-h-[200px] flex flex-col p-4 border m-1">
        <label className="p-2">Landing Image :</label>
        <UppyWidgetContainer
          onUpload={uploadLandingImg}
          screenName="admin"
          taskName="admin"
          onDelete={removeLandingImg}
          media={[localUser?.landingContent?.img]}
          uid={localUser?.uid || ""}
          heading=""
          helperText=""
          height="none"
          filterButton={true}
          tileHeight="small"
          bgWhite={true}
          styles="rounded-none bg-red-500 border-none text-white"
        />
      </div>
    </div>
  );
};

export default UserLandingContent;
