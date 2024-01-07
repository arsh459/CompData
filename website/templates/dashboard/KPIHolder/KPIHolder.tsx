import KPIContainer from "@templates/dashboard/KPIContainer/index";
import clsx from "clsx";
import { formatWithCommas } from "utils/number";
import { earnings, students, due, currency } from "../constants";

interface Props {}

const DashboardTemplate: React.FC<Props> = ({}) => {
  return (
    <div>
      <div className="flex space-x-4 justify-center">
        <KPIContainer
          label="Due"
          value={due}
          currency={currency}
          color="primary"
        />
        <KPIContainer
          label="Students"
          value={students}
          currency=""
          color="primary"
        />
      </div>
      <div className="pt-4">
        <p className={clsx("text-gray-700 text-2xl text-center")}>
          {currency}
          {formatWithCommas(earnings)}
        </p>
        <p className="underline text-lg text-center font-bold cursor-pointer text-orange-500">
          Earnings
        </p>
      </div>
    </div>
  );
};

export default DashboardTemplate;
