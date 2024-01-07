import { TextField } from "@mui/material";
import { useState } from "react";

interface Props {
  waParams?: { default: string }[];
  onAddWAParams: (val: string) => void;
  onRemoveWAParams: (val: string) => void;
}

const WAParams: React.FC<Props> = ({
  waParams,
  onAddWAParams,
  onRemoveWAParams,
}) => {
  const [waParamStr, setWaParamStr] = useState<string>("");

  const onAdd = () => {
    if (waParamStr !== "") {
      onAddWAParams(waParamStr);
      setWaParamStr("");
    }
  };

  return (
    <div style={{ flex: 1 }} className="pt-4">
      <div className="flex items-center">
        <TextField
          style={{ flex: 1 }}
          placeholder={"Enter Params"}
          label={"WhatsApp Params"}
          variant="outlined"
          value={waParamStr}
          onChange={(val) => setWaParamStr(val.target.value)}
          type="string"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <button
          onClick={onAdd}
          className="bg-red-500 text-white ml-2 px-4 py-1"
        >
          Add
        </button>
      </div>
      {waParams?.length ? (
        <div className="p-1 my-1 border">
          {waParams.map((each, index) => (
            <div
              key={`${each}-${index}`}
              className="border flex justify-between items-center p-1 m-1"
            >
              <span>{each.default}</span>
              <button onClick={() => onRemoveWAParams(each.default)}>
                &#10060;
              </button>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default WAParams;
