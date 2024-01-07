import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";
import { Clap, ClapperWithoutClaps, Post } from "@models/Post/Post";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

export const createNewPost = (
  view: "public" | "private",
  gameId: string,
  creatorId: string,
  creatorName?: string,
  creatorImg?: CloudinaryMedia | AWSMedia
): Post => {
  const now = Date.now();
  return {
    id: uuidv4(),
    text: "",
    media: [],
    updatedOn: now,
    createdOn: now,
    gameId,
    creatorId,
    ...(creatorName ? { creatorName: creatorName } : {}),
    ...(creatorImg ? { creatorImg: creatorImg } : {}),
    view,
  };
};

export const createNewClapper = (
  clapperId: string,
  clapReceiverId: string,
  clapperName?: string,
  clapperImage?: CloudinaryMedia | AWSMedia,
  clapReceiverName?: string,
  clapReceiverImg?: CloudinaryMedia | AWSMedia
): ClapperWithoutClaps => {
  return {
    clapperId,
    clapReceiverId,
    isClapperCreator: false,
    id: `clapper-${clapperId}`,
    ...(clapReceiverName ? { clapReceiverName: clapReceiverName } : {}),
    ...(clapReceiverImg ? { clapReceiverImg: clapReceiverImg } : {}),
    ...(clapperName ? { clapperName: clapperName } : {}),
    ...(clapperImage ? { clapperImage: clapperImage } : {}),
    lastClapped: Date.now(),
  };
};

export const createNewClap = (uid: string): Clap => {
  return {
    uid,
    id: uuidv4(),
    createdOn: Date.now(),
  };
};
