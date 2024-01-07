import { PlayBackId } from "../../main/Https/sbAssetFunc/interface";
import { AWSMedia, CloudinaryMedia } from "../sbEvent/CloudinaryMedia";
import { sessionTypes } from "../sbEvent/sbEvent";

export interface Post {
  id: string;
  text: string;
  media: (CloudinaryMedia | AWSMedia)[];
  updatedOn: number;
  createdOn?: number;

  eventId?: string;
  antStreamId?: string;

  creatorId: string;
  creatorName?: string;
  creatorImg?: CloudinaryMedia | AWSMedia;

  // if to be graded
  byAdmin?: boolean;
  score?: number;

  communityId?: string;
  gameId?: string;

  sessionId?: string;
  sessionName?: string;

  cohortId?: string;

  numClaps?: number;
  numCheckins?: number;

  view: "public" | "private";
  visibleTo?: visibleToIds;

  sessionType?: sessionTypes;
  scheduledOnTime?: number;

  pinned?: boolean;

  postContent?: "leaderboard";
  leaderboardEventId?: string;
  teamName?: string;

  day?: number;

  taskId?: string;
  taskName?: string;
  streamId?: string;

  postType?: "announcement" | "spotlight";
  muxStreamIds?: string[];
  muxPlaybackIds?: { [streamId: string]: PlayBackId[] };
  // live?: boolean;
}

export interface visibleToIds {
  [uid: string]: boolean;
}

export interface ClapperWithoutClaps {
  id: string; // clapper-${clapperId}
  clapperId: string;
  clapperName?: string;
  clapperImage?: CloudinaryMedia;
  isClapperCreator: boolean;

  clapReceiverId: string;
  clapReceiverName?: string;
  clapReceiverImg?: CloudinaryMedia;

  lastClapped: number;
}

export interface Clapper extends ClapperWithoutClaps {
  numClaps: number;
}

export interface Clap {
  id: string;
  uid: string;
  // userName?: string;
  // userImg?: CloudinaryMedia;

  createdOn: number;
}
