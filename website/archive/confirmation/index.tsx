import ConfirmationTemplate from "@templates/confirmation/ConfirmationTemplate";
import clsx from "clsx";

interface Props {}
const Confirmation: React.FC<Props> = ({}) => {
  return (
    <div className={clsx("bg-white")}>
      <ConfirmationTemplate />
    </div>
  );
};

export default Confirmation;
