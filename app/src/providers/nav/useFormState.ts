import { doctorPermission } from "@hooks/appointment/useAppointmentPermission";
import { useEffect } from "react";
import { useNavStore } from "./navStore";
import { shallow } from "zustand/shallow";
import { useUserStore } from "@providers/user/store/useUserStore";

export const useFormState = (docPermission: doctorPermission) => {
  const dietFormFilled = useUserStore(
    (state) => state.user?.flags?.dietFormFilled
  );
  const updateFormStatus = useNavStore(
    (state) => state.updateFormStatus,
    shallow
  );

  useEffect(() => {
    if (!dietFormFilled && docPermission === "ALLOWED") {
      updateFormStatus("DIET_DOC");
    } else if (dietFormFilled && docPermission === "ALLOWED") {
      updateFormStatus("DOC_ONLY");
    } else if (!dietFormFilled && docPermission !== "ALLOWED") {
      updateFormStatus("DIET_ONLY");
    } else {
      updateFormStatus("NONE");
    }
  }, [dietFormFilled, docPermission]);
};
