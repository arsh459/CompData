import UppyWidgetContainer from "@components/Uppy/UppyWidgetContainer";
import Loading from "@components/loading/Loading";
import { UserInterface } from "@models/User/User";
import { TextField } from "@mui/material";
import BottomNavComV2 from "@templates/listing/Book/BottomNavComV2";
import { useRouter } from "next/router";
import BackIcon from "public/icons/BackIcon";
import { useState } from "react";
import { useLevel } from "@hooks/level/useLevel";
import { saveLevel } from "@utils/level/createUtils";

interface Props {
  user: UserInterface;
  levelId: string;
}

const AddLevel: React.FC<Props> = ({ user, levelId }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const {
    level,
    onMediaUpload,
    onMediaDelete,
    onStringUpdate,
    onNumberUpdate,
  } = useLevel(levelId);

  const handleSave = async () => {
    if (
      level &&
      level.lvlNumber &&
      typeof level.promotionCutoff === "number" &&
      typeof level.maintainCutoff === "number" &&
      level.title &&
      level.description &&
      // level.howToAchieve &&
      level.earnedImg &&
      level.lockedImg &&
      !loading
    ) {
      setLoading(true);
      await saveLevel({ ...level });
      router.back();
    }
  };

  return (
    <div className="p-4">
      <div className="pb-3">
        <p className="text-gray-700 text-4xl font-semibold flex items-center">
          <span onClick={() => router.back()}>
            <BackIcon style={{ height: "30", width: "30", fill: "gray" }} />{" "}
          </span>
          &nbsp; Add level
        </p>
      </div>
      <hr />
      {loading ? (
        <div className="flex justify-center items-center">
          <Loading fill="#ff735c" width={48} height={48} />
        </div>
      ) : (
        <>
          <div className="pt-8">
            <TextField
              required
              style={{ width: "100%" }}
              placeholder={"level number"}
              label={"level number"}
              variant="outlined"
              onChange={(val) =>
                onNumberUpdate("lvlNumber", parseInt(val.target.value))
              }
              value={level?.lvlNumber || ""}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>

          <div className="pt-8">
            <TextField
              style={{ width: "100%" }}
              placeholder={"level min FP"}
              label={"level min FP"}
              variant="outlined"
              onChange={(val) =>
                onNumberUpdate("minFP", parseInt(val.target.value))
              }
              value={level?.minFP || ""}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>

          <div className="pt-8">
            <TextField
              style={{ width: "100%" }}
              placeholder={"level max FP"}
              label={"level max FP"}
              variant="outlined"
              onChange={(val) =>
                onNumberUpdate("maxFP", parseInt(val.target.value))
              }
              value={level?.maxFP || ""}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>

          <div className="pt-8">
            <TextField
              required
              style={{ width: "100%" }}
              placeholder={"10"}
              label={"Promote users above rank"}
              variant="outlined"
              onChange={(val) =>
                onNumberUpdate("promotionCutoff", parseInt(val.target.value))
              }
              value={level?.promotionCutoff || ""}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>

          <div className="pt-8">
            <TextField
              required
              style={{ width: "100%" }}
              placeholder={"10"}
              label={"Users above this stay in level"}
              variant="outlined"
              onChange={(val) =>
                onNumberUpdate("maintainCutoff", parseInt(val.target.value))
              }
              value={level?.maintainCutoff || ""}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>

          <div className="pt-8">
            <TextField
              required
              style={{ width: "100%" }}
              placeholder={"What people will call this level"}
              label={"Name of level"}
              variant="outlined"
              onChange={(val) => onStringUpdate("title", val.target.value)}
              value={level?.title || ""}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>

          <div className="pt-8">
            <TextField
              required
              style={{ width: "100%" }}
              placeholder={"Description of level"}
              label={"Description"}
              variant="outlined"
              multiline={true}
              minRows={4}
              onChange={(val) =>
                onStringUpdate("description", val.target.value)
              }
              value={level?.description || ""}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>

          <div className="pt-8">
            <UppyWidgetContainer
              media={level && level.earnedImg ? [level.earnedImg] : []}
              leftButtonText="ADD level Image (dimention:100*100)"
              onDelete={() => onMediaDelete("earnedImg")}
              uid={user.uid}
              onUpload={(newFiles) => onMediaUpload(newFiles, "earnedImg")}
              onRemove={() => onMediaDelete("earnedImg")}
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

          <div className="pt-8">
            <UppyWidgetContainer
              media={level && level.lockedImg ? [level.lockedImg] : []}
              leftButtonText="ADD Upcomming level Image (dimention:100*100)"
              onDelete={() => onMediaDelete("lockedImg")}
              uid={user.uid}
              onUpload={(newFiles) => onMediaUpload(newFiles, "lockedImg")}
              onRemove={() => onMediaDelete("lockedImg")}
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

          <div className="pt-8">
            <TextField
              style={{ width: "100%" }}
              placeholder={"How to achive this level"}
              label={"How to achive this level"}
              variant="outlined"
              onChange={(val) =>
                onStringUpdate("howToAchieve", val.target.value)
              }
              value={level?.howToAchieve || ""}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>

          <div className="pt-8">
            <TextField
              style={{ width: "100%" }}
              placeholder={"level theme color (ex. hexcode: #FFFFFF)"}
              label={"level theme color (ex. hexcode: #FFFFFF)"}
              variant="outlined"
              onChange={(val) => onStringUpdate("textColor", val.target.value)}
              value={level?.textColor || ""}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>

          {/* <div className="pt-8">
            <TextField
              style={{ width: "100%" }}
              placeholder={"level size"}
              label={"level size"}
              variant="outlined"
              onChange={(val) =>
                onNumberUpdate("levelSize", parseInt(val.target.value))
              }
              value={level?.levelSize || ""}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div> */}

          <div className="h-20 mb-2" />
        </>
      )}

      <div className="fixed bottom-0 left-0 right-0 z-50">
        <BottomNavComV2 cta={"Save Activity"} onClick={handleSave} />
      </div>
    </div>
  );
};

export default AddLevel;
