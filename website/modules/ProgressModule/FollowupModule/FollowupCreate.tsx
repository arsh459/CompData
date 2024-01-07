import Button from "@components/button";
import { useFollowup } from "@hooks/followups/useFollowup";
import { useTodayDate } from "@hooks/myProgram/useTodayDate";
import { UserInterface, followupAgent } from "@models/User/User";
import NextFollowUp from "@modules/Consultation/Components/PrescriptionComp/NextFollowUp";
import TextInputField from "@modules/Consultation/Components/TextInputField";
import { MenuItem, TextField } from "@mui/material";
import { CSSProperties } from "react";
import React from "react";

interface Props {
  remoteUser: UserInterface | undefined;
  id: string;
}

const multilineInputStyle: CSSProperties = {
  height: "120px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
};

const FollowupCreate: React.FC<Props> = ({ remoteUser, id }) => {
  const {
    followup,
    onSave,
    onUpdateFollowupDate,
    onUpdateFollowupAgent,
    onUpdateFollowupType,
    onUpdateFollowupNotes,
  } = useFollowup(remoteUser?.uid, id);
  const { todayUnix } = useTodayDate();
  return (
    <div className="w-screen h-screen relative z-0 p-4">
      <p className="pb-4">Add Followup</p>
      <div className="bg-gray-100 rounded-md border">
        <TextInputField
          label="Notes"
          maxRows={4}
          placeholder="Type here"
          InputProps={{ style: multilineInputStyle }}
          value={followup?.notes || ""}
          onChange={(e) => onUpdateFollowupNotes(e.target.value)}
        />
      </div>
      <div className="pt-4 mt-4 border bg-gray-100">
        <NextFollowUp
          text="Followup date"
          noMinDate={true}
          maxDate={new Date(todayUnix)}
          pickerStyle="dateTime"
          currTimeValue={followup?.followupTime}
          setNextFollowupDate={() => {}}
          setNextFollowupDateObj={onUpdateFollowupDate}
        />
      </div>
      <div className="pt-4">
        <TextField
          select
          style={{ width: "100%" }}
          placeholder={"Agent name"}
          label={"Update agent"}
          variant="outlined"
          onChange={(e) =>
            onUpdateFollowupAgent(e.target.value as followupAgent)
          }
          value={followup?.followupAgent || "NO ENTRY"}
        >
          <MenuItem value={"jayti"}>jayti</MenuItem>
          <MenuItem value={"mansi"}>mansi</MenuItem>
          <MenuItem value={"saurav"}>saurav</MenuItem>
          <MenuItem value={"swapnil"}>swapnil</MenuItem>
          <MenuItem value="NO ENTRY">NO ENTRY</MenuItem>
        </TextField>
      </div>

      <div className="pt-4">
        <TextField
          select
          style={{ width: "100%" }}
          placeholder={"Type"}
          label={"Update Type"}
          variant="outlined"
          onChange={(e) =>
            onUpdateFollowupType(e.target.value as "diet" | "habit")
          }
          value={followup?.type || "NO ENTRY"}
        >
          <MenuItem value={"diet"}>diet</MenuItem>
          <MenuItem value={"habit"}>habit</MenuItem>
          <MenuItem value="NO ENTRY">NO ENTRY</MenuItem>
        </TextField>
      </div>

      <div className="pt-4 flex">
        <Button appearance="contained" onClick={onSave}>
          Save Followup
        </Button>
      </div>
    </div>
  );
};

export default FollowupCreate;
