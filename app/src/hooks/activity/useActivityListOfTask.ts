import { Activity, ActivityUserPts } from "@models/Activity/Activity";
import { Task, TaskTypes } from "@models/Tasks/Task";
import firestore from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";

export interface ListActivity {
  createdOn: number;
  userFP: number;
  taskFp: number;
  taskType: TaskTypes;
}

export interface sectionListActivityItem {
  taskName: string;
  totalFp: number;
  data: ListActivity[];
}

export const useActivityListOfTask = (activityListArr: ActivityUserPts[]) => {
  const [isLoading, setIsLoading] = useState(false);
  const [activitySectionList, setActivitySectionList] = useState<
    sectionListActivityItem[]
  >([]);

  useEffect(() => {
    const getActivities = async () => {
      if (activityListArr) {
        setIsLoading(true);
        const localActivityObj: {
          [id: string]: Activity[];
        } = {};
        const localAllSection: sectionListActivityItem[] = [];

        const remoteActDocPromises = activityListArr.map(({ actId, uid }) => {
          return firestore()
            .collection("users")
            .doc(uid)
            .collection("activities")
            .doc(actId)
            .get();
        });
        const remoteActDocs = await Promise.all(remoteActDocPromises);

        remoteActDocs.forEach((remoteActDoc) => {
          if (remoteActDoc.data()) {
            const remoteActivity = remoteActDoc.data() as Activity;
            if (remoteActivity.taskId) {
              if (localActivityObj.hasOwnProperty(remoteActivity.taskId)) {
                localActivityObj[remoteActivity.taskId].push(remoteActivity);
              } else {
                localActivityObj[remoteActivity.taskId] = [remoteActivity];
              }
            }
          }
        });

        const remoteTaskDocPromises = Object.keys(localActivityObj).map(
          (taskId) => {
            return firestore().collection("tasks").doc(taskId).get();
          }
        );
        const remoteTaskDocs = await Promise.all(remoteTaskDocPromises);

        remoteTaskDocs.forEach((remoteTaskDoc) => {
          if (remoteTaskDoc.exists) {
            const remoteTask = remoteTaskDoc.data() as Task;
            const itemList: ListActivity[] = [];

            if (remoteTask && remoteTask.name) {
              let totalFp = 0;
              localActivityObj[remoteTask.id].forEach((activity) => {
                const userFP = Math.round(
                  (activity?.calories ? activity.calories : 0) / 300
                );
                if (activity?.createdOn && remoteTask.fitPoints) {
                  totalFp += userFP;
                  itemList.push({
                    userFP,
                    createdOn: activity.createdOn,
                    taskFp: remoteTask.fitPoints,
                    taskType: remoteTask.taskType
                      ? remoteTask.taskType
                      : "workout",
                  });
                }
              });
              itemList.sort((a, b) => b.createdOn - a.createdOn);
              localAllSection.push({
                taskName: remoteTask.name,
                totalFp,
                data: itemList,
              });
            }
          }
        });

        setActivitySectionList(localAllSection);
        setIsLoading(false);
      }
    };
    getActivities();
  }, [activityListArr]);

  return { activitySectionList, isLoading };
};
