import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { currency } from "./SelectPlan";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

interface Props {
  selectedCurrency: currency;
  onChange: (newCurrency: currency) => void;
}

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const CurrencySwitch: React.FC<Props> = ({ selectedCurrency, onChange }) => {
  return (
    <div className="w-[200px]">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Currency</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedCurrency === "INR" ? 1 : 0}
            label="Currency"
            onChange={(e) => onChange(e.target.value === 0 ? "USD" : "INR")}
          >
            <MenuItem value={0}>USD $</MenuItem>
            <MenuItem value={1}>INR ₹</MenuItem>
          </Select>
        </FormControl>
      </ThemeProvider>
    </div>
  );
};

export default CurrencySwitch;
