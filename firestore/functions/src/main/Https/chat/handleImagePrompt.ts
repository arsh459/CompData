import { makeDaliRequest } from "./handleGPTQuery";
import * as admin from "firebase-admin";

export const handleGroupImagePrompt = async (
  title: string,
  uid: string,
  roomId: string,
) => {
  const data = await makeDaliRequest(
    createImagePrompt(title),
    uid,
    "256x256",
    "url",
  );

  if (data.length && data[0].url) {
    // console.log("data", data[0]);

    await admin
      .firestore()
      .collection("users")
      .doc(uid)
      .collection("rooms")
      .doc(roomId)
      .update({
        chatImage: data[0].url,
      });
  }
};

const createImagePrompt = (title: string) => {
  return `Create a vector icon to depict - ${title}. The icon should have no text and should be minimal`;
};
