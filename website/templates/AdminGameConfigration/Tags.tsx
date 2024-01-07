import { GameConfiguration } from "@models/Event/Event";
import { Button, TextField } from "@mui/material";
import { useState } from "react";

interface Props {
  configuration?: GameConfiguration;
  addTags: (val: string) => void;
  removeTags: (val: string) => void;
}

const Tags: React.FC<Props> = ({ configuration, addTags, removeTags }) => {
  const [tag, setTag] = useState<string>("");

  const onAdd = () => {
    if (tag !== "") {
      addTags(tag);
      setTag("");
    }
  };

  return (
    <div className="mt-2 border-dashed border-2 border-red-500 p-4 my-8">
      <p className="text-lg text-gray-700">Tags</p>
      <div className="pt-8">
        <TextField
          style={{ width: "100%" }}
          placeholder={"Enter tag (ex: PCOD)"}
          label={"Enter tag (ex: PCOD)"}
          variant="outlined"
          onChange={(val) => setTag(val.target.value)}
          value={tag}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>

      <div className="p-2">
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={onAdd}
        >
          Add
        </Button>
      </div>
      {configuration?.tagTypes?.map((item) => (
        <div
          className="mt-2 p-2 border-solid border-2 rounded-xl border-gray-500 flex justify-between"
          key={item}
        >
          <p className="text-base text-gray-700">{item}</p>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => removeTags(item)}
          >
            Delete
          </Button>
        </div>
      ))}
    </div>
  );
};

export default Tags;
