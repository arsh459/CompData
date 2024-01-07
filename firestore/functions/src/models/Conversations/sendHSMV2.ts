import axios from "axios";

export interface buttonValue {
  [key: string]: string[];
}

interface templateData {
  name: string;
  languageCode: string;
  bodyValues: string[];
  buttonValues?: buttonValue;
  headerValues?: string[];
}

interface interakitRequestData {
  fullPhoneNumber: string;
  type: "Template";
  template: templateData;
  callbackData?: string;
}

export const sendHSMV2 = async (
  to: string,
  template_id: string,
  bodyValues: string[],
  buttons?: buttonValue,
  headerValues?: string[],
  callbackData?: string,
) => {
  try {
    const requestData: interakitRequestData = {
      fullPhoneNumber: to,
      type: "Template",
      callbackData: callbackData ? callbackData : "",
      template: {
        name: template_id,
        languageCode: "en",
        bodyValues,
        ...(headerValues ? { headerValues: headerValues } : {}),
        ...(buttons ? { buttonValues: buttons } : {}),
      },
    };

    const resp = await axios({
      method: "post",
      url: "https://api.interakt.ai/v1/public/message/",
      headers: {
        Authorization:
          "Basic V19JSTVtY1hBR2Z4SkJEaGt0TzNiSXVWbkVkRll6czdoRFJkZzFxeXBJNDo=",
        "Content-Type": "application/json",
      },
      data: requestData,
    });

    return resp.data as { result: boolean; message: string; id: string };
  } catch (error: any) {
    // console.log(error);
    const message = error.response.data;
    console.log("error.response.data", message);
    if (message.reason && message.reason.includes("Rate limit")) {
      return "ERROR";
    }

    return;
  }
};

export const sendHSMV3 = async (
  to: string,
  template_id: string,
  bodyValues: string[],
  buttons?: buttonValue,
  headerValues?: string[],
  callbackData?: string,
) => {
  const requestData: interakitRequestData = {
    fullPhoneNumber: to,
    type: "Template",
    callbackData: callbackData ? callbackData : "",
    template: {
      name: template_id,
      languageCode: "en",
      bodyValues,
      ...(headerValues ? { headerValues: headerValues } : {}),
      ...(buttons ? { buttonValues: buttons } : {}),
    },
  };

  const resp = await axios({
    method: "post",
    url: "https://api.interakt.ai/v1/public/message/",
    headers: {
      Authorization:
        "Basic V19JSTVtY1hBR2Z4SkJEaGt0TzNiSXVWbkVkRll6czdoRFJkZzFxeXBJNDo=",
      "Content-Type": "application/json",
    },
    data: requestData,
  });

  return resp.data as { result: boolean; message: string; id: string };
};
