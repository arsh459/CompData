import { AWSMedia } from "@models/Media/MediaTypeInterface";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import firestore from "@react-native-firebase/firestore";

export interface AntStream {
  uid: string;
  createdOn: number;
  id: string;

  media: AWSMedia[];
}

export const createAntStream = (uid: string): AntStream => {
  return {
    id: uuidv4(),
    createdOn: Date.now(),
    uid,

    media: [],
  };
};

export const saveAntStream = async (antStream: AntStream) => {
  await firestore().collection("antStreams").doc(antStream.id).set(antStream);
};
