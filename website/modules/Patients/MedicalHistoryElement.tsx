import clsx from "clsx";
import React from "react";
interface Props {
  primary?: string;
  secondary?: string;
  borderTw?: string;
}
const MedicalHistoryElement: React.FC<Props> = ({
  primary,
  secondary,
  borderTw,
}) => {
  return (
    <>
      <div className={clsx("flex p-4 border-black/10", borderTw)}>
        <p className="text-black/70 text-xs font-popM ">{primary}</p>
        <p className="text-black/30 pl-2 text-xs font-popR ">{secondary}</p>
      </div>
    </>
  );
};

export default MedicalHistoryElement;
