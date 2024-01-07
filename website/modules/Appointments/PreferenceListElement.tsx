import React from "react";
interface Props {
  primaryText?: string;
  secondaryText?: string;
}
const PreferenceListElement: React.FC<Props> = ({
  primaryText,
  secondaryText,
}) => {
  return (
    <div className="px-4 py-5 border-b border-[#00000014]">
      <p className="text-xs font-popM pb-1">{primaryText} </p>
      <p className="text-[#00000080] text-xs font-popR ">{secondaryText}</p>
    </div>
  );
};

export default PreferenceListElement;
