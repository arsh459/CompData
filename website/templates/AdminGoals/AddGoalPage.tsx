import { Button, TextField } from "@mui/material";
import FieldSelect from "./FieldSelect";
// import {
//   goalIcons,
//   goalResolutionStrategy,
//   iconGoalType,
//   strategies,
// } from "@models/Tasks/Task";
import { Task } from "@models/Tasks/Task";
import { Dispatch, SetStateAction } from "react";
import { systemKPIList, SystemKPIs } from "@models/Tasks/SystemKPIs";

interface Props {
  goal: Task;
  setGoal: Dispatch<SetStateAction<Task | undefined>>;
  // goalId: string;
}

const AddGoalPage: React.FC<Props> = ({ goal, setGoal }) => {
  // console.log("g", goal);
  const onGoalRemove = (index: number) => {
    setGoal((p) => {
      if (p && p.goalKPIs) {
        return {
          ...p,
          goalKPIs: [
            ...p.goalKPIs.slice(0, index),
            ...p.goalKPIs.slice(index + 1, p.goalKPIs.length),
          ],
        };
      }
    });
  };

  return (
    <div className="px-2">
      <div className="flex pb-4">
        <Button
          onClick={() => {
            setGoal((p) => {
              if (p && p.goalKPIs) {
                return {
                  ...p,
                  goalKPIs: [
                    ...p.goalKPIs,
                    {
                      targetVal: 0,
                      systemKPI: "num_characters",
                      // unitLabel: "reps",
                      // iconType: "reps",
                      label: "",
                      // strategy: "max",
                    },
                  ],
                };
              } else if (p && !p.goalKPIs) {
                return {
                  ...p,
                  goalKPIs: [
                    {
                      targetVal: 0,
                      systemKPI: "num_characters",

                      label: "",
                    },
                  ],
                };
              }

              return p;
            });
          }}
          variant="contained"
        >
          ADD Goal
        </Button>
      </div>

      {/* <p className="text-lg">{getGameNameReadable(reward?.parentId)}</p> */}

      {goal.goalKPIs &&
        goal.goalKPIs.map((item, index) => {
          const targetVal = item.targetVal;
          // const unit = item.unitLabel;
          const systemKPI = item.systemKPI;
          // const label = item.label;
          // const strategy = item.strategy;

          return (
            <div className="border px-2 mb-2" key={`kpi-${index}`}>
              <div className="pt-8">
                <TextField
                  style={{ width: "100%" }}
                  placeholder={"Target value"}
                  label={"Target value"}
                  variant="outlined"
                  onChange={(val) =>
                    setGoal((p) => {
                      if (p && p.goalKPIs) {
                        return {
                          ...p,
                          goalKPIs: [
                            ...p.goalKPIs.slice(0, index),
                            {
                              ...p.goalKPIs[index],
                              targetVal: parseInt(val.target.value),
                            },
                            ...p.goalKPIs.slice(index + 1, p.goalKPIs.length),
                          ],
                        };
                      }
                      return p;
                    })
                  }
                  value={targetVal}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>

              {/* <div className="pt-8">
                <TextField
                  style={{ width: "100%" }}
                  placeholder={"Unit"}
                  label={"Unit of goal"}
                  variant="outlined"
                  onChange={(val) =>
                    setGoal((p) => {
                      if (p && p.goalKPIs) {
                        return {
                          ...p,
                          goalKPIs: [
                            ...p.goalKPIs.slice(0, index),
                            {
                              ...p.goalKPIs[index],
                              unitLabel: val.target.value,
                            },
                            ...p.goalKPIs.slice(index + 1, p.goalKPIs.length),
                          ],
                        };
                      }
                      return p;
                    })
                  }
                  value={unit}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div> */}

              {/* <div className="pt-8">
                <TextField
                  style={{ width: "100%" }}
                  placeholder={"Label"}
                  label={"Label"}
                  variant="outlined"
                  onChange={(val) =>
                    setGoal((p) => {
                      if (p && p.goalKPIs) {
                        return {
                          ...p,
                          goalKPIs: [
                            ...p.goalKPIs.slice(0, index),
                            {
                              ...p.goalKPIs[index],
                              label: val.target.value,
                            },
                            ...p.goalKPIs.slice(index + 1, p.goalKPIs.length),
                          ],
                        };
                      }
                      return p;
                    })
                  }
                  value={label}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div> */}

              <div className="pt-8">
                <p className="font-semibold">Add KPI type</p>
                <FieldSelect
                  fields={systemKPIList}
                  selectedValue={systemKPI}
                  onSelect={(newVal: string) => {
                    setGoal((p) => {
                      if (p && p.goalKPIs) {
                        return {
                          ...p,
                          goalKPIs: [
                            ...p.goalKPIs.slice(0, index),
                            {
                              ...p.goalKPIs[index],
                              systemKPI: newVal as SystemKPIs,
                            },
                            ...p.goalKPIs.slice(index + 1, p.goalKPIs.length),
                          ],
                        };
                      }

                      return p;
                    });
                  }}
                />
              </div>

              {/* <div className="pt-8">
                <p className="font-semibold">Add Strategy</p>
                <FieldSelect
                  fields={strategies}
                  selectedValue={strategy}
                  onSelect={(newVal: string) => {
                    setGoal((p) => {
                      if (p && p.goalKPIs) {
                        return {
                          ...p,
                          goalKPIs: [
                            ...p.goalKPIs.slice(0, index),
                            {
                              ...p.goalKPIs[index],
                              strategy: newVal as goalResolutionStrategy,
                            },
                            ...p.goalKPIs.slice(index + 1, p.goalKPIs.length),
                          ],
                        };
                      }

                      return p;
                    });
                  }}
                />
              </div> */}

              <p
                onClick={() => onGoalRemove(index)}
                className="text-red-500 underline pb-2"
              >
                Remove
              </p>
            </div>
          );
        })}

      {/* <div className="pt-4 flex items-center justify-center">
        <Button onClick={onSave} appearance="contained" className="">
          Save
        </Button>
      </div> */}
    </div>
  );
};

export default AddGoalPage;
