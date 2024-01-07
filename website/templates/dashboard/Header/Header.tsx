import clsx from "clsx";
import React from "react";

interface Props {
  label: string;
}
const Header: React.FC<Props> = ({ label }) => {
  return (
    <div className={clsx("p-3 shadow-lg rounded-t-xl")}>
      <p className="text-gray-700 text-2xl font-semibold">{label}</p>
    </div>
  );
};

export default Header;
