import { useEffect, useState } from "react";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import crashlytics from "@react-native-firebase/crashlytics";
import {
  getLeaderPromises,
  getPostPromises,
  getPostRefs,
  getPosts,
  getRankedActs,
  getTaskDoneLists,
  getUniqueUsers,
  getUniqueUsersOnNext,
  getUsers,
} from "./taskDoneUtils";
import { Activity } from "@models/Activity/Activity";
import { Post } from "@models/Post/Post";
import { UserInterface } from "@models/User/User";
// import * as Sentry from "@sentry/browser";

export type TaskDoneType = {
  id: string;
  earnedFP: number;
  burnedCal: number;
  createdOnStamp: string;
  user: UserInterface;
  post: Post;
};

export const useTaskDoneLists = (taskId?: string) => {
  const [taskDoneLists, setTaskDoneLists] = useState<TaskDoneType[]>([]);
  const [uniqueUsersObj, setUniqueUsersObj] = useState<{
    [uid: string]: Activity[];
  }>({});
  const [lastDoc, setLastDoc] = useState<FirebaseFirestoreTypes.DocumentData>();

  const onNext = async () => {
    if (lastDoc) {
      const actRef = firestore().collectionGroup("activities"); // collectionGroup(db, "activities");
      const q = actRef
        .where("taskId", "==", taskId)
        .orderBy("createdOn", "desc")
        .startAfter(lastDoc)
        .limit(3);

      const acts = await q.get();
      const rankedActs: Activity[] = getRankedActs(acts.docs);
      const uniqueUsers: { [uid: string]: Activity[] } = getUniqueUsersOnNext(
        acts.docs,
        uniqueUsersObj
      );
      const postRefs: {
        [postId: string]: FirebaseFirestoreTypes.DocumentReference;
      } = getPostRefs(acts.docs);

      setUniqueUsersObj((prev) => ({ ...prev, ...uniqueUsers }));
      setLastDoc(acts.docs[acts.docs.length - 1]);

      const leaderPromises = getLeaderPromises(uniqueUsers);
      const postPromises = getPostPromises(postRefs);

      const leaders = await Promise.all(leaderPromises);
      const users: { [uid: string]: UserInterface } = getUsers(leaders);

      const postsDocs = await Promise.all(postPromises);
      const posts: { [postId: string]: Post } = getPosts(postsDocs);

      const remoteTaskDoneLists: TaskDoneType[] = getTaskDoneLists(
        rankedActs,
        users,
        posts
      );

      setTaskDoneLists((prev) => [...prev, ...remoteTaskDoneLists]);
    }
  };

  useEffect(() => {
    const fetchTaskList = async () => {
      try {
        if (taskId) {
          const actRef = firestore().collectionGroup("activities");
          const q = actRef
            .where("taskId", "==", taskId)
            .orderBy("createdOn", "desc")
            .limit(3);

          const acts = await q.get();
          const rankedActs: Activity[] = getRankedActs(acts.docs);
          const uniqueUsers: { [uid: string]: Activity[] } = getUniqueUsers(
            acts.docs
          );
          const postRefs: {
            [postId: string]: FirebaseFirestoreTypes.DocumentReference;
          } = getPostRefs(acts.docs);

          setUniqueUsersObj(uniqueUsers);
          setLastDoc(acts.docs[acts.docs.length - 1]);

          const leaderPromises = getLeaderPromises(uniqueUsers);
          const postPromises = getPostPromises(postRefs);

          const leaders = await Promise.all(leaderPromises);
          const users: { [uid: string]: UserInterface } = getUsers(leaders);

          const postsDocs = await Promise.all(postPromises);
          const posts: { [postId: string]: Post } = getPosts(postsDocs);

          const remoteTaskDoneLists: TaskDoneType[] = getTaskDoneLists(
            rankedActs,
            users,
            posts
          );

          setTaskDoneLists(remoteTaskDoneLists);
        }
      } catch (error: any) {
        console.log("error", error);
        crashlytics().recordError(error);
        // Sentry.captureException(error);
      }
    };

    fetchTaskList();
  }, [taskId]);

  return {
    taskDoneLists,
    onNext,
  };
};
