// import {
// ALPHABET_GAME,
// FAT_BURNER_GAME,
// RUNNER_GAME,
// WOMENS_GAME,
// } from "@constants/gameStats";
// import { EventInterface } from "@models/Event/Event";
import { GameKPITarget } from "@models/Event/Event";
import { updateEventGoal } from "@models/Goals/createUtils";
import { systemKPIList, SystemKPIs } from "@models/Tasks/SystemKPIs";
// import clsx from "clsx";
// import { TextField } from "@mui/material";
// import { GoalObject } from "@models/Goals/Goal";
// import { Task } from "@models/Tasks/Task";
// import { useEffect, useState } from "react";
// import FieldSelect from "./FieldSelect";
import { useState } from "react";
import TaskAdder from "@models/Goals/TaskAdder";

interface Props {
  selectedKPIs: GameKPITarget[];
  gameId: string;
}

const GameAdder: React.FC<Props> = ({ gameId, selectedKPIs }) => {
  const [values, setValues] = useState<GameKPITarget[]>(selectedKPIs);

  const onKPISave = async () => {
    await updateEventGoal(gameId, values);
  };

  const onAdd = async (kpi: SystemKPIs, value: number) => {
    setValues((p) => [...p, { kpi: kpi, targetValue: value }]);
    await onKPISave();
  };

  const onRemove = async (kpi: SystemKPIs) => {
    setValues(values.filter((item) => item.kpi !== kpi));
    await onKPISave();
  };

  return (
    <div className="flex flex-wrap">
      {systemKPIList.map((item) => {
        const selectedList = selectedKPIs.filter((sI) => sI.kpi === item);
        const selected = selectedList.length ? true : false;

        return (
          <div key={item}>
            <TaskAdder
              text={item}
              selected={selected}
              onAdd={(val: number) => onAdd(item, val)}
              onRemove={() => onRemove(item)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default GameAdder;
