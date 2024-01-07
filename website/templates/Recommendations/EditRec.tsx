import { dayRecommendation } from "@models/User/User";
import { Button, TextField } from "@mui/material";
import { Checkbox } from "@mui/material";

interface Props {
  currentRec: dayRecommendation;
  saveRecommendationChanges: () => Promise<void>;
  updateRec: (
    key: "overrideBadgeId" | "overrideDay" | "propagateDate",
    value: string | number | boolean
  ) => void;
}

const EditRec: React.FC<Props> = ({
  currentRec,
  updateRec,
  saveRecommendationChanges,
}) => {
  return (
    <div className="p-4 border">
      <p>{currentRec.date}</p>
      <p>BadgeID: {currentRec.badgeId}</p>
      <p>BadgeDay: {currentRec.day}</p>
      <div className="flex py-4">
        <TextField
          style={{ width: "50%" }}
          label={"Override BadgeId"}
          variant="outlined"
          onChange={(e) => {
            updateRec("overrideBadgeId", e.target.value);
          }}
          value={currentRec.overrideBadgeId ? currentRec.overrideBadgeId : ""}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>

      <div className="flex py-4">
        <TextField
          style={{ width: "50%" }}
          label={"Override Day"}
          variant="outlined"
          onChange={(e) => {
            updateRec("overrideDay", parseInt(e.target.value));
          }}
          type="number"
          value={
            typeof currentRec.overrideDay === "number" &&
            currentRec.overrideDay >= 0
              ? currentRec.overrideDay
              : -1
          }
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>

      <div className="flex py-4">
        <Checkbox
          color="primary"
          // value={item}
          checked={currentRec?.propagateDate ? true : false}
          onChange={() =>
            updateRec("propagateDate", currentRec?.propagateDate ? false : true)
          }
        />
        <p className="">Propogate Date</p>
      </div>

      <div className="py-4">
        <Button variant="contained" onClick={saveRecommendationChanges}>
          Update Recommendations
        </Button>
      </div>
    </div>
  );
};

export default EditRec;
