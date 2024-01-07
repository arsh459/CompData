import { getAllTasks, saveTaskSummaries } from "../../../models/Task/getUtils";
import {
  bgList,
  headerBgList,
  labelType,
  Task,
  TaskSummary,
} from "../../../models/Task/Task";
import { v4 as uuidv4 } from "uuid";
import { getSbEventById } from "../../../models/sbEvent/getUtils";
import { TaskGroup } from "../../../models/sbEvent/sbEvent";

export const handleTaskSummary = async () => {
  const allTasks = await getAllTasks();

  const gameTasks: { [gameId: string]: Task[] } = {};

  for (const task of allTasks) {
    // console.log("task", task.name, task.level, task.games);
    if (task.games) {
      for (const gameId of task.games) {
        if (!gameTasks[gameId]) {
          gameTasks[gameId] = [task];
        } else {
          gameTasks[gameId].push(task);
        }
      }
    }
  }

  // console.log("task.games", Object.keys(gameTasks));

  //   const gameTaskSummaries: { [gId: string]: TaskSummary[] } = {};
  for (const gId of Object.keys(gameTasks)) {
    const game = await getSbEventById(gId);

    // console.log("game", game?.name, game?.configuration);

    if (game?.configuration?.taskGroups) {
      const gameSummaries = createTaskSummariesV2(
        gameTasks[gId],
        game?.configuration?.taskGroups,
      );

      // console.log("gameSummaries", gameSummaries);
      // throw new Error("HI");

      await saveTaskSummaries(gId, gameSummaries);
    } else {
      const gameSummaries = createTaskSummaries(gameTasks[gId]);
      await saveTaskSummaries(gId, gameSummaries);
    }
  }
};

const createTaskSummariesV2 = (tasks: Task[], taskGroups: TaskGroup[]) => {
  const summaries: TaskSummary[] = [];
  let i: number = 1;
  for (const taskGroup of taskGroups) {
    // console.log("taskGroup", taskGroup);
    const lvlGroupTasks = getTasksForGroup_level(tasks, taskGroup);
    // console.log("lvlGroupTasks", lvlGroupTasks.length);

    summaries.push(
      createTaskSummary(lvlGroupTasks, taskGroup.label, taskGroup.name, i),
    );

    i++;
  }

  return summaries;
};

const getTasksForGroup_level = (tasks: Task[], taskGroup: TaskGroup) => {
  const lvls = taskGroup.values;

  const filteredTasks: Task[] = [];
  for (const task of tasks) {
    const tskLvl = task.level ? task.level : 0;
    if (lvls.includes(tskLvl)) {
      filteredTasks.push(task);
    }
  }

  return filteredTasks;
};

const createTaskSummaries = (tasks: Task[]): TaskSummary[] => {
  const tkBuckets = createTaskBuckets(tasks);
  const summaries: TaskSummary[] = [];
  // console.log("taskBuckets", Object.keys(tkBuckets));
  for (const bucket of Object.keys(tkBuckets)) {
    summaries.push(createTaskSummary(tkBuckets[bucket], bucket as labelType));
  }

  return summaries;
};

const createTaskSummary = (
  tasks: Task[],
  label: labelType,
  subheading?: string,
  priority?: number,
): TaskSummary => {
  // console.log("label", label, bgList[label], headerBgList[label]);
  return {
    name: label,
    thumbnail: bgList[label],
    headerThumbnail: headerBgList[label],
    subheading: subheading ? subheading : "",

    numTasks: tasks.length,

    summaryId: uuidv4(),
    priority: priority ? priority : 1,
  };
};

const createTaskBuckets = (tasks: Task[]) => {
  const taskBuckets: { [label: string]: Task[] } = {};
  for (const tk of tasks) {
    if (tk.labels) {
      for (const label of tk.labels) {
        if (taskBuckets[label]) {
          taskBuckets[label].push(tk);
        } else {
          taskBuckets[label] = [tk];
        }
      }
    }
  }

  return taskBuckets;
};
