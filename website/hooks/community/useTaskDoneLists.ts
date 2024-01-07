import { useEffect, useState } from "react";
import { db } from "config/firebase";
import {
  collectionGroup,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  DocumentReference,
  DocumentData,
  startAfter,
} from "firebase/firestore";
import { Activity } from "@models/Activities/Activity";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import { Post } from "@models/Posts/Post";
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
import * as Sentry from "@sentry/browser";

export type TaskDoneType = {
  id: string;
  earnedFP: number;
  burnedCal: number;
  userLvl: number;
  userName: string;
  userImg?: CloudinaryMedia | AWSMedia;
  media?: CloudinaryMedia | AWSMedia;
  createdOnStamp: string;
  view: "public" | "private";
};

export const useTaskDoneLists = (taskId?: string) => {
  const [taskDoneLists, setTaskDoneLists] = useState<TaskDoneType[]>([]);
  const [uniqueUsersObj, setUniqueUsersObj] = useState<{
    [uid: string]: Activity[];
  }>({});
  const [lastDoc, setLastDoc] = useState<DocumentData>();

  const onNext = async () => {
    if (lastDoc) {
      const actRef = collectionGroup(db, "activities");
      const q = query(
        actRef,
        where("taskId", "==", taskId),
        orderBy("createdOn", "desc"),
        startAfter(lastDoc),
        limit(3)
      );

      const acts = await getDocs(q);
      const rankedActs: Activity[] = getRankedActs(acts.docs);
      const uniqueUsers: { [uid: string]: Activity[] } = getUniqueUsersOnNext(
        acts.docs,
        uniqueUsersObj
      );
      const postRefs: { [postId: string]: DocumentReference } = getPostRefs(
        acts.docs
      );

      setUniqueUsersObj((prev) => ({ ...prev, ...uniqueUsers }));
      setLastDoc(acts.docs[acts.docs.length - 1]);

      const leaderPromises = getLeaderPromises(uniqueUsers);
      const postPromises = getPostPromises(postRefs);

      const leaders = await Promise.all(leaderPromises);
      const users: { [uid: string]: LeaderBoard } = getUsers(leaders);

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

  // console.log("taskDoneLists", taskDoneLists);

  useEffect(() => {
    const fetchTaskList = async () => {
      try {
        if (taskId) {
          const actRef = collectionGroup(db, "activities");
          const q = query(
            actRef,
            where("taskId", "==", taskId),
            orderBy("createdOn", "desc"),
            // orderBy("calories", "desc"),
            limit(3)
          );

          const acts = await getDocs(q);
          const rankedActs: Activity[] = getRankedActs(acts.docs);
          const uniqueUsers: { [uid: string]: Activity[] } = getUniqueUsers(
            acts.docs
          );
          const postRefs: { [postId: string]: DocumentReference } = getPostRefs(
            acts.docs
          );

          setUniqueUsersObj(uniqueUsers);
          setLastDoc(acts.docs[acts.docs.length - 1]);

          const leaderPromises = getLeaderPromises(uniqueUsers);
          const postPromises = getPostPromises(postRefs);

          const leaders = await Promise.all(leaderPromises);
          const users: { [uid: string]: LeaderBoard } = getUsers(leaders);

          const postsDocs = await Promise.all(postPromises);
          const posts: { [postId: string]: Post } = getPosts(postsDocs);

          const remoteTaskDoneLists: TaskDoneType[] = getTaskDoneLists(
            rankedActs,
            users,
            posts
          );

          setTaskDoneLists(remoteTaskDoneLists);
        }
      } catch (error) {
        console.log("error", error);
        Sentry.captureException(error);
      }
    };

    fetchTaskList();
  }, [taskId]);

  return {
    taskDoneLists,
    onNext,
  };
};
