import React from "react";
interface Prop {
  primaryKey?: string;
  primaryValue?: string;
  secondaryKey?: string;
  secondaryValue?: string;
}
const PatientListElement: React.FC<Prop> = ({
  primaryKey,
  primaryValue,
  secondaryKey,
  secondaryValue,
}) => {
  return (
    <div className="bg-[#FFECF5] rounded-2xl p-4 mx-4 my-2">
      <p className="text-[#00000080] font-popR text-sm flex ">
        <span className="font-popM text-black">{primaryKey}</span>
        <span className="break-words  pl-2">{primaryValue}</span>
      </p>
      {secondaryKey && secondaryValue ? (
        <p className="text-[#00000080] font-popR text-sm pt-4">
          <span className="font-popM text-black">{secondaryKey}</span>
          <span> {secondaryValue}</span>
        </p>
      ) : null}
    </div>
  );
};

export default PatientListElement;
