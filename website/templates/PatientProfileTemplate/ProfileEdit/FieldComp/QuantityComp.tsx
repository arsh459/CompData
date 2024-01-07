import CloseBtn from "@templates/community/Program/Feed/CloseBtn";
import { useState } from "react";
import { SingleFieldCompProps } from "../utils";

const QuantityComp: React.FC<SingleFieldCompProps> = ({
  fieldObject,
  setReRenderCount,
  depedentFieldObject,
}) => {
  const [remoteValue, setRemoteValue] = useState<number | undefined>(
    (fieldObject.type === "quntity" && fieldObject.value) || undefined
  );

  const handleReRender = (val: number) => {
    if (depedentFieldObject && fieldObject.dependencyId) {
      const hideField = fieldObject.dependencyDependVal !== val;

      depedentFieldObject.hideIfDepedent = hideField;
      if (hideField) {
        depedentFieldObject.value = undefined;
      }

      setReRenderCount((prev) => prev + 1);
    }
  };

  const handlePlus = () => {
    if (fieldObject.type === "quntity") {
      setRemoteValue((prev) => {
        if (prev) {
          const temp =
            prev < fieldObject.maxVal ? prev + fieldObject.step : prev;

          fieldObject.value = temp;
          handleReRender(temp);

          return temp;
        } else {
          return Math.min(0 + fieldObject.step, fieldObject.maxVal);
        }
      });
    }
  };

  const handleMinus = () => {
    if (fieldObject.type === "quntity") {
      setRemoteValue((prev) => {
        if (prev) {
          const temp =
            prev > fieldObject.minVal ? prev - fieldObject.step : prev;

          fieldObject.value = temp;
          handleReRender(temp);

          return temp;
        } else {
          return Math.max(0 - fieldObject.step, fieldObject.minVal);
        }
      });
    }
  };

  return (
    <div className="flex items-center flex-row gap-2">
      <label className="text-black/70 text-sm md:text-base">
        {fieldObject.name}:{" "}
      </label>

      <button
        onClick={handleMinus}
        className="bg-white/50 p-3 aspect-1 rounded-full cursor-pointer"
      >
        <CloseBtn size="small" type="minus" color="#F03D5F" strokeWidth={3} />
      </button>

      <div className="bg-white/50 rounded-lg flex flex-row justify-center items-center">
        <p className="text-black/50 px-4 md:px-8 py-3 md:py-4 text-sm md:text-base font-popR">
          {remoteValue
            ? `${remoteValue} ${
                fieldObject.type === "quntity" && fieldObject.text
                  ? ` ${fieldObject.text}`
                  : ""
              }`
            : "NA"}
        </p>
      </div>

      <button
        onClick={handlePlus}
        className="bg-white/50 p-3 aspect-1 rounded-full cursor-pointer"
      >
        <CloseBtn size="small" type="plus" color="#2BA32F" strokeWidth={3} />
      </button>
    </div>
  );
};

export default QuantityComp;
