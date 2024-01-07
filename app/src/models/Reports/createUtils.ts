import { ReportInterface } from "./Report";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import firestore from "@react-native-firebase/firestore";

export const createNewReport = (
  userId: string | undefined,
  reporterId: string | undefined,
  postId: string | undefined,
  message: string
): ReportInterface => {
  return {
    id: uuidv4(),
    createdOn: Date.now(),
    reporterId: reporterId ? reporterId : "",
    postId: postId ? postId : "",
    userId: userId ? userId : "",
    message,
  };
};

export const saveNewReport = async (report: ReportInterface) => {
  await firestore().collection("reports").doc(report.id).set(report);
};

export const addBlockedUser = async (uid: string, toBlockUID: string) => {
  await firestore()
    .collection("users")
    .doc(uid)
    .update({
      blockedUIDs: firestore.FieldValue.arrayUnion(toBlockUID),
    });
};

export const unblockUser = async (uid: string, unblockUID: string) => {
  await firestore()
    .collection("users")
    .doc(uid)
    .update({
      blockedUIDs: firestore.FieldValue.arrayRemove(unblockUID),
    });
};

export const addBlockedPost = async (uid: string, toBlockPostId: string) => {
  await firestore()
    .collection("users")
    .doc(uid)
    .update({
      blockedPostIds: firestore.FieldValue.arrayUnion(toBlockPostId),
    });
};
