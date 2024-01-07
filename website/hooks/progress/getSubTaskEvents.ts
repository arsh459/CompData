import { db } from "@config/firebase";
import { Activity } from "@models/Activities/Activity";
import { SubTask } from "@models/Tasks/Task";
import { doc, getDoc } from "firebase/firestore";

import { Event } from "react-big-calendar";

export const getSubTaskEvents = async (activity: Activity) => {
  const dayEvents: Event[] = [];

  if (activity.subTaskQty && activity.createdOn) {
    const start = activity.createdOn;
    let num: number = 0;
    for (const subTaskId of Object.keys(activity.subTaskQty)) {
      const subTaskObj = await getDoc(doc(db, "subTasks", subTaskId));

      const st = start + num * 5 * 60 * 1000;

      if (subTaskObj.data()) {
        const subTask = subTaskObj.data() as SubTask;

        const consumedQty: number | undefined = activity.subTaskQty[subTask.id];

        const servingTypeValue = subTask.servingType
          ? subTask.servingType
          : subTask.gptInfo && subTask.gptInfo.gptServingType
          ? subTask.gptInfo.gptServingType
          : "pc";
        const servingValueVal = subTask.servingValue
          ? subTask.servingValue
          : subTask.gptInfo && subTask.gptInfo.gptServingValue
          ? subTask.gptInfo.gptServingValue
          : 1;

        const qty = consumedQty ? consumedQty : 0;
        const value = qty * servingValueVal;

        // const protein =
        //   (subTask.nutrientValues?.protein
        //     ? subTask.nutrientValues?.protein
        //     : 0) * qty;
        // const kcal = (subTask.kcal ? subTask.kcal : 0) * qty;
        // const fats =
        //   (subTask.nutrientValues?.fats ? subTask.nutrientValues?.fats : 0) *
        //   qty;
        // const carbs =
        //   (subTask.nutrientValues?.carbs ? subTask.nutrientValues?.carbs : 0) *
        //   qty;

        let title = `${value} ${servingTypeValue} ${subTask.taskName}`;

        dayEvents.push({
          title: title,
          start: new Date(st),
          end: new Date(st + 30 * 60 * 1000),
        });

        num++;
      }
    }
  }

  return dayEvents;
};
