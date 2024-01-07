import { format } from "date-fns";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { TaskDoneType } from "./useTaskDoneLists";
import { Activity } from "@models/Activity/Activity";
import { Post } from "@models/Post/Post";
import { UserInterface } from "@models/User/User";

export const getRankedActs = (acts: FirebaseFirestoreTypes.DocumentData[]) => {
  const rankedActs: Activity[] = [];
  for (const act of acts) {
    const remoteAct = act.data() as Activity;

    rankedActs.push(remoteAct);
  }
  return rankedActs;
};

export const getPostRefs = (acts: FirebaseFirestoreTypes.DocumentData[]) => {
  const postRefs: {
    [postId: string]: FirebaseFirestoreTypes.DocumentReference;
  } = {};
  for (const act of acts) {
    const remoteAct = act.data() as Activity;
    if (remoteAct.postRef) {
      postRefs[remoteAct.postId] = remoteAct.postRef;
    }
  }
  return postRefs;
};

export const getUniqueUsers = (acts: FirebaseFirestoreTypes.DocumentData[]) => {
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
  acts: FirebaseFirestoreTypes.DocumentData[],
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
    leaderPromises.push(firestore().collection("users").doc(uid).get());
  }
  return leaderPromises;
};

export const getPostPromises = (postRefs: {
  [postId: string]: FirebaseFirestoreTypes.DocumentReference;
}) => {
  const postPromises = [];
  for (const actId of Object.keys(postRefs)) {
    postPromises.push(
      postRefs[actId].get()
      // getDoc(postRefs[actId])
    );
  }
  return postPromises;
};

export const getUsers = (leaders: FirebaseFirestoreTypes.DocumentData[]) => {
  const users: { [uid: string]: UserInterface } = {};
  for (const leader of leaders) {
    const user = leader.data() as UserInterface | undefined;
    if (user) users[user.uid] = user;
  }
  return users;
};

export const getPosts = (postsDocs: FirebaseFirestoreTypes.DocumentData[]) => {
  const posts: { [postId: string]: Post } = {};
  for (const post of postsDocs) {
    const remotePost = post.data() as Post;
    posts[post.id] = remotePost;
  }
  return posts;
};

export const getTaskDoneLists = (
  rankedActs: Activity[],
  users: { [uid: string]: UserInterface },
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
      createdOnStamp: timestamp,
      burnedCal: act.calories ? act.calories : 0,
      earnedFP: act.calories ? Math.floor(act.calories / 300) : 0,
      post: posts[act.postId],
      user: user,
    });
  }
  return remoteTaskDoneLists;
};
