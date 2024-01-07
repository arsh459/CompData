import { useTasks } from "@hooks/tasks/useTasks";
import { handleActivityTaskDumpRequest } from "@models/User/summary";
import { getGameName } from "@templates/TaskTemplate/utils";
import { useState } from "react";

interface Props {}

const DownloadTaskTemplate: React.FC<Props> = ({}) => {
  const { taskList } = useTasks();

  const [loading, setLoading] = useState<boolean>(false);

  const csvToFile = (response: string, fileName: string) => {
    var blob = new Blob([response], { type: "text/csv;charset=utf-8;" });

    var link = document.createElement("a");
    if (link.download !== undefined) {
      var url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", fileName);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const onTaskSummary = async (id: string, name?: string) => {
    setLoading(true);

    const response = await handleActivityTaskDumpRequest(id);

    csvToFile(response, `${name}_${new Date().toLocaleDateString()}.csv`);

    setLoading(false);
  };

  return (
    <div className="px-4 py-4">
      <p className="text-3xl text-gray-700 font-semibold pb-10">
        DOWNLOAD USER TASKS
      </p>
      {loading ? <p className="text-xl font-semibold ">Loading...</p> : null}
      <div className="flex flex-wrap">
        {!loading &&
          taskList.map((item) => {
            return (
              <div
                onClick={() => onTaskSummary(item.id, item.name)}
                key={item.id}
                className="w-full md:w-1/2 lg:w-1/3 p-4 shadow-sm mb-4 border rounded-md"
              >
                <div>
                  <p className="font-semibold text-lg">{item.name}</p>
                  <p>{item.fitPoints}FP</p>

                  <p className="font-medium text-red-500 capitalize pt-1">
                    {item.taskFrequency}
                  </p>

                  <div className="py-2">
                    <p className="font-semibold">Categories</p>
                    {item.labels?.map((label) => {
                      return (
                        <p className="text-gray-700" key={label}>
                          {label}
                        </p>
                      );
                    })}
                  </div>

                  <div className="py-2">
                    <p className="font-semibold">Games</p>
                    {item.games?.map((gameId) => {
                      return (
                        <p className="text-green-500" key={gameId}>
                          {getGameName(gameId)}
                        </p>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default DownloadTaskTemplate;
