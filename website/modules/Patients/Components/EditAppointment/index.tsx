import { useEditAppointment } from "@hooks/appointments/useEditAppointment";
import {
  appointmentStatusArray,
  appointmentStatusType,
} from "@models/Appintment";
import { Button, Checkbox, MenuItem, TextField } from "@mui/material";
import {
  CategoryTypes,
  appCats,
} from "@templates/CalendlyTemplate/CalendlyTemplateV2";
import {
  mansiUID,
  maitreeUID,
  monaUID,
  nishaUID,
  sauravUID,
  jaytiUID,
} from "@templates/joinBoatTemplate/V6/utils";
import { format } from "date-fns";
import { useRouter } from "next/router";
import React from "react";
interface Props {
  id: string;
}

export type agentNameTypes =
  | "Dr Mona"
  | "Dr Maitree"
  | "Jayti"
  | "Saurav"
  | "Mansi"
  | "Nisha";

export const nameToUID: Record<agentNameTypes, string> = {
  "Dr Mona": monaUID,
  "Dr Maitree": maitreeUID,
  Jayti: jaytiUID,
  Mansi: mansiUID,
  Saurav: sauravUID,
  Nisha: nishaUID,
};

export const uidToName: Record<string, agentNameTypes> = {
  [monaUID]: "Dr Mona",
  [maitreeUID]: "Dr Maitree",
  [jaytiUID]: "Jayti",
  [mansiUID]: "Mansi",
  [sauravUID]: "Saurav",
  [nishaUID]: "Nisha",
};

const agentNames = ["Dr Mona", "Dr Maitree", "Jayti", "Saurav", "Nisha"];

const EditAppointmentComponent: React.FC<Props> = ({ id }) => {
  const {
    changeDoc,
    updateAppCategory,
    onSave,
    appointment,
    changeStatus,
    onToggleFollowUp,
  } = useEditAppointment(id);
  console.log({ appointment });

  const router = useRouter();
  return (
    <div className="w-screen p-4 h-screen relative z-0">
      <h1 className="text-xl font-medium">Edit appointment</h1>
      <div className="p-4 bg-gray-100 border text-sm">
        <p>Name: {appointment?.name}</p>
        <p>UID: {appointment?.patientId}</p>
        {appointment?.startSlot ? (
          <p>
            Start: {format(new Date(appointment?.startSlot), "hh:mma dd-MM-yy")}
          </p>
        ) : null}
        {appointment?.endSlot ? (
          <p>
            End: {format(new Date(appointment?.endSlot), "hh:mma dd-MM-yy")}
          </p>
        ) : null}
      </div>

      <div className="pt-4">
        <TextField
          select
          style={{ flex: 1 }}
          placeholder={"Type"}
          label={"Type"}
          variant="outlined"
          onChange={(e) => {
            changeDoc(nameToUID[e.target.value as agentNameTypes]);
          }}
          value={
            (appointment?.doctorId &&
              uidToName[appointment?.doctorId] &&
              uidToName[appointment?.doctorId]) ||
            "NO ENTRY"
          }
          InputLabelProps={{
            shrink: true,
          }}
        >
          {agentNames.map((item) => (
            <MenuItem key={item} value={item}>
              <p className="capitalize">{item}</p>
            </MenuItem>
          ))}
          <MenuItem value={"NO ENTRY"}>NO ENTRY</MenuItem>
        </TextField>
      </div>

      <div className="pt-4">
        <TextField
          select
          style={{ flex: 1 }}
          placeholder={"Type"}
          label={"Type"}
          variant="outlined"
          onChange={(e) => {
            updateAppCategory(e.target.value as CategoryTypes);
          }}
          value={appointment?.category || "NO ENTRY"}
          InputLabelProps={{
            shrink: true,
          }}
        >
          {appCats.map((item) => (
            <MenuItem key={item} value={item}>
              <p className="capitalize">{item}</p>
            </MenuItem>
          ))}
          <MenuItem value={"NO ENTRY"}>NO ENTRY</MenuItem>
        </TextField>
      </div>

      <div className="pt-4">
        <TextField
          select
          style={{ flex: 1 }}
          placeholder={"Status"}
          label={"Status"}
          variant="outlined"
          onChange={(e) => {
            changeStatus(e.target.value as appointmentStatusType);
          }}
          value={appointment?.status || "NO ENTRY"}
          InputLabelProps={{
            shrink: true,
          }}
        >
          {appointmentStatusArray.map((item) => (
            <MenuItem key={item} value={item}>
              <p className="capitalize">{item}</p>
            </MenuItem>
          ))}
          <MenuItem value={"NO ENTRY"}>NO ENTRY</MenuItem>
        </TextField>
      </div>
      <div className="pr-4 flex items-center">
        <Checkbox
          color="primary"
          checked={appointment?.isFollowUp ? true : false}
          onChange={() => onToggleFollowUp(!appointment?.isFollowUp)}
        />
        <p className="text-gray-700">is FollowUp</p>
      </div>
      <div className="pt-4 flex">
        <Button
          onClick={async () => {
            await onSave();
            router.back();
          }}
          variant="contained"
        >
          Save Appointment
        </Button>
      </div>
    </div>
  );
};

export default EditAppointmentComponent;
