import { consultationType } from "@templates/ConsultationTemplate";
import clsx from "clsx";
interface Props {
  selected: consultationType;
  onClickOverview: () => void;
  onClickPrescription: () => void;
}
const DetailsToggle: React.FC<Props> = ({
  onClickOverview,
  onClickPrescription,
  selected,
}) => {
  return (
    <div className="flex justify-between w-full border-b border-[#0000001A]">
      <div className="w-1/2 py-3.5 px-3 relative z-0">
        <p
          className={clsx(
            "text-sm font-popR text-black text-center  cursor-pointer"
          )}
          onClick={onClickOverview}
        >
          Overview
        </p>
        <span
          className={clsx(
            "absolute h-[2px] left-0 right-0 bottom-0",
            selected === "Overview" && " bg-[#F62088] "
          )}
        />
      </div>
      <div className="w-1/2 py-3.5 px-3 relative z-0">
        <p
          className={clsx(
            "text-sm font-popR text-black text-center  cursor-pointer"
          )}
          onClick={onClickPrescription}
        >
          Prescritption
        </p>
        <span
          className={clsx(
            "absolute h-[2px] left-0 right-0 bottom-0",
            selected === "Prescription" && " bg-[#F62088] "
          )}
        />
      </div>
    </div>
  );
};

export default DetailsToggle;
