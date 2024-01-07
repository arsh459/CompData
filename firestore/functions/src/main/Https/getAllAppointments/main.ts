import { getAppointmentsByType } from "../../../models/Appointments/getUtils";
import { AppointmentInterface } from "../../../models/Appointments/interface";
import { getFormattedDateForUnixWithTZ } from "../../PubSub/activityTracker/utils";

export const appointmentGetterFunc = async () => {
  const allApps = await getAppointmentsByType("gynaecologist");

  let i: number = 0;
  const remoteApps: AppointmentInterface[] = [];
  if (allApps) {
    for (const app of allApps) {
      remoteApps.push(app);

      console.log(
        `${i} | ${app.category} | ${getFormattedDateForUnixWithTZ(
          app.createdOn,
          "Asia/Kolkata",
        )} | ${app.status} | ${
          app.startSlot
            ? getFormattedDateForUnixWithTZ(
                app.startSlot,
                "Asia/Kolkata",
                "hh:mma DD-MM-YYYY",
              )
            : "No START"
        } | ${
          app.endSlot
            ? getFormattedDateForUnixWithTZ(
                app.endSlot,
                "Asia/Kolkata",
                "hh:mma DD-MM-YYYY",
              )
            : "NO END"
        } | ${app.doctorId} | ${app.patientId} | ${
          app.id
        } | ${`https://socialboat.live/admin/appointments/${app.id}`}`,
      );

      i++;
    }
  }
};
