import UppyWidgetContainer from "@components/Uppy/UppyWidgetContainer";
import Loading from "@components/loading/Loading";
import { saveAward } from "@hooks/awards/createUtils";
import { useAward } from "@hooks/awards/useAward";
import { UserInterface } from "@models/User/User";
import { badgeGroupsList } from "@models/awards/interface";
import { MenuItem, TextField } from "@mui/material";
import BottomNavComV2 from "@templates/listing/Book/BottomNavComV2";
import { useRouter } from "next/router";
import BackIcon from "public/icons/BackIcon";
import { useState } from "react";
import StringArray from "./StringArray";

interface Props {
  user: UserInterface;
  awardId: string;
}

const AddAward: React.FC<Props> = ({ user, awardId }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const {
    award,
    onMediaUpload,
    onMediaDelete,
    onStringUpdate,
    onNumberUpdate,
    onStringAddInArray,
    onStringDeleteInArray,
  } = useAward(awardId);

  const handleSave = async () => {
    if (
      award &&
      !loading
      //  && award.badgeId
    ) {
      setLoading(true);
      await saveAward(award);
    }

    router.back();
  };

  return (
    <div className="p-4">
      <div className="pb-3">
        <p className="text-gray-700 text-4xl font-semibold flex items-center">
          <span onClick={() => router.back()}>
            <BackIcon style={{ height: "30", width: "30", fill: "gray" }} />{" "}
          </span>
          &nbsp; Add Award
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
              select
              style={{ width: "100%" }}
              placeholder={"Badge Group"}
              label={"Badge Group"}
              variant="outlined"
              onChange={(e) => onStringUpdate("groupId", e.target.value)}
              value={award?.groupId ? award.groupId : "NA"}
              InputLabelProps={{
                shrink: true,
              }}
            >
              {badgeGroupsList.map((groupId) => (
                <MenuItem key={groupId} value={groupId}>
                  {groupId}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div className="pt-8">
            <TextField
              style={{ width: "100%" }}
              placeholder={"What people will call this Award"}
              label={"Name of Award"}
              variant="outlined"
              onChange={(val) => onStringUpdate("name", val.target.value)}
              value={award?.name || ""}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>

          {award?.groupId === "weeklyProgress" ? (
            <>
              <div className="pt-8">
                <TextField
                  style={{ width: "100%" }}
                  placeholder={"0.25"}
                  label={"Lower tier value"}
                  variant="outlined"
                  type="number"
                  onChange={(val) =>
                    onNumberUpdate("tierLower", parseFloat(val.target.value))
                  }
                  value={award?.tierLower || 0}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
              <div className="pt-8">
                <TextField
                  style={{ width: "100%" }}
                  placeholder={"0.55"}
                  label={"Upper tier value"}
                  variant="outlined"
                  type="number"
                  onChange={(val) =>
                    onNumberUpdate("tierUpper", parseFloat(val.target.value))
                  }
                  value={award?.tierUpper || 0}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
            </>
          ) : null}

          <div className="pt-8">
            <TextField
              style={{ width: "100%" }}
              placeholder={"Description of Award"}
              label={"Description"}
              variant="outlined"
              multiline={true}
              minRows={4}
              onChange={(val) =>
                onStringUpdate("description", val.target.value)
              }
              value={award?.description || ""}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div className="pt-8">
            <UppyWidgetContainer
              media={award && award.img ? [award.img] : []}
              leftButtonText="ADD Award Image (dimention:100*100)"
              onDelete={() => onMediaDelete("img")}
              uid={user.uid}
              onUpload={(newFiles) => onMediaUpload(newFiles, "img")}
              onRemove={() => onMediaDelete("img")}
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
              media={award && award.lockedImg ? [award.lockedImg] : []}
              leftButtonText="ADD Upcomming Award Image (dimention:100*100)"
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
              placeholder={"award theme color (ex. hexcode: #FFFFFF)"}
              label={"award theme color (ex. hexcode: #FFFFFF)"}
              variant="outlined"
              onChange={(val) => onStringUpdate("themeColor", val.target.value)}
              value={award?.themeColor || ""}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <StringArray
            target={award?.howToAchieve}
            addInTarget={onStringAddInArray}
            deleteFromTarget={onStringDeleteInArray}
            keytargetKey="howToAchieve"
          />
          <div className="h-20 mb-2" />
        </>
      )}

      <div className="fixed bottom-0 left-0 right-0 z-50">
        <BottomNavComV2 cta={"Save Activity"} onClick={handleSave} />
      </div>
    </div>
  );
};

export default AddAward;
