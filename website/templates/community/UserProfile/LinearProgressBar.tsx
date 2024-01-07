import * as React from "react";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
// import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const LinearProgressWithLabel = (
  props: LinearProgressProps & { value: number; label: string }
) => {
  return (
    <div>
      <div className="flex items-center justify-between pb-2">
        <div>
          <p className="font-semibold text-orange-500 text-lg">
            {`${props.label} 🏅`}
          </p>
        </div>
        <div>
          <p className="text-gray-500">{`${props.value}%`}</p>
        </div>
      </div>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
    </div>
  );
};

export default LinearProgressWithLabel;
