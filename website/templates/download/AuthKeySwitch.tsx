import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AuthSignupKey } from "./DownloadTemplate";

interface Props {
  selectedKey: AuthSignupKey;
  onChange: (newCurrency: AuthSignupKey) => void;
}

const darkTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const AuthKeySwitch: React.FC<Props> = ({ selectedKey, onChange }) => {
  return (
    <div className="w-[200px]">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Auth key</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedKey === "authSigninTime" ? 1 : 0}
            label="AuthKey"
            onChange={(e) =>
              onChange(
                e.target.value === 0 ? "authSignupTime" : "authSigninTime"
              )
            }
          >
            <MenuItem value={0}>authSignupTime</MenuItem>
            <MenuItem value={1}>authSigninTime</MenuItem>
          </Select>
        </FormControl>
      </ThemeProvider>
    </div>
  );
};

export default AuthKeySwitch;
