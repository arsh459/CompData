import axios from "axios";
import { ParsedUrlQuery } from "querystring";

interface ResyncQuery {
  day?: string;
  uid?: string;
}

export const parseResyncQuery = (query: ParsedUrlQuery): ResyncQuery => {
  return {
    uid: query.uid && typeof query.uid === "string" ? query.uid : "",
    day: query.day && typeof query.day === "string" ? query.day : "",
  };
};

interface firebaseFunctionResponse {
  status?: "success";
  details?: { [uid: string]: boolean };
}

interface firebaseUserFunctionResponse {
  status?: "success";
  details?: { [uid: string]: { [day: string]: boolean } };
}

export const terraResyncExternalCall = async (uid: string, day: string) => {
  try {
    const response = await axios({
      url: `${process.env.BACKEND_URL}/reconcileTerraDayUser`,
      // url: "http://localhost:5001/holidaying-prod/asia-south1/reconcileTerraDayUser",
      method: "POST",
      data: {
        uid,
        day,
      },
    });

    const data = response.data as firebaseFunctionResponse;

    // console.log("data", data);
    return data;
  } catch (error) {
    console.log("error", error);
    return {
      status: "failed",
    };
  }
};

export const terraResyncUserExternalCall = async (uid: string) => {
  try {
    const response = await axios({
      url: `${process.env.BACKEND_URL}/reconcileTerraUser`,
      //   url: "http://localhost:5001/holidaying-prod/asia-south1/reconcileTerraUser",
      method: "POST",
      data: {
        uid,
      },
    });

    const data = response.data as firebaseUserFunctionResponse;
    return data;
  } catch (error) {
    console.log("error");
    return {
      status: "failed",
    };
  }
};
