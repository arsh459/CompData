import { Task } from "@models/Tasks/Task";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "react-native-dotenv";
import crashlytics from "@react-native-firebase/crashlytics";

export const useSuggestedTasks = (
  canFetch: boolean,
  gameIds?: string,
  userId?: string,
  userLvl?: number
) => {
  const [suggestedTasks, setSuggestedTasks] = useState<Task[]>([]);
  // const [loading, setIsLoading] = useState<boolean>(false);
  const [state, setFetchingState] = useState<"PENDING" | "FETCHING" | "DONE">(
    "PENDING"
  );

  useEffect(() => {
    const getSuggestedTasks = async () => {
      const splitIds = gameIds?.split(",");
      if (gameIds && userId && canFetch && splitIds && state === "PENDING") {
        setFetchingState("FETCHING");

        const uniqueGames: { [gameId: string]: boolean } = {};
        for (const id of splitIds) {
          uniqueGames[id] = true;
        }

        try {
          axios({
            url: `${API_BASE_URL}/api/tasks/suggestedTasksV3`,
            method: "GET",
            params: {
              uid: userId,
              gameIds: Object.keys(uniqueGames),
              // level: userLvl ? userLvl : 0,
              num: 8,
            },
          }).then((response) => {
            const { tasks } = response.data as {
              tasks: Task[];
            };

            setSuggestedTasks(tasks);
            setFetchingState("DONE");
          });
        } catch (error: any) {
          console.log("error in suggestedTasks", error);
          crashlytics().recordError(error);
        }
      }
    };

    getSuggestedTasks();
  }, [userId, canFetch, gameIds, state]);

  return {
    suggestedTasks,
    loading: state === "DONE" ? false : true,
  };
};
