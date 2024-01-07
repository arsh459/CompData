// import { HSMLocalizableParameters } from "messagebird";
import axios from "axios";
import { HSMLocalizableParameters } from "messagebird/types";
import * as functions from "firebase-functions";
// const messagebird = initMB("Frn0eTpEutxXMh8tjl8imKhcR");

// const messagebird = require("messagebird")("Frn0eTpEutxXMh8tjl8imKhcR");
// var fetch = require("node-fetch");

export const whatsappNameSpace = "0d1b2e85_784d_48de_8a1f_d634ad5289e6";

export interface Param {
  default: string;
}

export const sendHSM = async (
  to: string,
  channelId: string,
  templateName: string,
  // deliverName: string,
  // name: string,
  // cost: string,
  // joinURL: string,
  params: HSMLocalizableParameters[],
) => {
  try {
    const data = convertHSMData({
      to: to,
      from: channelId,
      channelId: channelId,
      type: "hsm",
      content: {
        hsm: {
          namespace: whatsappNameSpace,
          templateName: templateName,
          language: {
            policy: "deterministic",
            code: "en",
          },
          params: params,
        },
      },
    });

    // console.log("data", data);

    // testing
    await axios({
      method: "post",
      url: "https://conversations.messagebird.com/v1/conversations/start",
      headers: {
        Authorization: "AccessKey Frn0eTpEutxXMh8tjl8imKhcR",
        "Content-Type": "application/json; charset=utf-8",
      },
      data: data,
    });

    // setTimeout(() => {
    //   console.log(params.map((item) => item.default).join(", "));
    // }, 5000);
  } catch (error) {
    console.log("error", error);
    functions.logger.log("error sendHSM:", to, templateName);
    functions.logger.log(
      "params sendHSM:",
      params.map((item) => item.default).join(", "),
    );
  }
};

interface HSMData {
  to: string;
  from: string;
  channelId: string;
  type: "hsm";
  content: {
    hsm: {
      namespace: string;
      templateName: string;
      language: {
        policy: string;
        code: string;
      };
      params: Param[];
    };
  };
}

export const convertHSMForRegistration = (
  to: string,
  deliverName: string,
  name: string,
  cost: string,
  joinURL: string,
  templateName: string,
  channelId: string,
) => {
  const data = `{\n  "content": {\n    "hsm": {\n      "namespace": "${whatsappNameSpace}",\n      "language": {\n        "code": "en"\n      },\n      "templateName": "${templateName}",\n      "params": [{"default": "${deliverName}"},\n      {"default": "${name}"},\n      {"default": "${cost}"},\n      {"default": "${joinURL}"}]\n    }\n  },\n  "to": "${to}",\n  "type": "hsm",\n  "channelId":"${channelId}",\n  "from": "${channelId}"\n}`;
  return data;
};

const convertHSMData = (hsmData: HSMData): string => {
  return `{
  "content": {
    "hsm": {
      "namespace": "${whatsappNameSpace}",
      "language": {
        "code": "en",
        "policy": "deterministic"
      },
      "templateName": "${hsmData.content.hsm.templateName}",
      "params": [${hsmData.content.hsm.params
        .map((item) => parseParam(item))
        .join(",")}]
    }
  },
  "to": "${hsmData.to}",
  "type": "hsm",
  "channelId":"${hsmData.channelId}",
  "from": "${hsmData.channelId}"
}`;
};

const parseParam = (param: Param) => {
  return `{"default": "${param.default}"}`;
};
