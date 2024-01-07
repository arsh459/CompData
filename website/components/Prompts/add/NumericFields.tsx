import { gptPrompts, numericPromptKeys } from "@models/AppConfiguration/Config";
import { TextField } from "@mui/material";

interface Props {
  gptPrompt: gptPrompts;
  updateNumericFields: (newVal: string, key: numericPromptKeys) => void;
}
const NumericFields: React.FC<Props> = ({ gptPrompt, updateNumericFields }) => {
  return (
    <>
      <div className="pt-8">
        <TextField
          style={{ width: "100%" }}
          placeholder={"Max Tokens"}
          label={"Max Tokens"}
          variant="outlined"
          type={"number"}
          onChange={(e) => updateNumericFields(e.target.value, "max_tokens")}
          value={gptPrompt.max_tokens}
          className="uppercase"
          InputProps={{ inputProps: { min: 1, max: 4096 } }}
          InputLabelProps={{
            shrink: true,
          }}
        ></TextField>
      </div>
      <div className="pt-8">
        <TextField
          style={{ width: "100%" }}
          placeholder={"Presence Penality"}
          label={"Presence Penality"}
          variant="outlined"
          type={"number"}
          onChange={(e) =>
            updateNumericFields(e.target.value, "presence_penalty")
          }
          value={gptPrompt.presence_penalty}
          InputProps={{ inputProps: { min: 0, max: 2 } }}
          className="uppercase"
          InputLabelProps={{
            shrink: true,
          }}
        ></TextField>
      </div>
      <div className="pt-8">
        <TextField
          style={{ width: "100%" }}
          placeholder={"Temperature"}
          label={"Temperature"}
          variant="outlined"
          type={"number"}
          onChange={(e) => updateNumericFields(e.target.value, "temperature")}
          value={gptPrompt.temperature}
          className="uppercase"
          InputProps={{ inputProps: { min: 0, max: 2 } }}
          InputLabelProps={{
            shrink: true,
          }}
        ></TextField>
      </div>
      <div className="pt-8">
        <TextField
          style={{ width: "100%" }}
          placeholder={"Top_p"}
          label={"Top_p"}
          variant="outlined"
          type={"number"}
          onChange={(e) => updateNumericFields(e.target.value, "top_p")}
          value={gptPrompt.top_p}
          className="uppercase"
          InputProps={{ inputProps: { min: 0, max: 1 } }}
          InputLabelProps={{
            shrink: true,
          }}
        ></TextField>
      </div>
      <div className="pt-8">
        <TextField
          style={{ width: "100%" }}
          placeholder={"Frequency Penalty"}
          label={"Frequency Penalty"}
          variant="outlined"
          type={"number"}
          onChange={(e) =>
            updateNumericFields(e.target.value, "frequency_penalty")
          }
          value={gptPrompt.frequency_penalty}
          className="uppercase"
          InputProps={{ inputProps: { min: 0, max: 2 } }}
          InputLabelProps={{
            shrink: true,
          }}
        ></TextField>
      </div>
    </>
  );
};

export default NumericFields;
