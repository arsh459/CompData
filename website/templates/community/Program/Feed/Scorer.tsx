import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Slider from "@mui/material/Slider";
import clsx from "clsx";

interface Props {
  score?: number;
  onChangeScore?: (newScore: number) => void;
}

const Scorer: React.FC<Props> = ({ score, onChangeScore }) => {
  return (
    <div className="">
      {typeof score === "number" ? (
        <div className="">
          <div className={clsx(onChangeScore ? "w-1/3 mx-auto" : "w-full")}>
            <CircularProgressbar
              styles={buildStyles({
                pathColor: `rgba(62, 152, 199, ${(score * 10) / 100})`,
              })}
              value={score * 10}
              text={`${score}`}
            />
          </div>
          {onChangeScore ? (
            <div className="pt-4 w-1/2 mx-auto">
              <Slider
                min={0}
                marks
                max={10}
                step={1}
                value={score}
                onChange={(_, newValue: number | number[]) => {
                  typeof newValue === "number" ? onChangeScore(newValue) : null;
                }}
              />
            </div>
          ) : null}
        </div>
      ) : null}

      {/* <Stack spacing={2} sx={{ mb: 1 }} alignItems="center"> */}

      {/* </Stack> */}
    </div>
  );
};

export default Scorer;
