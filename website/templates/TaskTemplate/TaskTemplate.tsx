import Button from "@components/button";
import { useTasksV2 } from "@hooks/tasks/useTasksV2";
import Link from "next/link";
import Filters from "./Filters";

interface Props {
  gameId?: string;
  badgeId?: string;
}

const TaskTemplate: React.FC<Props> = ({ gameId, badgeId }) => {
  const {
    taskList,
    taskType,
    setTaskType,
    isReel,
    setIsReel,
    sortBy,
    setSortBy,
    collectionType,
    setCollectionType,
  } = useTasksV2();

  return (
    <div className="py-8 px-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4">
        {collectionType === "tasks" ? (
          <Link href={`/admin/tasks/add`}>
            <Button appearance="contained">Add New Task</Button>
          </Link>
        ) : (
          <>
            <Link href={`/admin/tasks`}>
              <Button appearance="contained">Not for Gpt Tasks</Button>
            </Link>
          </>
        )}

        <Filters
          collectionType={collectionType}
          setCollectionType={setCollectionType}
          sortBy={sortBy}
          setSortBy={setSortBy}
          taskType={taskType}
          setTaskType={setTaskType}
          isReel={isReel}
          setIsReel={setIsReel}
        />
      </div>

      <div className="flex flex-wrap">
        {taskList.map((item) => {
          return (
            <div
              key={item.id}
              className="w-full md:w-1/2 lg:w-1/3 p-4 shadow-sm mb-4 border rounded-md"
            >
              {item.baseTaskId ? (
                <></>
              ) : (
                <Link href={`/admin/tasks/duplicate?id=${item.id}`}>
                  <p className="text-green-500 underline">Duplicate</p>
                </Link>
              )}

              <Link
                href={
                  item.baseTaskId
                    ? `/admin/tasks/add?id=${item.id}&&gptgenerated=true`
                    : `/admin/tasks/add?id=${item.id}`
                }
              >
                <div>
                  <p className="font-semibold text-lg">{item.name}</p>
                  <p>{item?.fitPoints}FP</p>

                  {/* <p className="font-medium text-red-500 capitalize pt-1">
                    {item?.taskFrequency}
                  </p> */}
                  {/* <p className="font-medium">
                    {item?.avatar ? "Media exists" : "No Image"}
                  </p>
                  <p className="font-medium">
                    {item.thumbnails ? "Thumbnail exists" : "No Thumbnail"}
                  </p> */}
                  <p className="font-medium text-purple-500">
                    Task type: {item.taskType?.toUpperCase() || "NO ENTRY"}
                  </p>
                  <p className="font-medium text-blue-500">
                    {item.isReel ? "is Reel" : ""}
                  </p>

                  {item.subTasks ? (
                    <p className="text-gray-700">
                      Subtasks: {item.subTasks.length}
                    </p>
                  ) : null}

                  {item.mealTypes ? (
                    <div className="pt-4">
                      <p className="text-gray-700">{item.mealTypes}</p>
                    </div>
                  ) : null}

                  {/* <div className="py-2">
                    <p className="font-semibold">Categories</p>
                    {item?.labels?.map((label) => {
                      return (
                        <p className="text-gray-700" key={label}>
                          {label}
                        </p>
                      );
                    })}
                  </div> */}

                  {/* <div className="py-2">
                    <p className="font-semibold">Games</p>
                    {item?.games?.map((gameId) => {
                      return (
                        <p className="text-green-500" key={gameId}>
                          {getGameName(gameId)}
                        </p>
                      );
                    })}
                  </div> */}
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskTemplate;
