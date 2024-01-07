import { interaketResponse } from "../../Https/sendNotificationCheck/interface";
import { parseCallbackData } from "./handleSend";

export const handleWebhookResponse = (reqP: interaketResponse) => {
  if (reqP.data?.message?.meta_data?.source_data?.callback_data) {
    const parsedData = parseCallbackData(
      reqP.data?.message?.meta_data?.source_data?.callback_data,
    );

    if (
      parsedData.cohortId &&
      parsedData.mixpanel_distinct_id &&
      parsedData.notificationId
    ) {
      return {
        cohortId: parsedData.cohortId,
        mixpanel_distinct_id: parsedData.mixpanel_distinct_id,
        notificationId: parsedData.notificationId,
      };
    }
  }

  return undefined;
};
