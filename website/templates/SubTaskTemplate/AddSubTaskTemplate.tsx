import LoadingModal from "@components/loading/LoadingModal";
import UppyWidgetContainer from "@components/Uppy/UppyWidgetContainer";
// import { useAppConfiguration } from "@hooks/AppConfig/useAppConfig";
import { useSubTask } from "@hooks/subTasks/useSubTask";
import { saveNewTask } from "@hooks/subTasks/utils";
import { useTaskParams } from "@hooks/tasks/useTaskParams";
import { UserInterface } from "@models/User/User";
import { Checkbox, TextField } from "@mui/material";
import BottomNavComV2 from "@templates/listing/Book/BottomNavComV2";
import { useRouter } from "next/router";
import BackIcon from "public/icons/BackIcon";
import { useState } from "react";
import NtritionSubTaaskFields from "./NtritionSubTaaskFields";
import { generateSubTask } from "./utils";

interface Props {
  user: UserInterface;
}

const AddSubTaskTemplate: React.FC<Props> = ({ user }) => {
  const router = useRouter();
  const { id } = useTaskParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [warningMessage, setWarningMessage] = useState<string>("");

  const {
    subTask,
    onUpdateTaskName,
    onUpdateFP,
    onUpdateKcal,
    onMediaUpload,
    onMediaDelete,
    onUpdateNutriFacts,
    onUpdateServingType,
    onUpdateServingValue,
    onUpdateGptServingValue,
    onUpdateGptServingType,
    onUpdateGptGramEquivalent,
    onUpdateGptAssumption,
    // onUpdateWeightType,
    // onUpdateWeightValue,
    onIsExerciseUpdate,
    onUpdateQtyStep,
    updateAISuggest,
  } = useSubTask(id);

  // const { config } = useAppConfiguration();
  // console.log("config", config);

  const onSave = async () => {
    if (loading === false) {
      setWarningMessage("");
      setLoading(true);
      if (subTask) {
        if (subTask.isExercise) {
          try {
            await saveNewTask(subTask);
            router.back();
          } catch (error) {
            console.log("error", error);
          }
        } else if (
          (subTask.servingType && subTask.servingValue) ||
          (subTask.gptInfo &&
            subTask.gptInfo.gptServingValue &&
            subTask.gptInfo.gptServingType)
        ) {
          try {
            await saveNewTask(subTask);
            router.back();
          } catch (error) {
            console.log("error", error);
          }
        } else {
          setWarningMessage(
            "Serving type and serving value needs to be present"
          );
          setLoading(false);
        }
      }
    }
  };

  const onAISuggest = async () => {
    if (
      !confirm(
        "This will update the existing gpt info values, Kindly be careful"
      )
    ) {
      return;
    }
    try {
      setLoading(true);
      if (!subTask?.taskName) {
        setWarningMessage(
          "Please fill the SubTask name for AI Suggest and check if api key is present in config"
        );
        setLoading(false);
      } else {
        let data = await generateSubTask(subTask.taskName);
        if (data.status) {
          updateAISuggest(data.message.data);
          setWarningMessage("Done");
          setLoading(false);
        } else {
          setWarningMessage("Some issue in Ai Suggest");
          setLoading(false);
        }
      }
    } catch (error) {
      setWarningMessage("Some issue in Ai Suggest");
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <LoadingModal fill="#ff735c" width={80} height={80} />
      ) : (
        <div className="p-4">
          <div className="pb-3">
            <p className="text-gray-700 text-4xl font-semibold flex items-center">
              <span onClick={() => router.back()}>
                <BackIcon style={{ height: "30", width: "30", fill: "gray" }} />{" "}
              </span>
              &nbsp; Add SubTask
            </p>
          </div>
          <hr />
          {warningMessage ? (
            <div className="py-4">
              <p className="text-red-500">FIX: {warningMessage}</p>
            </div>
          ) : null}
          <div className="pt-8">
            <TextField
              style={{ width: "100%" }}
              placeholder={"sub task name"}
              label={"SubTask Name"}
              variant="outlined"
              onChange={(val) => onUpdateTaskName(val.target.value)}
              value={subTask?.taskName || ""}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div className="pt-8">
            <UppyWidgetContainer
              media={subTask && subTask.taskMedia ? [subTask.taskMedia] : []}
              leftButtonText={`Add Task Media`}
              onDelete={onMediaDelete}
              uid={user.uid}
              onUpload={(newFiles) => onMediaUpload(newFiles)}
              onRemove={onMediaDelete}
              screenName="admin"
              taskName="admin"
              heading=""
              helperText=""
              height="none"
              filterButton={true}
              tileHeight="small"
              bgWhite={true}
              styles="rounded-none bg-red-500 border-none text-white"
              containerStyles=" border border-dashed border-2 border-slate-500 bg-gray-100 h-64 flex justify-center items-center"
            />
          </div>
          <div className="pt-8">
            <TextField
              style={{ width: "100%" }}
              placeholder={"FitPoints you will earn with this activity"}
              label={"FitPoints"}
              variant="outlined"
              onChange={(val) => onUpdateFP(parseInt(val.target.value))}
              value={subTask?.fp || 0}
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div className="pt-8 flex items-center">
            <Checkbox
              color="primary"
              checked={subTask?.isExercise ? true : false}
              onChange={() =>
                onIsExerciseUpdate(subTask?.isExercise ? false : true)
              }
            />
            <p className="text-gray-700">Is this sub task an exercise</p>
          </div>
          <div className="pt-8 flex items-center">
            <Checkbox
              color="primary"
              disabled={true}
              checked={subTask?.gptInfo ? true : false}
              // onChange={() =>
              //   onIsExerciseUpdate(subTask?.gptInfo ? false : true)
              // }
            />
            <p className="text-gray-700">Is this sub task gpt generated</p>
          </div>
          {subTask?.isExercise ? null : (
            <>
              <NtritionSubTaaskFields
                subTask={subTask}
                onUpdateKcal={onUpdateKcal}
                onUpdateNutriFacts={onUpdateNutriFacts}
                onUpdateServingType={onUpdateServingType}
                onUpdateServingValue={onUpdateServingValue}
                onUpdateGptServingValue={onUpdateGptServingValue}
                onUpdateGptServingType={onUpdateGptServingType}
                onUpdateGptGramEquivalent={onUpdateGptGramEquivalent}
                onUpdateGptAssumption={onUpdateGptAssumption}

                // onUpdateWeightType={onUpdateWeightType}
                // onUpdateWeightValue={onUpdateWeightValue}
              />
              <div className="pt-8">
                <TextField
                  style={{ width: "100%" }}
                  placeholder={"Step to increase/decrease Quantity of sub task"}
                  label={"Quantity Step"}
                  variant="outlined"
                  onChange={(val) =>
                    onUpdateQtyStep(parseFloat(val.target.value) || 0.5)
                  }
                  value={subTask?.qtyStep}
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
            </>
          )}

          <div className="w-20 aspect-1" />
          <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center bg-white shadow-lg">
            <BottomNavComV2
              cta={"Save Activity"}
              onClick={onSave}
              showIcon={false}
            />
            <BottomNavComV2
              cta="AI Suggest"
              onClick={onAISuggest}
              showIcon={false}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AddSubTaskTemplate;
