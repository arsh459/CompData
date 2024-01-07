import IconButton from "@components/button/iconButton";
import { LocalCohort } from "@models/Event/Event";

interface Props {
  cohort: LocalCohort;
  onClose?: () => void;
  onClick: () => void;
  onPinPress: () => void;
}

const CohortCard: React.FC<Props> = ({
  cohort,
  onClick,
  onClose,
  onPinPress,
}) => {
  return (
    <div className="relative shadow-md hover:shadow-lg">
      <div
        onClick={onClick}
        className="w-44 p-2 rounded-t-md bg-white cursor-pointer"
      >
        <p className="text-gray-700 text-sm font-semibold">
          {cohort.cohortName}
        </p>
        <p className="text-gray-700 text-sm font-medium">
          {cohort.cohortSize} students
        </p>
        <p className="text-gray-500 text-sm font-normal">
          Deadline:{" "}
          {cohort.registerBy
            ? cohort.registerBy.toLocaleDateString()
            : "To add"}
        </p>
        <p className="text-gray-500 text-sm font-normal">
          Starts:{" "}
          {cohort.cohortStarts
            ? cohort.cohortStarts.toLocaleDateString()
            : "To add"}
        </p>
      </div>
      <div className="flex justify-end items-center bg-white pb-2 pl-2 pr-2 rounded-b-md">
        <div className="pr-2">
          <div
            className="px-2 py-1 rounded bg-white border shadow-sm cursor-pointer"
            onClick={onClick}
          >
            <p className="text-xs text-gray-700 font-medium">Edit</p>
          </div>
        </div>
        <div className="flex flex-row-reverse">
          {cohort.pinned ? (
            <div className="px-2 py-1 rounded bg-green-500">
              <p className="text-xs text-white font-medium">Pinned</p>
            </div>
          ) : (
            <div
              className="px-2 py-1 rounded bg-gray-300 hover:bg-gray-200 cursor-pointer"
              onClick={onPinPress}
            >
              <p className="text-xs text-gray-700 font-medium">Pin Cohort</p>
            </div>
          )}
        </div>
      </div>
      {onClose ? (
        <div className="top-1 right-1 absolute">
          <IconButton onClick={onClose} />
        </div>
      ) : null}
    </div>
  );
};

export default CohortCard;
