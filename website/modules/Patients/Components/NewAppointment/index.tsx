import Loading from "@components/loading/Loading";
import { useAppointmentSession } from "@hooks/appointments/useAppointmentSession";
import { UserInterface } from "@models/User/User";
import { Button, MenuItem, TextField } from "@mui/material";
import {
  CategoryTypes,
  appCats,
} from "@templates/CalendlyTemplate/CalendlyTemplateV2";
import React, { useState } from "react";
interface Props {
  remoteUser: UserInterface | null;
}
const NewAppointmentComponent: React.FC<Props> = ({ remoteUser }) => {
  const { createAppointmentSession, calendlyVisible } = useAppointmentSession(
    remoteUser?.uid,
    remoteUser?.name
  );

  const [selectedCategory, setCategory] =
    useState<CategoryTypes>("gynaecologist");

  return (
    <div className="w-screen p-4 h-screen relative z-0">
      <h1 className="text-xl font-medium">Schedule new appointment</h1>
      <p>User: {remoteUser?.name}</p>
      <p>uid: {remoteUser?.uid}</p>
      <div className="pt-4">
        <TextField
          select
          style={{ flex: 1 }}
          placeholder={"Type"}
          label={"Type"}
          variant="outlined"
          onChange={(e) => {
            setCategory(e.target.value as CategoryTypes);
          }}
          value={selectedCategory || "NO ENTRY"}
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

      {calendlyVisible ? (
        <div className="pt-4 flex">
          <Loading fill="#ff735c" width={48} height={48} />
        </div>
      ) : (
        <div className="pt-4 flex">
          <Button
            onClick={() => createAppointmentSession(selectedCategory)}
            variant="contained"
          >
            Select Time
          </Button>
        </div>
      )}
    </div>
  );
};

export default NewAppointmentComponent;
