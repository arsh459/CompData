import { useState } from "react";
import { useRouter } from "next/router";
import { Checkbox, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import { MenuItem } from "@mui/material";
// import DateFnsUtils from "@date-io/date-fns";

import { UserInterface } from "@models/User/User";
import { saveNewTask } from "@models/Tasks/createUtils";

import BottomNavComV2 from "@templates/listing/Book/BottomNavComV2";
// import CloudinaryWidget from "@templates/editEvent/Form/CloudinaryWidget";

import { uppyArr, useTask } from "@hooks/tasks/useTask";
import { useTaskParams } from "@hooks/tasks/useTaskParams";

import Loading from "@components/loading/Loading";
import BackIcon from "../../public/icons/BackIcon";
import UppyWidgetContainer from "@components/Uppy/UppyWidgetContainer";

import {
  DifficultyLevelsTypes,
  taskFrequency,
  taskLabels,
  TaskTypes,
} from "@models/Tasks/Task";
import {
  ALPHABET_GAME,
  CHALLENGE_ONE,
  FAT_BURNER_CHALLENGE,
  FAT_BURNER_GAME,
  RUNNER_GAME,
  TEAM_ALPHABET_GAME,
  STUDENT_OLYMPICS,
  WFH_CHALLENGE,
  WOMENS_GAME,
  HEADSTART_GAME,
  BURPEE_GAME,
  GURGAON_FIT,
} from "@constants/gameStats";
import ParentTaskAdder from "./ParentTaskAdder";
import DayAdder from "./DayAdder";
import AddGoalPage from "@templates/AdminGoals/AddGoalPage";
import MakeStreamable from "./MakeStreamable";
import CoordsAdder from "./CoordsAdder";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Nutrition from "./Nutrition";
import HandleEquipment from "./HandleEquipment";
import HandleExercise from "./HandleExercise";
import HandleInstructions from "./HandleInstructions";
import HandleIngredients from "./HandleIngredients";
import HandleDietCard from "./HandleDietCard";

interface Props {
  user: UserInterface;
}

const AddActivityTemplate: React.FC<Props> = ({ user }) => {
  // eventKey why is this needed?
  const { id } = useTaskParams();

  const {
    task,
    onMediaDelete,
    onMediaUpload,
    onUpdateType,
    onUpdateGameId,
    onUpdateDifficultyLevel,
    onhandleAwardsLevel,
    onHandleInputFields,
    inputFields,
    addInputField,
    removeInputField,
    onUpdateCheckBox,
    onfrequencyType,
    onOrientationUpdate,
    onAddParentId,
    removeParentId,
    addDay,
    removeDay,
    setTask,
    addDayPriority,
    onUpdateTaskType,
    onUpdateCoords,
    onUpdateNutriFacts,
    addEquipment,
    removeEquipment,
    addExercise,
    removeExercise,
    onUpdateMealTypes,
    addSteps,
    removeSteps,
    addIngredients,
    removeIngredients,
    addDietCard,
    updateDietCard,
    removeDietCard,
    onBoolUpdate,
    onStringUpdate,
    onNumberUpdate,
  } = useTask(user.uid, id);

  // console.log("task", task);

  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const onSave = async () => {
    if (loading === false) {
      setLoading(true);

      if (task) {
        try {
          onhandleAwardsLevel();
          await saveNewTask(task);
          // if (eventKey) {
          router.back();
          // } else {
          // setLoading(false);
          // router.back();
          // }
        } catch (error) {
          console.log("error", error);
        }
      }
    }
  };

  // console.log("task", task?.taskType);

  return (
    <div className="p-4 pt-8">
      <div className="pb-3">
        <p className="text-gray-700 text-4xl font-semibold flex items-center">
          <span onClick={() => router.back()}>
            <BackIcon style={{ height: "30", width: "30", fill: "gray" }} />{" "}
          </span>
          &nbsp; Add Activity
        </p>
      </div>
      <hr />
      <>
        {loading ? (
          <div className="pt-4">
            <div className="flex justify-center items-center">
              <Loading fill="#ff735c" width={48} height={48} />
            </div>
          </div>
        ) : (
          <div className="pt-4 pb-24">
            {uppyArr.map((each) => (
              <div key={each} className="p-4">
                <UppyWidgetContainer
                  media={task && task[each] ? [task[each]] : []}
                  leftButtonText={`Add ${each}`}
                  onDelete={() => onMediaDelete(each)}
                  uid={user.uid}
                  onUpload={(newFiles) => onMediaUpload(each, newFiles)}
                  onRemove={() => onMediaDelete(each)}
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
                  // id="avatarUpload"
                />
              </div>
            ))}

            <div className="pt-8">
              <TextField
                style={{ width: "100%" }}
                placeholder={"video Intro Duration"}
                label={"Intro Duration of Activity in Miliseconds"}
                variant="outlined"
                onChange={(val) =>
                  onNumberUpdate("videoIntroDur", val.target.value)
                }
                value={task?.videoIntroDur || 0}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div className="pt-8">
              <TextField
                style={{ width: "100%" }}
                placeholder={"What people will call this activity"}
                label={"Name of Activity"}
                variant="outlined"
                onChange={(val) => onStringUpdate("name", val.target.value)}
                value={task?.name || ""}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div className="pt-8">
              <TextField
                style={{ width: "100%" }}
                placeholder={"FitPoints you will earn with this activity"}
                label={"FitPoints"}
                variant="outlined"
                onChange={(val) =>
                  onNumberUpdate("fitPoints", val.target.value)
                }
                value={task?.fitPoints || 0}
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div className="pt-8">
              <TextField
                style={{ width: "100%" }}
                placeholder={"Add Distance in m"}
                label={"Distance in m"}
                variant="outlined"
                onChange={(val) => onNumberUpdate("distance", val.target.value)}
                value={task?.distance || 0}
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div className="pt-8">
              <CoordsAdder
                coords={task?.path}
                onUpdateCoords={onUpdateCoords}
              />
            </div>
            <div className="pt-8">
              <TextField
                style={{ width: "100%" }}
                placeholder={"Duration of the workout"}
                label={"Duration in minutes"}
                variant="outlined"
                onChange={(e) =>
                  onNumberUpdate("durationMinutes", e.target.value)
                }
                value={task?.durationMinutes || 0}
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div className="pt-8">
              <TextField
                style={{ width: "100%" }}
                placeholder={"Duration of the Ready in"}
                label={"Ready in minutes"}
                variant="outlined"
                onChange={(e) => onNumberUpdate("readyIn", e.target.value)}
                value={task?.readyIn || 0}
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>

            <div className="pt-8">
              <TextField
                style={{ width: "100%" }}
                placeholder={"Priority of this activity"}
                label={"Priority"}
                variant="outlined"
                onChange={(val) => onNumberUpdate("priority", val.target.value)}
                value={task?.priority || 0}
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>

            <div className="pt-8">
              <TextField
                style={{ width: "100%" }}
                placeholder={"See badgeId from /admin/games"}
                label={"Add BadgeId"}
                variant="outlined"
                onChange={(val) => onStringUpdate("badgeId", val.target.value)}
                value={task?.badgeId || ""}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>

            <div className="pt-8">
              <TextField
                style={{ width: "100%" }}
                placeholder={"On what rank task unlocks"}
                label={"Unlocks at rank"}
                variant="outlined"
                onChange={(val) =>
                  onNumberUpdate("unlocksAtRank", val.target.value)
                }
                value={task?.unlocksAtRank || -1}
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>

            <div className="pt-8">
              <TextField
                select
                style={{ width: "100%" }}
                placeholder={"Type of the workout"}
                label={"Workout Types"}
                variant="outlined"
                onChange={(e) =>
                  onUpdateType(
                    e.target.value === "mediaTask" ? "mediaTask" : "standard"
                  )
                }
                value={task?.type || "NO ENTRY"}
                InputLabelProps={{
                  shrink: true,
                }}
              >
                <MenuItem value="standard">Standard</MenuItem>
                <MenuItem value="mediaTask">MediaTask</MenuItem>
                <MenuItem value="NO ENTRY">NO ENTRY</MenuItem>
              </TextField>
            </div>
            {task && user ? (
              <HandleDietCard
                task={task}
                uid={user.uid}
                addDietCard={addDietCard}
                removeDietCard={removeDietCard}
                updateDietCard={updateDietCard}
              />
            ) : null}
            <HandleIngredients
              task={task}
              addIngredients={addIngredients}
              removeIngredients={removeIngredients}
            />
            <HandleInstructions
              task={task}
              addSteps={addSteps}
              removeSteps={removeSteps}
            />
            {task ? (
              <HandleEquipment
                task={task}
                addEquipment={addEquipment}
                removeEquipment={removeEquipment}
              />
            ) : null}
            {task && user ? (
              <HandleExercise
                task={task}
                uid={user.uid}
                addExercise={addExercise}
                removeExercise={removeExercise}
              />
            ) : null}
            <div className="pt-8">
              <TextField
                select
                style={{ width: "100%" }}
                placeholder={"Type of Task"}
                label={"Type of Task"}
                variant="outlined"
                onChange={(e) => onUpdateTaskType(e.target.value as TaskTypes)}
                value={task?.taskType || "NO ENTRY"}
                InputLabelProps={{
                  shrink: true,
                }}
              >
                <MenuItem value="workout">Workout</MenuItem>
                <MenuItem value="steps">Steps</MenuItem>
                <MenuItem value="path">Path</MenuItem>
                <MenuItem value="live">Live</MenuItem>
                <MenuItem value="nutrition">Nutrition</MenuItem>
                <MenuItem value="reels">Reels</MenuItem>
                <MenuItem value="NO ENTRY">NO ENTRY</MenuItem>
              </TextField>
            </div>

            {task?.taskType === "live" ? (
              <>
                <div className="pt-8">
                  <TextField
                    style={{ width: "100%" }}
                    placeholder={"https://meet.google.com/{id}"}
                    label={"Link for the activity"}
                    variant="outlined"
                    onChange={(val) =>
                      onStringUpdate("liveLink", val.target.value)
                    }
                    value={task?.liveLink}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
                <div className="pt-8">
                  {!task.liveOn &&
                    onNumberUpdate("liveOn", Date.now().toString())}
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      renderInput={(props) => <TextField {...props} />}
                      label="DateTimePicker"
                      value={task.liveOn || 0}
                      onChange={(newValue) => {
                        newValue &&
                          onNumberUpdate(
                            "liveOn",
                            newValue.valueOf().toString()
                          );
                      }}
                    />
                  </LocalizationProvider>
                </div>
              </>
            ) : task?.taskType === "nutrition" ? (
              <Nutrition
                task={task}
                onUpdateKcal={(val: string) => onNumberUpdate("kcal", val)}
                onUpdateNutriFacts={onUpdateNutriFacts}
                onUpdateSectionId={(val: string) =>
                  onStringUpdate("sectionId", val)
                }
                onUpdateMealTypes={onUpdateMealTypes}
              />
            ) : null}

            <div className="pt-8">
              <TextField
                style={{ width: "100%" }}
                placeholder={"Steps to do"}
                label={"Steps to do"}
                variant="outlined"
                onChange={(val) =>
                  onNumberUpdate("stepsToDo", val.target.value)
                }
                value={task?.stepsToDo || 0}
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>

            {/* task frequency */}
            <div className="pt-8">
              <TextField
                select
                style={{ width: "100%" }}
                placeholder={"Task Frequency"}
                label={"Task Frequency"}
                variant="outlined"
                onChange={(e) =>
                  onfrequencyType(e.target.value as taskFrequency)
                }
                value={task?.taskFrequency || "NO ENTRY"}
                InputLabelProps={{
                  shrink: true,
                }}
              >
                <MenuItem value="weekly">Weekly</MenuItem>
                <MenuItem value="daily">Daily</MenuItem>
                <MenuItem value="anytime">Anytime</MenuItem>
                <MenuItem value="NO ENTRY">NO ENTRY</MenuItem>
              </TextField>
            </div>

            <div className="pt-8">
              <TextField
                select
                style={{ width: "100%" }}
                placeholder={"Orientation"}
                label={"Orientation"}
                variant="outlined"
                onChange={(e) =>
                  onOrientationUpdate(
                    e.target.value === "landscape" ? "landscape" : "portrait"
                  )
                }
                value={task?.orientation || "NO ENTRY"}
                InputLabelProps={{
                  shrink: true,
                }}
              >
                <MenuItem value="portrait">portrait</MenuItem>
                <MenuItem value="landscape">landscape</MenuItem>
                <MenuItem value="NO ENTRY">NO ENTRY</MenuItem>
              </TextField>
            </div>

            <div className="p-4 border-2 border-red-500 my-4">
              <p className="text-xl font-bold">Can task stream?</p>
              <p className="text-lg text-red-500">ONLY FOR PRODUCTION TASKS</p>
              <MakeStreamable
                onUpdatePlayback={(val: string) =>
                  onStringUpdate("playbackId", val)
                }
                url={task?.avatar?.url}
                playbackId={task?.playbackId}
              />
            </div>

            {/* <div className="py-8">
              <TextField
                select
                style={{ width: "100%" }}
                placeholder={"Types of label"}
                label={"Label"}
                variant="outlined"
                onChange={(e) => onUpdateLabelType(e.target.value as labelType)}
                value={task?.labels}
                InputLabelProps={{
                  shrink: true,
                }}
              >
                {taskLabels.map((item) => {
                  return (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  );
                })}
              </TextField>
            </div> */}

            <div className="py-8 flex flex-wrap items-center">
              {taskLabels.map((item, index) => {
                return (
                  <div key={index} className="pr-4 flex items-center">
                    <Checkbox
                      color="primary"
                      // value={item}
                      checked={task?.labels?.includes(item) ? true : false}
                      onChange={() => onUpdateCheckBox(item)}
                    />
                    <p className="text-gray-700">{item}</p>
                  </div>
                );
              })}
            </div>

            <div className="py-4 flex flex-wrap items-center">
              <Checkbox
                color="primary"
                // value={item}
                checked={task?.onLevelOnly ? true : false}
                onChange={() =>
                  onBoolUpdate("onLevelOnly", task?.onLevelOnly ? false : true)
                }
              />
              <p className="text-gray-700">On level only?</p>
            </div>

            <div className="py-4 flex flex-wrap items-center">
              <Checkbox
                color="primary"
                // value={item}
                checked={task?.levelBoosterTask ? true : false}
                onChange={() =>
                  onBoolUpdate(
                    "levelBoosterTask",
                    task?.levelBoosterTask ? false : true
                  )
                }
              />
              <p className="text-gray-700">Level booster task</p>
            </div>

            <div className="py-4 flex flex-wrap items-center">
              <Checkbox
                color="primary"
                // value={item}
                checked={task?.finaleTask ? true : false}
                onChange={() =>
                  onBoolUpdate("finaleTask", task?.finaleTask ? false : true)
                }
              />
              <p className="text-gray-700">is Finale Task</p>
            </div>

            <div className="py-8 flex flex-wrap items-center">
              <Checkbox
                color="primary"
                // value={item}
                checked={task?.gameTask ? true : false}
                onChange={() =>
                  onBoolUpdate("gameTask", task?.gameTask ? false : true)
                }
              />
              <p className="text-gray-700">is Game Task</p>
            </div>

            <div className="py-8 flex flex-wrap items-center">
              <Checkbox
                color="primary"
                // value={item}
                checked={task?.canCheckIn ? true : false}
                onChange={() =>
                  onBoolUpdate("canCheckIn", task?.canCheckIn ? false : true)
                }
              />
              <p className="text-gray-700">Can user checking?</p>
            </div>

            <div className="py-8 flex flex-wrap items-center">
              <Checkbox
                color="primary"
                // value={item}
                checked={task?.freeTask ? true : false}
                onChange={() =>
                  onBoolUpdate("freeTask", task?.freeTask ? false : true)
                }
              />
              <p className="text-gray-700">Free Task?</p>
            </div>

            <div className="pt-8">
              <TextField
                style={{ width: "100%" }}
                placeholder={"No of Claps"}
                label={"NumClaps"}
                variant="outlined"
                onChange={(val) => onNumberUpdate("numClaps", val.target.value)}
                value={task?.numClaps || 0}
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>

            <div className="pt-8">
              <TextField
                style={{ width: "100%" }}
                placeholder={"agility Score"}
                label={"agility Score"}
                variant="outlined"
                onChange={(val) =>
                  onNumberUpdate("agilityScore", val.target.value)
                }
                value={task?.agilityScore || 0}
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>

            <div className="pt-8">
              <TextField
                style={{ width: "100%" }}
                placeholder={"strength Score"}
                label={"strength Score"}
                variant="outlined"
                onChange={(val) =>
                  onNumberUpdate("strengthScore", val.target.value)
                }
                value={task?.strengthScore || 0}
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>

            <div className="pt-8">
              <TextField
                style={{ width: "100%" }}
                placeholder={"cardio Score"}
                label={"cardio Score"}
                variant="outlined"
                onChange={(val) =>
                  onNumberUpdate("cardioScore", val.target.value)
                }
                value={task?.cardioScore || 0}
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>

            <div className="pt-8">
              <TextField
                style={{ width: "100%" }}
                placeholder={"endurance Score"}
                label={"endurance Score"}
                variant="outlined"
                onChange={(val) =>
                  onNumberUpdate("enduranceScore", val.target.value)
                }
                value={task?.enduranceScore || 0}
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>

            <div className="pt-8">
              <TextField
                style={{ width: "100%" }}
                placeholder={"Level"}
                label={"Level"}
                variant="outlined"
                onChange={(val) => onNumberUpdate("level", val.target.value)}
                value={task?.level || 0}
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>

            <div className="pt-8">
              <TextField
                select
                style={{ width: "100%" }}
                placeholder={"Difficulty Levels"}
                label={"Difficulty Levels"}
                variant="outlined"
                onChange={(e) =>
                  onUpdateDifficultyLevel(
                    e.target.value as DifficultyLevelsTypes
                  )
                }
                value={task?.difficultyLevels || "NO ENTRY"}
              >
                <MenuItem value={"easy"}>Easy</MenuItem>
                <MenuItem value={"medium"}>Medium</MenuItem>
                <MenuItem value={"hard"}>Hard</MenuItem>
                <MenuItem value="NO ENTRY">NO ENTRY</MenuItem>
              </TextField>
            </div>

            <div className="pt-8">
              <TextField
                style={{ width: "100%" }}
                placeholder={"UserID"}
                label={"UserId"}
                variant="outlined"
                onChange={(val) => onStringUpdate("userId", val.target.value)}
                value={task?.userId}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>

            <div className="pt-8">
              <TextField
                style={{ width: "100%" }}
                placeholder={"Rules to remember"}
                label={"Rules"}
                multiline={true}
                minRows={4}
                variant="outlined"
                onChange={(val) => onStringUpdate("rules", val.target.value)}
                value={task?.rules || ""}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>

            <div className="pt-8">
              <TextField
                style={{ width: "100%" }}
                placeholder={"Description of Task"}
                label={"Description"}
                variant="outlined"
                multiline={true}
                minRows={4}
                onChange={(val) =>
                  onStringUpdate("description", val.target.value)
                }
                value={task?.description || ""}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>

            <div className="pt-8">
              <TextField
                style={{ width: "100%" }}
                placeholder={"Important Note"}
                label={"Note"}
                variant="outlined"
                onChange={(val) => onStringUpdate("note", val.target.value)}
                value={task?.note || ""}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>

            {/* <div className="pt-8">
              <TextField
                style={{ width: "100%" }}
                placeholder={"X days (Can be fraction)"}
                label={"Can do again in X days"}
                variant="outlined"
                onChange={(val) => onUpdateCanDoAgain(val.target.value)}
                value={task?.canDoAgain || 0}
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div> */}

            {/* Awards Level */}

            <div className="pt-8">
              <p className="text-lg text-gray-700">Fit Point Table</p>
              {inputFields.map((inputField, index) => (
                <div key={index} className="mt-3">
                  <TextField
                    name="text"
                    label="Activity Name"
                    placeholder="Do 15 pushups"
                    variant="outlined"
                    value={task?.awardLevels?.[index]?.text}
                    onChange={(event) =>
                      onHandleInputFields(index, event.target.value, "text")
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <div className="m-2"></div>
                  <TextField
                    name="fitPoints"
                    label="Fit Points"
                    placeholder="3"
                    variant="outlined"
                    value={task?.awardLevels?.[index]?.fitPoints}
                    type="number"
                    onChange={(event) =>
                      onHandleInputFields(
                        index,
                        event.target.value,
                        "fitPoints"
                      )
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />

                  <IconButton onClick={addInputField}>
                    <p>+</p>
                  </IconButton>

                  {index !== 0 ? (
                    <IconButton onClick={() => removeInputField(index)}>
                      <p>-</p>
                    </IconButton>
                  ) : null}
                </div>
              ))}
            </div>
            <Button>
              <div
                onClick={onhandleAwardsLevel}
                className="text-black font-bold border p-2"
              >
                SAVE
              </div>
            </Button>

            <div className="py-8 flex flex-wrap items-center">
              {[
                { id: FAT_BURNER_GAME, name: "FAT Burner Game" },
                { id: ALPHABET_GAME, name: "Fit Alphabet Game" },
                { id: FAT_BURNER_CHALLENGE, name: "Fat Burner Challenge" },
                { id: CHALLENGE_ONE, name: "5K Calorie" },
                { id: WFH_CHALLENGE, name: "WFH Challenge" },
                { id: RUNNER_GAME, name: "Fittest Runner" },
                { id: WOMENS_GAME, name: "Women's game" },
                { id: TEAM_ALPHABET_GAME, name: "Team Alphabet Game" },
                { id: STUDENT_OLYMPICS, name: "STUDENT_OLYMPICS Game" },
                { id: HEADSTART_GAME, name: "Headstart Game" },
                { id: BURPEE_GAME, name: "BURPEE_GAME Game" },
                { id: GURGAON_FIT, name: "GURGAON_FIT Game" },
              ].map((item) => {
                return (
                  <div key={item.id} className="pr-4 flex items-center">
                    <Checkbox
                      color="primary"
                      checked={task?.games?.includes(item.id) ? true : false}
                      onChange={() =>
                        onUpdateGameId(
                          item.id,
                          task?.games?.includes(item.id) ? "remove" : "add"
                        )
                      }
                    />
                    <p className="text-gray-700">{item.name}</p>
                  </div>
                );
              })}
            </div>

            <div className="pt-8 flex justify-between ">
              <ParentTaskAdder
                selectedIds={task?.parentTaskIds}
                addParentId={onAddParentId}
                removeParentId={removeParentId}
              />
              {/* <div className="pr-2">
                <p>Task unlocks on?</p>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DateTimePicker
                    className="max-w-md w-full"
                    label="Start on"
                    inputVariant="outlined"
                    value={task?.startOn ? new Date(task?.startOn) : null}
                    disablePast
                    onChange={onUpdateStartOn}
                  />
                </MuiPickersUtilsProvider>
              </div> */}

              {/* <div className="">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DateTimePicker
                    className="max-w-md w-full"
                    label="End on"
                    inputVariant="outlined"
                    value={task?.endOn}
                    disablePast
                    onChange={onUpdateEndOn}
                  />
                </MuiPickersUtilsProvider>
              </div> */}
            </div>
            <div className="pt-8  ">
              <p className="text-2xl font-medium text-gray-700">Add days</p>
              <DayAdder
                days={task?.programDays}
                priorityObj={task?.priorityObj}
                addDay={addDay}
                removeDay={removeDay}
                addDayPriority={addDayPriority}
              />
            </div>

            {task ? (
              <div className="pt-8">
                <p className="text-2xl font-medium text-gray-700">Goal Task</p>
                <AddGoalPage goal={task} setGoal={setTask} />
              </div>
            ) : null}
          </div>
        )}
      </>

      <div className="fixed bottom-0 left-0 right-0 z-50">
        <BottomNavComV2 cta={"Save Activity"} onClick={onSave} />
      </div>
    </div>
  );
};

export default AddActivityTemplate;
