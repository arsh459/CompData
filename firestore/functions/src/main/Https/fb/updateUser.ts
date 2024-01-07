import { AttributionObj, utmContent } from "../../../models/User/User";
import { FBEventInterface } from "./interface";
import * as admin from "firebase-admin";
import { mixpanel } from "../../../mixpanel/mixpanel";

export const updateUserAtt = async (
  formattedEventData: FBEventInterface,
  uid: string,
  attribution?: AttributionObj,
) => {
  if (attribution) {
    return;
  }

  const attObj = createAttributionObj(formattedEventData);

  const batch = admin.firestore().batch();

  batch.update(admin.firestore().collection("users").doc(uid), {
    attribution: attObj,
  });

  batch.create(
    admin.firestore().collection("conversions").doc(),
    formattedEventData,
  );

  await batch.commit();

  await mixpanel.people.set(
    uid,
    {
      eventUrl: attObj.event_source_url,
      conversionSource: formattedEventData.action_source,
      acqusitionTime: new Date(attObj.unix),
      ...(attObj.fbc ? { fbcId: attObj.fbc } : {}),
      ...(attObj.fbp ? { fbpId: attObj.fbp } : {}),
      ...(attObj.utm_source ? { utmSource: attObj.utm_source } : {}),
      ...(attObj.utm_campaign ? { utmCampaign: attObj.utm_campaign } : {}),
      ...(attObj.installer_package
        ? { installerPackage: attObj.installer_package }
        : {}),
    },
    { $ignore_time: true },
  );
};

const createAttributionObj = (formattedEventData: FBEventInterface) => {
  let utm_source: string | null = "";
  let utm_campaign: string | null = "";
  let utm_content: utmContent | undefined = undefined;
  if (formattedEventData.app_data?.install_referrer) {
    let response = parseReferrer(formattedEventData.app_data.install_referrer);

    utm_campaign = response.utm_campaign;
    utm_source = response.utm_source;
    utm_content = response.utm_content;
  }

  const newAttributionObj: AttributionObj = {
    event_id: formattedEventData.event_id,
    event_source_url: formattedEventData.event_source_url,
    action: formattedEventData.action_source,

    fbc: formattedEventData.user_data.fbc
      ? formattedEventData.user_data.fbc
      : "",
    fbp: formattedEventData.user_data.fbp
      ? formattedEventData.user_data.fbp
      : "",

    unix: formattedEventData.event_time * 1000,

    ...(utm_source
      ? {
          utm_source,
        }
      : {}),
    ...(utm_campaign
      ? {
          utm_campaign,
        }
      : {}),
    ...(utm_content
      ? {
          utm_content: utm_content,
        }
      : {}),
    installer_package: formattedEventData.app_data?.installer_package
      ? formattedEventData.app_data?.installer_package
      : "",
  };

  return newAttributionObj;
};

export const parseReferrer = (inputStr: string) => {
  // const queryStr = inputStr.split("install_referrer:")[1];

  // Parse using URLSearchParams
  const params = new URLSearchParams(inputStr);

  const utm_source = params.get("utm_source");
  const utm_campaign = params.get("utm_campaign");
  const utm_content = params.get("utm_content");

  return {
    utm_source,
    utm_content: utm_content ? (JSON.parse(utm_content) as utmContent) : {},
    utm_campaign,
  };
};
