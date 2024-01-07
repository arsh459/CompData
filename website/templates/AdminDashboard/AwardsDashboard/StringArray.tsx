import { stringArrayKeys } from "@hooks/awards/useAward";
import { Button, TextField } from "@mui/material";
import { useState } from "react";

interface Props {
  target?: string[];
  addInTarget: (val: string, key: stringArrayKeys, index?: number) => void;
  deleteFromTarget: (val: string, key: stringArrayKeys) => void;
  keytargetKey: stringArrayKeys;
}

const StringArray: React.FC<Props> = ({
  target,
  addInTarget,
  deleteFromTarget,
  keytargetKey,
}) => {
  const [editIndex, setEditIndex] = useState<number>();
  const [tempStr, setTempStr] = useState<{ [key in stringArrayKeys]: string }>({
    howToAchieve: "",
  });

  return (
    <div className="mt-8 border p-4">
      <div className="flex">
        <TextField
          style={{ flex: 1 }}
          placeholder={"How to achive this award"}
          label={"How to achive this award"}
          variant="outlined"
          onChange={(val) =>
            setTempStr((prev) => ({
              ...prev,
              [keytargetKey]: val.target.value,
            }))
          }
          value={tempStr[keytargetKey]}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <div className="w-4 aspect-1" />
        <Button
          onClick={() => {
            addInTarget(tempStr[keytargetKey], keytargetKey, editIndex);
            setTempStr((prev) => ({ ...prev, [keytargetKey]: "" }));
            setEditIndex(undefined);
          }}
          variant="contained"
        >
          add step
        </Button>
      </div>
      {target?.length ? (
        <div className="border p-4 mt-4">
          {target.map((each, index) => (
            <div
              key={`${each}-${index}`}
              style={{
                display: index === editIndex ? "none" : "flex",
                marginTop: index === 0 ? 0 : 16,
              }}
            >
              <div className="flex-1 bg-green-200 rounded flex justify-center items-center">
                <p className="flex-1 px-2">
                  {index + 1}. {each}
                </p>
              </div>
              <div className="px-4">
                <Button
                  onClick={() => {
                    setEditIndex(index);
                    setTempStr((prev) => ({ ...prev, [keytargetKey]: each }));
                  }}
                  variant="contained"
                  color="secondary"
                >
                  edit step
                </Button>
              </div>
              <Button
                onClick={() => {
                  deleteFromTarget(each, keytargetKey);
                }}
                variant="contained"
                color="error"
              >
                delete step
              </Button>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default StringArray;
