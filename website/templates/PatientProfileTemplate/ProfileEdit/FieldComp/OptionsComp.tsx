import CloseBtn from "@templates/community/Program/Feed/CloseBtn";
import { SingleFieldCompProps } from "../utils";
import { useState } from "react";

const OptionsComp: React.FC<SingleFieldCompProps & { color: string }> = ({
  fieldObject,
  setReRenderCount,
  color,
  depedentFieldObject,
}) => {
  const [remoteValue, setRemoteValue] = useState<string[]>(
    typeof fieldObject.value === "object" ? fieldObject.value : []
  );
  const remoteColor = `${color}80`;

  const handleClick = (val: string, isSelected: boolean) => {
    setRemoteValue((prev) => {
      if (isSelected) {
        const temp = prev.filter((each) => each !== val);
        fieldObject.value = temp;
        return temp;
      } else {
        const temp = [...prev, val];
        fieldObject.value = temp;
        return temp;
      }
    });

    if (depedentFieldObject && fieldObject.dependencyId) {
      const hideField =
        fieldObject.dependencyDependVal === val && isSelected ? false : true;

      depedentFieldObject.hideIfDepedent = hideField;
      if (hideField) {
        depedentFieldObject.value = undefined;
      }

      setReRenderCount((prev) => prev + 1);
    }
  };

  return fieldObject.type === "options" ? (
    <div className="flex flex-col gap-2">
      <div className="flex items-center flex-wrap gap-4">
        <label className="text-black/70 text-sm md:text-base">
          {fieldObject.name}:{" "}
        </label>
        {fieldObject.options?.map((option, index) => {
          const isSelected = remoteValue.includes(option);
          return (
            <div
              key={`${option.replaceAll(" ", "_")}-${index}`}
              className="cursor-pointer outline rounded-full flex flex-row items-center gap-2 px-4 py-1"
              style={{
                outlineColor: remoteColor,
                backgroundColor: isSelected ? remoteColor : "transparent",
              }}
              onClick={() => handleClick(option, isSelected)}
            >
              <span
                className="text-sm md:text-base capitalize"
                style={{ color: isSelected ? "#FFFFFF" : remoteColor }}
              >
                {option.replaceAll("_", " ")}
              </span>
              <CloseBtn
                size="small"
                color={isSelected ? "#FFFFFF" : remoteColor}
                type={isSelected ? undefined : "plus"}
              />
            </div>
          );
        })}
      </div>
      {fieldObject.showOther ? (
        <div className="flex-1 flex items-center gap-2">
          <label className="text-black/70 text-sm md:text-base">
            Mention if any other:{" "}
          </label>
          <input
            className="flex-1 p-3 md:p-4 rounded-lg text-black/50 placeholder:text-black/25 text-sm md:text-base bg-white/50"
            defaultValue={fieldObject.other}
            placeholder={`Write something`}
            onChange={(e) => (fieldObject.other = e.target.value)}
          />
        </div>
      ) : null}
    </div>
  ) : null;
};

export default OptionsComp;
