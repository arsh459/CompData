import Button from "@components/button";
import { useSubTasksV2 } from "@hooks/subTasks/useSubtasksV2";

import Link from "next/link";
import Filters from "./Filters";

interface Props {}

const SubTaskTemplate: React.FC<Props> = ({}) => {
  const {
    subTaskList,
    isExercise,
    setIsExercise,
    collectionType,
    setCollectionType,
  } = useSubTasksV2();

  return (
    <div className="py-8 px-2">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4">
        <div className="flex pb-4 justify-between ">
          <Link href={`/admin/subTasks/add`}>
            <Button appearance="contained">Add New Sub Task</Button>
          </Link>
        </div>
        <Filters
          isExercise={isExercise}
          setIsExercise={setIsExercise}
          collectionType={collectionType}
          setCollectionType={setCollectionType}
        />
      </div>

      {subTaskList.length ? (
        <div className="flex flex-wrap">
          {subTaskList.map((item) => {
            return (
              <div
                key={item.id}
                className="w-full md:w-1/2 lg:w-1/3 p-4 shadow-sm mb-4 border rounded-md"
              >
                <Link href={`/admin/subTasks/add?id=${item.id}`}>
                  <>
                    <p className="font-semibold text-lg">{item.id}</p>
                    <p className="font-semibold text-lg">{item.taskName}</p>
                    <p>{item.fp}FP</p>
                    {item.isExercise ? (
                      <>
                        <p className="font-medium text-red-500 capitalize pt-1">
                          isExercise: true
                        </p>
                        {/* <p className="font-medium text-gray-500 capitalize pt-1">
                          Start time: {item.timeStart}
                        </p> */}
                      </>
                    ) : (
                      <>
                        <p className="font-medium text-red-500 capitalize pt-1">
                          {item.kcal} KCal
                        </p>
                        <p className="font-medium text-gray-500 text-sm capitalize pt-1">
                          {item.nutrientValues?.carbs} Carbs
                        </p>
                        <p className="font-medium text-gray-500 text-sm capitalize pt-1">
                          {item.nutrientValues?.fats} Fats
                        </p>
                        <p className="font-medium text-gray-500 text-sm capitalize pt-1">
                          {item.nutrientValues?.protein} Protein
                        </p>
                        <p className="font-medium text-gray-500 text-sm capitalize pt-1">
                          {item.nutrientValues?.fibre} Fiber
                        </p>
                      </>
                    )}

                    <p className="font-medium">
                      {item.taskMedia ? "Media exists" : "No Image"}
                    </p>

                    <p className="font-medium">
                      {item.gptInfo ? "Gpt generated" : ""}
                    </p>
                  </>
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="font-semibold text-lg">No SubTask found.</p>
      )}
    </div>
  );
};

export default SubTaskTemplate;
