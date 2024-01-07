import { LocalCohort } from "@models/Event/Event";
import clsx from "clsx";
import CohortCard from "./CohortCard";

interface Props {
  cohorts: LocalCohort[];
  onClose: (id: string) => void;
  onClick: (id: string) => void;
  onPinPress: (id: string) => void;
}

const CohortHolder: React.FC<Props> = ({
  cohorts,
  onClick,
  onClose,
  onPinPress,
}) => {
  return (
    <div className="flex flex-wrap h-52 bg-gray-300 rounded-md shadow-inner overflow-y-auto">
      {cohorts.map((item) => {
        return (
          <div key={item.id} className={clsx("p-2")}>
            <CohortCard
              cohort={item}
              onPinPress={() => onPinPress(item.id)}
              onClick={() => onClick(item.id)}
              onClose={() => onClose(item.id)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default CohortHolder;
