import { format } from "date-fns";
import { db } from "@config/firebase";
import { Post } from "@models/Posts/Post";
import { TaskDoneType } from "./useTaskDoneLists";
import { Activity } from "@models/Activities/Activity";
import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import {
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
} from "firebase/firestore";

export const getRankedActs = (acts: DocumentData[]) => {
  const rankedActs: Activity[] = [];
  for (const act of acts) {
    const remoteAct = act.data() as Activity;

    rankedActs.push(remoteAct);
  }
  return rankedActs;
};

export const getPostRefs = (acts: DocumentData[]) => {
  const postRefs: { [postId: string]: DocumentReference } = {};
  for (const act of acts) {
    const remoteAct = act.data() as Activity;
    if (remoteAct.postRef) {
      postRefs[remoteAct.postId] = remoteAct.postRef;
    }
  }
  return postRefs;
};

export const getUniqueUsers = (acts: DocumentData[]) => {
  const uniqueUsers: { [uid: string]: Activity[] } = {};
  for (const act of acts) {
    const remoteAct = act.data() as Activity;
    if (uniqueUsers[remoteAct.authorUID]) {
      uniqueUsers[remoteAct.authorUID].push(remoteAct);
    } else {
      uniqueUsers[remoteAct.authorUID] = [remoteAct];
    }
  }
  return uniqueUsers;
};

export const getUniqueUsersOnNext = (
  acts: DocumentData[],
  uniqueUsersObj: { [uid: string]: Activity[] }
) => {
  const uniqueUsers: { [uid: string]: Activity[] } = {};
  for (const act of acts) {
    const remoteAct = act.data() as Activity;
    if (
      uniqueUsersObj[remoteAct.authorUID] &&
      uniqueUsers[remoteAct.authorUID]
    ) {
      uniqueUsers[remoteAct.authorUID].push(remoteAct);
    } else {
      uniqueUsers[remoteAct.authorUID] = [remoteAct];
    }
  }
  return uniqueUsers;
};

export const getLeaderPromises = (uniqueUsers: {
  [uid: string]: Activity[];
}) => {
  const leaderPromises = [];
  for (const uid of Object.keys(uniqueUsers)) {
    leaderPromises.push(getDoc(doc(db, "leaderBoard", `leader-${uid}`)));
  }
  return leaderPromises;
};

export const getPostPromises = (postRefs: {
  [postId: string]: DocumentReference;
}) => {
  const postPromises = [];
  for (const actId of Object.keys(postRefs)) {
    postPromises.push(getDoc(postRefs[actId]));
  }
  return postPromises;
};

export const getUsers = (leaders: DocumentData[]) => {
  const users: { [uid: string]: LeaderBoard } = {};
  for (const leader of leaders) {
    const user = leader.data() as LeaderBoard;
    users[user.uid] = user;
  }
  return users;
};

export const getPosts = (postsDocs: DocumentData[]) => {
  const posts: { [postId: string]: Post } = {};
  for (const post of postsDocs) {
    const remotePost = post.data() as Post;
    posts[post.id] = remotePost;
  }
  return posts;
};

export const getTaskDoneLists = (
  rankedActs: Activity[],
  users: { [uid: string]: LeaderBoard },
  posts: { [postId: string]: Post }
) => {
  const remoteTaskDoneLists: TaskDoneType[] = [];
  for (const act of rankedActs) {
    const user = users[act.authorUID];

    const timestamp = format(
      new Date(act.createdOn ? act.createdOn : act.updatedOn),
      "h:mmaaa d MMM"
    );

    remoteTaskDoneLists.push({
      id: act.postId,
      userLvl: user.userLevelV2 ? user.userLevelV2 : 0,
      userName: user.name ? user.name : `Athlete-${user.uid.slice(0, 4)}`,
      userImg: user.profileImage,
      createdOnStamp: timestamp,
      media: posts[act.postId]?.media[0],
      burnedCal: act.calories ? act.calories : 0,
      earnedFP: act.calories ? Math.floor(act.calories / 300) : 0,
      view: posts[act.postId].view,
    });
  }
  return remoteTaskDoneLists;
};
