import Button from "@components/button";
import { LocalCohort } from "@models/Event/Event";
import clsx from "clsx";
// import CohortCard from "./CohortCard";

interface Props {
  onClick: (id: string) => void;
  cohorts: LocalCohort[];
  editingId?: string;
  onNewCohort: () => void;
}

const EditingCohort: React.FC<Props> = ({
  onClick,
  cohorts,
  editingId,
  onNewCohort,
}) => {
  return (
    <div className="flex flex-wrap items-center">
      {cohorts.map((item) => {
        return (
          <div key={item.id} className="pr-2">
            <div
              onClick={() => onClick(item.id)}
              className={clsx(
                editingId === item.id ? "border-4 border-blue-500" : "border-4",
                "bg-white px-4 py-2 rounded-full",
                "flex items-center",
                "cursor-pointer shadow-sm hover:shadow-lg"
              )}
            >
              <p className="text-gray-500 text-sm font-normal pr-1">
                {editingId === item.id ? "Editing:" : ""}
              </p>
              <p className="text-gray-700 text-sm font-semibold">
                {item.cohortName}
              </p>
            </div>
          </div>
        );
      })}
      {cohorts.length === 0 ? (
        <div>
          <div>
            <p className="text-4xl text-gray-600 font-medium">
              No cohort exists
            </p>
            <p className="text-sm text-gray-600 font-light pt-1">
              Cohorts based teaching leads to 10x better completition rates
              (Harvard study)
            </p>
          </div>
          <div className="flex pt-4">
            <Button appearance="contained" onClick={onNewCohort}>
              <div className="pl-2 pr-2">
                <p className="capitalize">Create cohort now</p>
              </div>
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default EditingCohort;
