import * as moment from "moment-timezone";
import { UserInterface } from "../../../../models/User/User";
import { FBAppDataRequest, FBEventInterface } from "../interface";
import { MixpanelUser } from "./mixpanelUser";
import { format } from "date-fns";

export function getTimezoneAbbreviation(timezone: string): string {
  return moment.tz(timezone).format("z");
}

export const getTZStringInUser = (
  user: UserInterface,
  app_data: FBAppDataRequest,
  mpUser?: MixpanelUser,
) => {
  return app_data.extObj.tz
    ? app_data.extObj.tz
    : user.recommendationConfig?.timezone?.tzString
    ? user.recommendationConfig.timezone.tzString
    : mpUser?.$properties.$timezone
    ? mpUser?.$properties.$timezone
    : "Asia/Kolkata";
};

export const consoleFBEvent = (formattedEventData: FBEventInterface) => {
  console.log(
    `EVENT:${formattedEventData.event_name} | Time:${format(
      new Date(formattedEventData.event_time * 1000),
      "hh:mma dd-MM-yyyy",
    )} | EventId:${formattedEventData.event_id} | Source:${
      formattedEventData.action_source
    } | URL:${formattedEventData.event_source_url} | USER-FN:${
      formattedEventData.user_data.fn
    } | USER-LN:${formattedEventData.user_data.ln} | USER-PH:${
      formattedEventData.user_data.ph
    } | USER-EM:${formattedEventData.user_data.em} | USER-GE:${
      formattedEventData.user_data.ge
    } | USER-LOC:${formattedEventData.user_data.ct}, ${
      formattedEventData.user_data.st
    }, ${formattedEventData.user_data.country}, ${
      formattedEventData.user_data.zp
    } | EXTERNAL-ID:${formattedEventData.user_data.external_id} | IP:${
      formattedEventData.user_data.client_ip_address
    } | UserAgent:${formattedEventData.user_data.client_user_agent} | fbc:${
      formattedEventData.user_data.fbc
    } | fbp:${formattedEventData.user_data.fbp} | ANONID:${
      formattedEventData.user_data.anon_id
    } | MADID:${formattedEventData.user_data.madid} | AdEnabled:${
      formattedEventData.app_data?.advertiser_tracking_enabled
    } | AdAppEnabled:${
      formattedEventData.app_data?.application_tracking_enabled
    } | install_referrer:${
      formattedEventData.app_data?.install_referrer
    } | installer_package:${
      formattedEventData.app_data?.installer_package
    } ${` | EXT ARR: ${formattedEventData.app_data?.extinfo.join(" - ")}`}`,
  );

  // console.log();
  // console.log();
  // console.log(
  //   `USER-FN:${formattedEventData.user_data.fn} | USER-LN:${formattedEventData.user_data.ln} | USER-PH:${formattedEventData.user_data.ph} | USER-EM:${formattedEventData.user_data.em} | USER-GE:${formattedEventData.user_data.ge} | USER-LOC:${formattedEventData.user_data.ct}, ${formattedEventData.user_data.st}, ${formattedEventData.user_data.country}, ${formattedEventData.user_data.zp} | EXTERNAL-ID:${formattedEventData.user_data.external_id} | IP:${formattedEventData.user_data.client_ip_address} | UserAgent:${formattedEventData.user_data.client_user_agent} | fbc:${formattedEventData.user_data.fbc} | fbp:${formattedEventData.user_data.fbp} | ANONID:${formattedEventData.user_data.anon_id} | MADID:${formattedEventData.user_data.madid}`,
  // );

  // if (formattedEventData.action_source === "app") {
  //   console.log();
  //   console.log();
  //   console.log(
  //     `AdEnabled:${formattedEventData.app_data?.advertiser_tracking_enabled} | AdAppEnabled:${formattedEventData.app_data?.application_tracking_enabled} | install_referrer:${formattedEventData.app_data?.install_referrer} | installer_package:${formattedEventData.app_data?.installer_package}`,
  //   );

  //   console.log();
  //   console.log();
  //   console.log(`EXT ARR: ${formattedEventData.app_data?.extinfo.join(" | ")}`);
  // }
};
