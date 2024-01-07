import { useAppConfiguration } from "@hooks/AppConfig/useAppConfig";
import { Button, TextField } from "@mui/material";

interface Props {}

const ConfigPage: React.FC<Props> = ({}) => {
  const { config, onUpdatePrompt, onSave } = useAppConfiguration();

  return (
    <div>
      <div>
        <p className="text-lg font-medium">Config Page</p>
        <TextField
          style={{ width: "100%" }}
          placeholder={"AI Prompt"}
          label={"AI Prompt"}
          onChange={(val) => onUpdatePrompt(val.target.value)}
          value={config?.sakhiAIPrompt}
          multiline={true}
          minRows={15}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>

      <div className="flex p-4">
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={onSave}
        >
          Save Config
        </Button>
      </div>
    </div>
  );
};

export default ConfigPage;
