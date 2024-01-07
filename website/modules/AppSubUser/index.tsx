import React from "react";
interface Props {
  uid: string;
}
const AppSubUser: React.FC<Props> = ({ uid }) => {
  return (
    <div className="flex items-center justify-center">AppSubUser:{uid}</div>
  );
};

export default AppSubUser;
