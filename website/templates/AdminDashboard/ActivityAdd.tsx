import { TextField } from "@mui/material";

import React, { useEffect, useMemo, useState } from "react";
import DateTimeSelector from "./DateTimeSelector";
import TaskSearch from "./FilterModal/TaskModal";
import BottomNavComV2 from "@templates/listing/Book/BottomNavComV2";
import { useActivityData } from "@hooks/activities/useActivityData";
import { format } from "date-fns";
import PlayerSearch from "./FilterModal/PlayerSearch";
import { useRouter } from "next/router";

interface Props {
  uid?: string;
  activityId?: string;
}
const ActivityAdd: React.FC<Props> = ({ activityId, uid }) => {
  const {
    activity,
    onSave,
    selectedTask,
    handleSelectedTaskChange,
    handleStringUpdate,
    handleNumberUpdate,
    author,
    handleSelectedAuthorChange,
  } = useActivityData(uid, activityId);
  const start = useMemo(() => {
    return activity?.createdOn ? new Date(activity.createdOn) : new Date();
  }, [activity?.createdOn]);

  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(start);
  const router = useRouter();

  useEffect(() => {
    if (start) {
      setSelectedDateTime(start);
    }
  }, [start]);

  const handleSave = async () => {
    const cal = activity?.fitPoints || 0;
    const authorId = activity?.authorUID || uid;
    if (activity?.date && authorId) {
      await onSave({ ...activity, calories: cal * 300, authorUID: authorId });
    }
    router.push(`/admin/dashboardV2/${authorId}/`);
  };

  const handleDateTimeChange = (newDateTime: Date | null) => {
    // if (newDateTime instanceof Date) {
    // const unix = format
    // setSelectedDateTime(newDateTime);
    // console.log({ unix });

    // unix && handleNumberUpdate("createdOn", unix.toString());
    if (newDateTime) {
      const unixTimestamp = new Date(newDateTime).getTime();
      setSelectedDateTime(newDateTime);
      handleNumberUpdate("createdOn", unixTimestamp.toString());
    }
  };

  return (
    <>
      <div className="w-3/5 mx-auto overflow-y-scroll h-3/4">
        <div className="pt-8 pb-20 mb-32">
          {activity?.taskId ? (
            <div className="pt-8">
              <TextField
                style={{ width: "100%" }}
                placeholder={"TaskId"}
                label={"TaskId"}
                variant="outlined"
                onChange={(val) =>
                  handleStringUpdate("taskId", val.target.value)
                }
                value={activity?.taskId || ""}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
          ) : (
            <div className="px-4 bg-gray-50 overflow-y-scroll pt-8">
              <TaskSearch
                q={{ taskId: selectedTask?.id ? selectedTask.id : "" }}
                onClose={() => {}}
                taskId={selectedTask?.id ? selectedTask.id : ""}
                onOverrideSelect={handleSelectedTaskChange}
                allTasksHidden={true}
              />
            </div>
          )}
          {activity?.authorUID ? (
            <div className="pt-8">
              <TextField
                style={{ width: "100%" }}
                placeholder={"authorUID"}
                label={"authorUID"}
                variant="outlined"
                onChange={(val) =>
                  handleStringUpdate("authorUID", val.target.value)
                }
                value={activity?.authorUID || ""}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
          ) : (
            <div className="px-4 bg-gray-50 overflow-y-scroll pt-8">
              <PlayerSearch
                onClose={() => {}}
                initialPlayerName="Swapnil"
                q={{ player: author?.uid ? author.uid : "" }}
                onSelectOverride={handleSelectedAuthorChange}
              />
            </div>
          )}

          {activity?.source ? (
            <div className="pt-8">
              <div className="pt-8">
                <TextField
                  style={{ width: "100%" }}
                  placeholder={"TaskType"}
                  label={"Task Type"}
                  variant="outlined"
                  disabled={true}
                  value={activity?.source || ""}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
            </div>
          ) : null}

          <div className="pt-8">
            <TextField
              style={{ width: "100%" }}
              placeholder={"What people will call this activity"}
              label={"Name of Activity"}
              variant="outlined"
              onChange={(val) =>
                handleStringUpdate("activityName", val.target.value)
              }
              value={activity?.activityName || ""}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div className="pt-8">
            <TextField
              style={{ width: "100%" }}
              placeholder={"Date"}
              label={"Date"}
              variant="outlined"
              disabled={true}
              onChange={(val) =>
                activity?.createdOn &&
                handleStringUpdate(
                  "date",
                  format(new Date(activity?.createdOn), "yyyy-MM-dd")
                )
              }
              value={
                (activity?.createdOn &&
                  format(new Date(activity?.createdOn), "yyyy-MM-dd")) ||
                ""
              }
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
                handleNumberUpdate("fitPoints", val.target.value)
              }
              value={activity?.fitPoints || 0}
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>

          <div className="pt-8">
            <DateTimeSelector
              value={selectedDateTime}
              onChange={handleDateTimeChange}
            />
          </div>
          {/* <div className="pt-8">
            <TextField
              style={{ width: "100%" }}
              placeholder={"Calories Based On Fitpoint"}
              label={"Calories"}
              variant="outlined"
              onChange={(val) => {
                const valCal = activity?.fitPoints
                  ? activity?.fitPoints * 300
                  : 0;
                console.log(
                  { valCal },
                  typeof valCal,
                  { val },
                  activity?.calories
                );

                return handleNumberUpdate("calories", valCal.toString());
              }}
              value={activity?.calories || 0}
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div> */}
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <BottomNavComV2 cta={"Save Activity"} onClick={handleSave} />
      </div>
    </>
  );
};

export default ActivityAdd;
