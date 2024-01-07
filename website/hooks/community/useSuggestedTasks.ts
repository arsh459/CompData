import { Task } from "@models/Tasks/Task";
import axios from "axios";
import { useEffect, useState } from "react";

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

  // console.log("state   ", state);

  useEffect(() => {
    const getSuggestedTasks = async () => {
      // console.log("gameIds", gameIds);
      const splitIds = gameIds?.split(",");
      // console.log("sploutIds", splitIds);
      if (gameIds && userId && canFetch && splitIds && state === "PENDING") {
        setFetchingState("FETCHING");

        const uniqueGames: { [gameId: string]: boolean } = {};
        for (const id of splitIds) {
          uniqueGames[id] = true;
        }

        // console.log("hi", uniqueGames);

        axios({
          url: "/api/tasks/suggestedTasksV3",
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

          // console.log("tasks", tasks);
          setSuggestedTasks(tasks);
          setFetchingState("DONE");
        });

        // console.log("here");
      }
    };

    getSuggestedTasks();
  }, [userId, canFetch, gameIds, state]);

  return {
    suggestedTasks,
    loading: state === "DONE" ? false : true,
  };
};
