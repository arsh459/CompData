import { agentsUidType } from "@hooks/appointments/useAppointments";
import { uidToName } from "@modules/Patients/Components/EditAppointment";
import { TextField, MenuItem } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
interface Props {
  agentType: "all" | agentsUidType;
  setAgentType: Dispatch<SetStateAction<"all" | agentsUidType>>;
}
const agentNames = [
  "fC1idaBK2zbWdKhE5GFCfsoYTrJ3",
  "A0PdJiCDDpdd1PCrkhjQ3WjQEuk2",
  "s8yb7RmadXQT4vJIsST0Jio1XQD3",
  "PkAUaJD109N9xFRJoKU4oaVJS223",
  "Th68Mg4rbDXFJEr0SUnQPVZl9oJ3",
  "96Xj1xjNTLVZy6TQ8Ett48WCXNt2",
];
const FilterAgents: React.FC<Props> = ({ agentType, setAgentType }) => {
  return (
    <div className="flex-1 w-full ">
      <TextField
        select
        placeholder={"Filter by Agent"}
        label={"Filter by Agent"}
        variant="outlined"
        onChange={(e) => {
          const { value } = e.target;

          if (setAgentType) {
            if (value === "all") {
              setAgentType("all");
            } else {
              setAgentType(value as agentsUidType);
            }
          }
        }}
        value={agentType || "all"}
        className="uppercase w-full"
        InputLabelProps={{
          shrink: true,
        }}
      >
        {agentNames.map((each) => (
          <MenuItem key={each} value={each} className="uppercase">
            {uidToName[each]}
          </MenuItem>
        ))}
        <MenuItem value="all" className="uppercase">
          all
        </MenuItem>
      </TextField>
    </div>
  );
};

export default FilterAgents;
