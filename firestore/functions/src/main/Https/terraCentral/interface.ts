import { TerraActivity, TerraUser } from "../../../models/Terra/TerraUser";

export interface TerraWebHookBody {
  status: "success" | "error";
  widget_session_id?: string;
  reference_id?: string;
  type?: "auth" | "activity";
  user?: TerraUser;
  data?: TerraActivity[];

  message?: string;
}
