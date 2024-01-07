import clsx from "clsx";
import React from "react";

interface Props {
  total: number;
  funded: number;
  currency: string;
}

const ProgressBar: React.FC<Props> = ({ total, funded, currency }) => {
  return (
    <div className={clsx("h-2 w-full rounded-sm border shadow-2xl")}>
      <div className={clsx("bg-green-500 h-full rounded-sm w-3/4")} />
    </div>
  );
};

export default ProgressBar;
