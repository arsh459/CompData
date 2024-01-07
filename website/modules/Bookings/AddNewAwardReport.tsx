import LoadingModal from "@components/loading/LoadingModal";
import { useAchiverReport } from "@hooks/awards/useAchiverReport";
import { useAwards } from "@hooks/awards/useAwards";
import { UserInterface } from "@models/User/User";
import { awardStatusList } from "@models/awards/interface";
import { Button, MenuItem, TextField } from "@mui/material";
import {
  DatePicker,
  DateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { setAwardReport } from "@utils/awards";
import { useRouter } from "next/router";
import { useState } from "react";

interface Props {
  user: UserInterface;
  reportId: string;
}

const AddNewAwardReport: React.FC<Props> = ({ user, reportId }) => {
  const router = useRouter();
  const { awards } = useAwards();
  const [updating, setUpdating] = useState<boolean>(false);
  const {
    report,
    loading,
    onStringUpdate,
    onNumberUpdate,
    onAwardStatusUpdate,
    onSave,
    onDelete,
  } = useAchiverReport(reportId, user.uid);

  const handleSubmit = async () => {
    console.log("here");
    if (
      report &&
      report.awardId &&
      report.startTime &&
      report.endTime &&
      report.unlockOn &&
      report.targetMonth &&
      !updating
    ) {
      setUpdating(true);
      await onSave();
      await setAwardReport({
        uid: user.uid,
        id: report.awardId,
        start: report.startTime,
        end: report.endTime,
      });
      setUpdating(false);
      router.back();
    } else {
      alert("All fields are mandatory");
    }
  };

  const handleDelete = async () => {
    setUpdating(true);
    await onDelete();
    router.back();
    setUpdating(false);
  };

  return (
    <div className="p-5">
      <TextField
        select
        style={{ width: "100%" }}
        placeholder={"Award"}
        label={"Award"}
        variant="outlined"
        onChange={(e) => onStringUpdate("awardId", e.target.value)}
        value={report?.awardId || "NO_ENTRY"}
        InputLabelProps={{
          shrink: true,
        }}
      >
        {awards.map((award) => (
          <MenuItem key={award.id} value={award.id}>
            {award.name || award.id}
          </MenuItem>
        ))}
      </TextField>

      <div className="flex-1 flex items-center my-4">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="Start"
            value={report?.startTime || NaN}
            onChange={(newValue) => {
              newValue &&
                onNumberUpdate("startTime", new Date(newValue).getTime());
            }}
          />
        </LocalizationProvider>

        <div className="w-4 aspect-1" />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="End"
            value={report?.endTime || NaN}
            onChange={(newValue) => {
              newValue &&
                onNumberUpdate("endTime", new Date(newValue).getTime());
            }}
          />
        </LocalizationProvider>
      </div>

      <div className="flex-1 flex items-center my-4">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="Unlocked On"
            value={report?.unlockOn || NaN}
            onChange={(newValue) => {
              newValue &&
                onNumberUpdate("unlockOn", new Date(newValue).getTime());
            }}
          />
        </LocalizationProvider>

        <div className="w-4 aspect-1" />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            renderInput={(props) => <TextField {...props} />}
            label="Target Mounth"
            value={report?.targetMonth || NaN}
            onChange={(newValue) => {
              newValue &&
                onNumberUpdate("targetMonth", new Date(newValue).getTime());
            }}
            inputFormat="MMM YY"
            openTo="month"
            views={["year", "month"]}
          />
        </LocalizationProvider>
      </div>

      <div className="py-4">
        <TextField
          style={{ width: "100%" }}
          placeholder={"0.25"}
          label={"Priority"}
          variant="outlined"
          type="number"
          onChange={(val) =>
            onNumberUpdate("priority", parseFloat(val.target.value))
          }
          value={report?.priority || 0}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>

      <TextField
        select
        style={{ width: "100%" }}
        placeholder={"Award Status"}
        label={"Award Status"}
        variant="outlined"
        onChange={(e) => onAwardStatusUpdate(e.target.value)}
        value={report?.awardStatus || "NO_ENTRY"}
        InputLabelProps={{
          shrink: true,
        }}
      >
        {awardStatusList.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </TextField>

      <div className="w-4 aspect-1" />

      <Button onClick={handleSubmit} variant="contained" disabled={updating}>
        Save Report
      </Button>
      <span>&nbsp;</span>
      <Button
        onClick={handleDelete}
        variant="contained"
        color="error"
        disabled={updating}
      >
        Delete Report
      </Button>

      {loading || updating ? (
        <LoadingModal fixed={true} fill="#ff735c" height={50} width={50} />
      ) : null}
    </div>
  );
};

export default AddNewAwardReport;
