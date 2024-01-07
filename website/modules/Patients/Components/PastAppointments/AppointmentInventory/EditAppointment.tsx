import { useUserAppointmentInventory } from "@hooks/appointments/useUserAppointmentInventory";
import { Button, TextField } from "@mui/material";
import { useRouter } from "next/router";

interface Props {
  uid: string;
}

const EditAppointmentTemplate: React.FC<Props> = ({ uid }) => {
  const { onSave, onUpdateInventoryValue, inventory } =
    useUserAppointmentInventory(uid);

  const router = useRouter();

  console.log("inv", inventory);
  return (
    <div className="w-full h-full p-4">
      <div className="text-2xl font-medium pb-8">
        <h1>User Appointments</h1>
      </div>
      <div className="py-4">
        <TextField
          style={{ flex: 1 }}
          label={"Total Doc Consultations"}
          variant="outlined"
          type="number"
          onChange={(e) =>
            onUpdateInventoryValue(
              "nbDoctorConsultationsTotal",
              parseInt(e.target.value)
            )
          }
          value={inventory.nbDoctorConsultationsTotal}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div className="py-4">
        <TextField
          style={{ flex: 1 }}
          label={"Total Diet Consultations"}
          variant="outlined"
          type="number"
          onChange={(e) =>
            onUpdateInventoryValue(
              "nbDietConsultationsTotal",
              parseInt(e.target.value)
            )
          }
          value={inventory.nbDietConsultationsTotal}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div className="py-4">
        <TextField
          style={{ flex: 1 }}
          label={"Doc Consultations DONE"}
          variant="outlined"
          type="number"
          onChange={(e) =>
            onUpdateInventoryValue(
              "nbDoctorConsultationsDone",
              parseInt(e.target.value)
            )
          }
          value={inventory.nbDoctorConsultationsDone}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>

      <div className="py-4">
        <TextField
          style={{ flex: 1 }}
          label={"Diet Consultations DONE"}
          variant="outlined"
          type="number"
          onChange={(e) =>
            onUpdateInventoryValue(
              "nbDietConsultationsDone",
              parseInt(e.target.value)
            )
          }
          value={inventory.nbDietConsultationsDone}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div className="flex pt-8">
        <Button
          onClick={async () => {
            await onSave();
            router.back();
          }}
          variant="contained"
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default EditAppointmentTemplate;
