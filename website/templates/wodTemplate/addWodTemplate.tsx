// import Button from "@components/button";
import { useRewardById } from "@hooks/messages/useRewardById";
import { getGameNameReadable } from "@templates/TaskTemplate/utils";
import { TextField } from "@mui/material";
// import TextField2 from "@mui/material/TextField";
// import PlayerSearch from "@templates/AdminDashboard/FilterModal/PlayerSearch";
// import TeamsModal from "@templates/AdminDashboard/FilterModal/TeamsModal";
// import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import { saveReminder } from "@models/Reminder/createUtils";
import { useRouter } from "next/router";
import Button from "@components/button";
// import DateFnsUtils from "@date-io/date-fns";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
// import StaticDateTimePicker from "@mui/lab/StaticDateTimePicker";
// import LocalizationProvider from "@mui/lab/LocalizationProvider";
// import { useLeaderboard } from "@hooks/user/useLeaderboard";

// import { Link } from "@mui/material";

interface Props {
  gameId: string;
  wodId: string;
}

const AddWODTemplate: React.FC<Props> = ({ gameId, wodId }) => {
  const { reward, setReward } = useRewardById(
    wodId,
    gameId,
    false,
    "task_of_day_v2",
    true
  );
  //   const author = useLeaderboard(reward?.authorId);
  //   const coach = useLeaderboard(reward?.communityId);

  const router = useRouter();

  const onSave = async () => {
    if (reward) {
      await saveReminder(reward);
      router.back();
    }
  };

  // console.log("reward", reward);

  return (
    <div className="py-8 px-2">
      <div className="flex pb-4">
        <p className="text-3xl font-bold">ADD Task of day</p>
      </div>

      <p className="text-lg">{getGameNameReadable(reward?.parentId)}</p>

      {reward?.levelTaskObj ? (
        <>
          <div className="pt-8">
            <TextField
              style={{ width: "100%" }}
              placeholder={"Level 0 Task Id"}
              label={"L0 Task Id name"}
              variant="outlined"
              onChange={(val) =>
                setReward((p) => {
                  if (p && p.levelTaskObj) {
                    return {
                      ...p,
                      levelTaskObj: {
                        ...p.levelTaskObj,
                        level0: val.target.value,
                      },
                    };
                  }
                })
              }
              value={reward?.levelTaskObj.level0}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>

          <div className="pt-8">
            <TextField
              style={{ width: "100%" }}
              placeholder={"Level 1 Task Id"}
              label={"L 1 Task Id name"}
              variant="outlined"
              onChange={(val) =>
                setReward((p) => {
                  if (p && p.levelTaskObj) {
                    return {
                      ...p,
                      levelTaskObj: {
                        ...p.levelTaskObj,
                        level1: val.target.value,
                      },
                    };
                  }
                })
              }
              value={reward?.levelTaskObj.level1}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>

          <div className="pt-8">
            <TextField
              style={{ width: "100%" }}
              placeholder={"Level 2 Task Id"}
              label={"L2 Task Id name"}
              variant="outlined"
              onChange={(val) =>
                setReward((p) => {
                  if (p && p.levelTaskObj) {
                    return {
                      ...p,
                      levelTaskObj: {
                        ...p.levelTaskObj,
                        level2: val.target.value,
                      },
                    };
                  }
                })
              }
              value={reward?.levelTaskObj.level2}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>

          <div className="pt-8">
            <TextField
              style={{ width: "100%" }}
              placeholder={"Level 3 Task Id"}
              label={"L3 Task Id name"}
              variant="outlined"
              onChange={(val) =>
                setReward((p) => {
                  if (p && p.levelTaskObj) {
                    return {
                      ...p,
                      levelTaskObj: {
                        ...p.levelTaskObj,
                        level3: val.target.value,
                      },
                    };
                  }
                })
              }
              value={reward?.levelTaskObj.level3}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>

          <div className="pt-8">
            <TextField
              style={{ width: "100%" }}
              placeholder={"Level 4 Task Id"}
              label={"L4 Task Id name"}
              variant="outlined"
              onChange={(val) =>
                setReward((p) => {
                  if (p && p.levelTaskObj) {
                    return {
                      ...p,
                      levelTaskObj: {
                        ...p.levelTaskObj,
                        level4: val.target.value,
                      },
                    };
                  }
                })
              }
              value={reward?.levelTaskObj.level4}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>

          <div className="pt-8">
            <TextField
              style={{ width: "100%" }}
              placeholder={"Level 5 Task Id"}
              label={"L5 Task Id name"}
              variant="outlined"
              onChange={(val) =>
                setReward((p) => {
                  if (p && p.levelTaskObj) {
                    return {
                      ...p,
                      levelTaskObj: {
                        ...p.levelTaskObj,
                        level5: val.target.value,
                      },
                    };
                  }
                })
              }
              value={reward?.levelTaskObj.level5}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
        </>
      ) : null}

      <div className="pt-8">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            className="max-w-md w-full"
            label="Select event time"
            renderInput={(props) => <TextField {...props} />}
            value={
              reward?.scheduledAt ? new Date(reward?.scheduledAt) : new Date()
            }
            disablePast
            onChange={(newVal: unknown) => {
              if (newVal)
                setReward((p) => {
                  const typedNewVal = newVal as Date;
                  if (p) {
                    return {
                      ...p,
                      scheduledAt: typedNewVal?.getTime(),
                    };
                  }
                });
            }}
          />
        </LocalizationProvider>
      </div>

      <div className="pt-4 flex items-center justify-center">
        <Button onClick={onSave} appearance="contained" className="">
          Save
        </Button>
      </div>
    </div>
  );
};

export default AddWODTemplate;
