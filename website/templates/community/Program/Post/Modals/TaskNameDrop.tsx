import { useTasks } from "@hooks/tasks/useTasks";
import Select from "react-select";
import { useEffect, useState } from "react";

interface Props {
  onSelectId: (id: string) => void;
  onSelectName: (name: string) => void;
  selectedId: string;
}

const TaskNameDrop: React.FC<Props> = ({
  onSelectId,
  onSelectName,
  selectedId,
}) => {
  const { taskList } = useTasks();
  const [newName, setNewName] = useState<{ label: string; value: string }>({
    label: "",
    value: "",
  });

  useEffect(() => {
    const filtered = taskList.filter((item) => item.id === selectedId);

    if (filtered.length) {
      setNewName({
        label: filtered[0].name ? filtered[0].name : "",
        value: filtered[0].id,
      });

      onSelectName(filtered[0].name ? filtered[0].name : "");
    }
  }, [selectedId, onSelectName, taskList]);

  // console.log("s", selectedId);

  return (
    <div>
      <p>Task Name</p>
      <Select
        value={newName}
        styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
        menuPortalTarget={document.body}
        onChange={(e) => (e ? onSelectId(e.value) : null)}
        options={taskList.map((item) => {
          return {
            label: item.name ? item.name : "No name",
            value: item.id,
          };
        })}
      />
    </div>
  );
};

export default TaskNameDrop;
