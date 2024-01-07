// import Script from "next/script";
import { MenuItem, TextField } from "@mui/material";
import BottomNavComV2 from "@templates/listing/Book/BottomNavComV2";
import { useState } from "react";
import { useRouter } from "next/router";
import Loading from "@components/loading/Loading";

import { useNewHealthCheckIn } from "@hooks/healthcheckins/useNewHealthCheckIn";
import { saveHealthCheckIn } from "@models/HealthCheckins/createUtils";

interface Props {
  uid: string;
  id: string;
  userId: string;
}

const AddHealthCheckinsTemplate: React.FC<Props> = ({ id, uid, userId }) => {
  //   const { id } = useTestimonialParams();

  const {
    healthCheckins,
    onUpdateName,
    onUpdateSheduleType,
    onUpdateUnixStart,
  } = useNewHealthCheckIn(userId, id);

  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const onSave = async () => {
    if (loading === false) {
      setLoading(true);

      if (healthCheckins) {
        try {
          await saveHealthCheckIn(userId, healthCheckins);
          router.back();
        } catch (error) {
          console.log("error", error);
        }
      }
    }
  };

  return (
    <div className="p-4 pt-8">
      <div>
        <p className="text-gray-700 text-4xl font-semibold">
          Add Health CheckIns
        </p>
      </div>
      <>
        {loading ? (
          <div className="pt-8">
            <div className="flex justify-center items-center">
              <Loading fill="#ff735c" width={48} height={48} />
            </div>
          </div>
        ) : (
          <div className="py-8 mb-9">
            <div className="pt-4">
              <TextField
                style={{ width: "100%" }}
                placeholder={"Name of checkin"}
                label={"Name of checkin"}
                variant="outlined"
                onChange={(val) => onUpdateName(val.target.value)}
                value={healthCheckins?.name}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>

            <div className="pt-8">
              <TextField
                select
                style={{ width: "100%" }}
                placeholder={"Type of Schedule"}
                label={"Type of Schedule"}
                variant="outlined"
                onChange={(e) =>
                  onUpdateSheduleType(e.target.value as "COACH" | "USER")
                }
                value={healthCheckins?.scheduleType || "NO ENTRY"}
                InputLabelProps={{
                  shrink: true,
                }}
              >
                <MenuItem value="COACH">COACH</MenuItem>
                <MenuItem value="USER">USER</MenuItem>
                <MenuItem value="NO ENTRY">NO ENTRY</MenuItem>
              </TextField>
            </div>

            <div className="py-4">
              <TextField
                style={{ width: "100%" }}
                placeholder={"Start Unix"}
                label={"Start Unix"}
                variant="outlined"
                onChange={(val) => onUpdateUnixStart(val.target.value)}
                value={healthCheckins?.unixStart || 0}
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
          </div>
        )}
      </>

      <div className="fixed bottom-0 left-0 right-0  z-50">
        <BottomNavComV2 cta={"Save Checkin"} onClick={onSave} />
      </div>
    </div>
  );
};

export default AddHealthCheckinsTemplate;
