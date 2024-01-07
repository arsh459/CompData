import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import clsx from "clsx";

interface Props {
  current: number;
  onChange: (val: number) => void;
  currStr?: string;
  step?: number;
  min?: number;
  max?: number;
  unit?: string;
  vertical?: boolean;
  btnRounded?: string;
}

const LeftRight: React.FC<Props> = ({
  current,
  onChange,
  currStr,
  step,
  min,
  max,
  unit,
  vertical,
  btnRounded,
}) => {
  const text = currStr ? currStr : `${current} ${unit}`;

  return (
    <div
      className={clsx(
        "flex  justify-center items-center",
        vertical ? "flex-col-reverse" : "flex-row"
      )}
    >
      <button
        className={clsx("w-4 iphoneX:w-6 aspect-1 cursor-pointer aspect-1")}
        onClick={() => onChange(current - (step ? step : 1))}
        disabled={current <= (min ? min : 0)}
      >
        <ChevronLeftIcon color="#5F647E" />
      </button>
      <div className="w-2" />
      <div
        className="flex flex-row justify-center items-center my-2 py-2"
        style={
          {
            // width: (currStr ? 4 : text.length) * (width >= iPhoneX ? 24 : 20),
          }
        }
      >
        <p className="text-white px-8 text-xl iphoneX:text-2xl font-baib">
          {text}
        </p>
      </div>
      <div className="w-2" />
      <button
        className={clsx("w-4 iphoneX:w-6 aspect-1 cursor-pointer aspect-1")}
        onClick={() => onChange(current + (step ? step : 1))}
        disabled={current >= (max ? max : 100)}
      >
        <ChevronRightIcon color="#5F647E" />
      </button>
    </div>
  );
};

export default LeftRight;
