import { MenuItem, Select } from "@mui/material";
import { SingleFieldCompProps } from "../utils";

const DropdownComp: React.FC<SingleFieldCompProps> = ({
  fieldObject,
  setReRenderCount,
  depedentFieldObject,
}) => {
  const onChange = (val: string) => {
    fieldObject.value = val;

    if (depedentFieldObject && fieldObject.dependencyId) {
      const hideField = fieldObject.dependencyDependVal !== val;

      depedentFieldObject.hideIfDepedent = hideField;
      if (hideField) {
        depedentFieldObject.value = undefined;
      }

      setReRenderCount((prev) => prev + 1);
    }
  };

  return fieldObject.type === "dropdown" ? (
    <div className="flex flrx-col items-center gap-2 FieldComp">
      <label className="text-black/70 text-sm md:text-base">
        {fieldObject.name}:{" "}
      </label>

      <Select
        defaultValue={fieldObject.value || "NO VALUE"}
        onChange={(e) => onChange(e.target.value)}
        style={{ fontSize: 14 }}
        className="capitalize"
      >
        {fieldObject.options?.map((option, index) => (
          <MenuItem
            key={`${option.replaceAll(" ", "_")}-${index}`}
            className="capitalize"
            value={option}
          >
            {option.replaceAll("_", " ")}
          </MenuItem>
        ))}
        <MenuItem key="NO VALUE" value="NO VALUE">
          NO VALUE
        </MenuItem>
      </Select>
    </div>
  ) : null;
};

export default DropdownComp;
