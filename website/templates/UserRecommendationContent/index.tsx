import { LocalUser } from "@models/User/User";
import { MenuItem, TextField } from "@mui/material";
// import { useEffect, useState } from "react";
import { allTimezones } from "./allTimezones";

interface Props {
  localUser?: LocalUser;
  onUpdateOffset: (tz: string) => void;
  onRecommendationObjChange: (
    key: "primaryWorkoutCoach" | "baseTier",
    val?: string | number
  ) => void;
}

const UserRecommendationContent: React.FC<Props> = ({
  localUser,
  onRecommendationObjChange,
  onUpdateOffset,
}) => {
  return (
    <div className="w-full border p-4 mb-4">
      <p className="text-xl">Recommendation Content: </p>

      <div className="py-4">
        <TextField
          style={{ width: "100%" }}
          placeholder={""}
          label={"Base Tier"}
          type="number"
          onChange={(val) =>
            onRecommendationObjChange("baseTier", parseInt(val.target.value))
          }
          value={localUser?.recommendationConfig?.baseTier}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div className="py-4">
        <TextField
          style={{ width: "100%" }}
          placeholder={""}
          label={"Primary Coach UID"}
          onChange={(val) =>
            onRecommendationObjChange("primaryWorkoutCoach", val.target.value)
          }
          value={localUser?.recommendationConfig?.primaryWorkoutCoach}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>

      <div className="py-4">
        <div className="select-wrapper">
          <div className="pt-8">
            <TextField
              select
              style={{ width: "100%" }}
              placeholder={"Timezone"}
              label={"Timezone"}
              variant="outlined"
              onChange={(e) => {
                onUpdateOffset(e.target.value);
              }}
              // value={badge?.difficulty || "NO ENTRY"}
              value={
                localUser?.recommendationConfig?.timezone?.tzString
                  ? localUser.recommendationConfig.timezone.tzString
                  : "Asia/Kolkata"
              }
              InputLabelProps={{
                shrink: true,
              }}
            >
              {Object.keys(allTimezones).map((item) => {
                return (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                );
              })}
            </TextField>
          </div>

          {/* <TimezoneSelect
            value={
              localUser?.recommendationConfig?.timezone?.tzString
                ? localUser?.recommendationConfig?.timezone?.tzString
                : "Asia/Kolkata"
            }
            onChange={(val) => console.log(val)}
          /> */}
        </div>

        <div
          style={{
            backgroundColor: "#ccc",
            padding: "20px",
            margin: "20px auto",
            borderRadius: "5px",
            maxWidth: "600px",
          }}
        >
          <pre
            style={{
              margin: "0 20px",
              fontWeight: 500,
              fontFamily: "monospace",
            }}
          >
            Timezone: {localUser?.recommendationConfig?.timezone?.tzString}
            {`\n`}
            Offset: {localUser?.recommendationConfig?.timezone?.offset}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default UserRecommendationContent;
