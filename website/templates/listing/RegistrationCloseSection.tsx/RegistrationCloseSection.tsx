import clsx from "clsx";
import React from "react";

interface Props {
  registratinCloseDate?: string;
  editing?: boolean;
  active?: boolean;
}
const RegistrationCloseSection: React.FC<Props> = ({
  registratinCloseDate,
  editing,
  active,
}) => {
  return (
    <div className={clsx("relative")}>
      {!active && editing ? (
        <div className="opacity-30 bg-black absolute left-0 top-0 right-0 bottom-0" />
      ) : null}

      <div className="pt-1 flex items-center pl-4 pr-4">
        <p className="text-orange-500 text-xs font-light">
          Registration closes on
        </p>
        <p className="text-orange-500 text-xs pl-1 font-semibold">
          {registratinCloseDate}
        </p>
      </div>
    </div>
  );
};

export default RegistrationCloseSection;
