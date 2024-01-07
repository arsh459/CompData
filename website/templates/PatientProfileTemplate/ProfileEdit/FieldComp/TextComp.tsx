import { SingleFieldCompProps } from "../utils";

const TextComp: React.FC<SingleFieldCompProps> = ({
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

  return (
    <div className="flex-1 flex flex-col gap-2">
      <label className="text-black/70 text-sm md:text-base">
        {fieldObject.name}:{" "}
      </label>
      <input
        className="flex-1 p-3 md:p-4 rounded-lg text-black/50 placeholder:text-black/25 text-sm md:tex-base bg-white/50"
        defaultValue={fieldObject.value}
        placeholder={`Write something`}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default TextComp;
