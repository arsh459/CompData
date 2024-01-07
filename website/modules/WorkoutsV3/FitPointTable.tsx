import { Task } from "@models/Tasks/Task";

interface Props {
  task?: Task;
}

const FitPointTable: React.FC<Props> = ({ task }) => {
  return (
    <>
      {task?.awardLevels?.length ? (
        <div className="flex flex-col justify-center items-center py-4">
          <h2 className="self-start text-2xl font-extrabold">Fitpoint count</h2>
          <div className="w-full bg-gradient-to-b from-[#3679C2] to-[#519BEB] rounded-xl text-white my-4">
            <h3 className="flex justify-between items-center px-4 py-2 pt-3 text-xl font-bold">
              <span>Task</span>
              <span>Fit Points</span>
            </h3>
            <div className="h-px bg-white" />
            <div className="py-2 pt-4">
              {task?.awardLevels?.map((item, index) => (
                <div
                  key={`${item.text}-${index}`}
                  className="flex justify-between items-center px-4 pb-2"
                >
                  <p className="font-extralight text-base">{item.text}</p>
                  <p className="font-extralight text-base">
                    Earn {item.fitPoints}FP
                  </p>
                </div>
              ))}
            </div>
          </div>
          <p className="text-sm">Note: {task?.note}</p>
        </div>
      ) : null}
    </>
  );
};

export default FitPointTable;
