import clsx from "clsx";
import React from "react";
import Loading from "./Loading";

interface Props {
  fill: string;
  width: number;
  height: number;
  noBg?: boolean;
  fixed?: boolean;
}

const LoadingModal: React.FC<Props> = ({
  fill,
  width,
  height,
  noBg,
  fixed,
}) => {
  return (
    <div
      className={clsx(
        noBg ? "" : "bg-smoke-600",
        fixed
          ? "fixed inset-0 z-50 flex justify-center items-center"
          : "z-50 flex h-full justify-center items-center absolute inset-0"
      )}
    >
      <Loading fill={fill} width={width} height={height} />
    </div>
  );
};

export default LoadingModal;
