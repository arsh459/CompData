import axios from "axios";
import { ParsedUrlQuery } from "querystring";
import { db } from "@config/firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

export const setAwardReport = async (params: AwaedReqParams) => {
  //   console.log({ params });
  try {
    await axios({
      url: "/api/award",
      method: "POST",
      params,
    });
  } catch (error) {
    console.log("error", error);
  }
};

export const parseAwardBadge = (query: ParsedUrlQuery): AwaedReqParams => {
  const now = Date.now();
  return {
    uid: query.uid && typeof query.uid === "string" ? query.uid : "",
    id: query.id && typeof query.id === "string" ? query.id : "",
    start:
      query.start && typeof query.start === "string"
        ? parseInt(query.start)
        : now,
    end: query.end && typeof query.end === "string" ? parseInt(query.end) : now,
  };
};

export interface AwaedReqParams {
  uid?: string;
  id?: string;
  start?: number;
  end?: number;
}

export const pushReport = async (uid: string, achieverId: string) => {
  await updateDoc(doc(db, "users", uid), {
    unseenAwards: arrayUnion(achieverId),
  });
};

export const popReport = async (uid: string, achieverId: string) => {
  await updateDoc(doc(db, "users", uid), {
    unseenAwards: arrayRemove(achieverId),
  });
};
