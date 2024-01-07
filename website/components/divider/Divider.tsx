import clsx from "clsx";
import React from "react";

interface Props {}

const Divider: React.FC<Props> = ({}) => {
  return <div className={clsx("border-gray-200 border-b")} />;
};

export default Divider;
