import { LocalUser } from "@hooks/joinBoat/V7/interface";
import clsx from "clsx";
import React, { Dispatch, SetStateAction } from "react";
interface Props {
  setLocalUser: Dispatch<SetStateAction<LocalUser | undefined>>;
  status: boolean;
}
const OkWithPaidPlans: React.FC<Props> = ({ status, setLocalUser }) => {
  console.log({ status });

  const onClickYes = () => {
    setLocalUser((prev) => (prev ? { ...prev, isOkWithPaidPlan: true } : prev));
  };
  const onClickNo = () => {
    setLocalUser((prev) =>
      prev ? { ...prev, isOkWithPaidPlan: false } : prev
    );
  };
  return (
    <div className="flex  w-full">
      <p
        className={clsx(
          "bg-[#343150] w-1/2 cursor-pointer rounded-xl text-center p-8 py-4 m-4 ",
          status && "bg-white text-[#222134]"
        )}
        onClick={onClickYes}
      >
        Yes
      </p>
      <p
        className={clsx(
          "bg-[#343150] w-1/2 cursor-pointer rounded-xl text-center p-8 py-4 m-4 ",
          !status && "bg-white text-[#222134]"
        )}
        onClick={onClickNo}
      >
        No
      </p>
    </div>
  );
};

export default OkWithPaidPlans;
