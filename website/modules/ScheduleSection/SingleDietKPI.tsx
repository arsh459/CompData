import clsx from "clsx";

interface Props {
  value?: number;
  base?: number;
  keyStr: string;
  unit: string;
}

const greenTH = 0.1;
const yellowTH = 0.2;

const SingleDietKPI: React.FC<Props> = ({ value, base, keyStr, unit }) => {
  let color = "text-gray-700";
  if (typeof value === "number" && typeof base === "number") {
    const diff = Math.abs(value - base);
    const perc = diff / base;

    if (perc <= greenTH) {
      color = "text-green-600";
    } else if (perc > greenTH && perc <= yellowTH) {
      color = "text-yellow-600";
    } else {
      color = "text-red-600";
    }
  }

  return (
    <div className={clsx("flex items-center")}>
      <p className="min-w-[50px]">{keyStr}: </p>
      <p className={clsx("pl-2", color)}>
        {value ? Math.round(value * 10) / 10 : "-"}{" "}
        {base ? `/ ${Math.round(base * 10) / 10}` : ""} {unit}
      </p>
    </div>
  );
};

export default SingleDietKPI;
