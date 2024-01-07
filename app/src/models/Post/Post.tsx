import { sessionTypes } from "@models/Event/Event";
import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";
import { playbackId } from "@modules/Workout/ProgramDetails/TaskSubmit/muxUtils";
// import { playbackId } from "@modules/Workout/ProgramDetails/TaskSubmit/muxUtils";

export type postTypes = "announcement" | "spotlight";
export interface Post {
  id: string;
  text: string;
  media: (CloudinaryMedia | AWSMedia)[];
  updatedOn: number;
  createdOn?: number;
  trueUnix?: number;

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
  muxPlaybackIds?: { [streamId: string]: playbackId[] };
  // live?: boolean;
}

export interface visibleToIds {
  [uid: string]: boolean;
}

export interface ClapperWithoutClaps {
  id: string; // clapper-${clapperId}
  clapperId: string;
  clapperName?: string;
  clapperImage?: CloudinaryMedia | AWSMedia;
  isClapperCreator: boolean;

  clapReceiverId: string;
  clapReceiverName?: string;
  clapReceiverImg?: CloudinaryMedia | AWSMedia;

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
