import { ClockIcon } from "@heroicons/react/solid";
import clsx from "clsx";
import ChampionIcon from "public/icons/ChampionIcon";
import FireIcon from "public/icons/FireIcon";

interface Props {
  kpi?: number | string;
  kpiString?: string;
  icon?: "flame" | "clock" | "trophy";
  label?: string;
  textColor?: "red" | "gray";
}

const PostKPI: React.FC<Props> = ({
  kpiString,
  kpi,
  label,
  icon,
  textColor,
}) => {
  return (
    <div className="flex items-center">
      {icon === "flame" ? (
        <FireIcon style={{ height: "40", width: "40" }} />
      ) : icon === "clock" ? (
        <ClockIcon style={{ height: "40", width: "40" }} />
      ) : (
        <ChampionIcon style={{ height: "40", width: "40" }} />
      )}
      <div className="pl-2">
        <p
          className={clsx(
            textColor === "gray" ? "text-gray-500" : "text-red-500",
            kpiString ? "text-sm" : "text-xl font-semibold"
          )}
        >
          {kpiString ? kpiString : kpi}
        </p>
        <p className="text-gray-500 font-semibold text-base">{label}</p>
      </div>
    </div>
  );
};

export default PostKPI;
