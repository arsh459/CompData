import { useEffect, useState } from "react";

interface Props {
  weight?: number;
  height?: number;
  age?: number;
}

const LockedSection: React.FC<Props> = ({ weight, height, age }) => {
  const [heightInFeet, setHeightInFeet] = useState<number>(5);
  const [heightInInch, setHeightInch] = useState<number>(11);

  useEffect(() => {
    const dInTotal = (height ? height : 0) / 2.54;
    const dFt = Math.floor(dInTotal / 12);
    const dIn = dInTotal - dFt * 12;

    setHeightInFeet(dFt);
    setHeightInch(dIn);
  }, [height]);

  return weight || height || age ? (
    <div className="border-2 p-4 rounded-lg flex justify-center flex-col">
      <div className="">
        <div className="flex pb-2">
          <img
            className="w-5 h-5 object-cover"
            alt="locked"
            src="https://img.icons8.com/material-rounded/96/000000/lock--v1.png"
          />
          <p className="pl-2 text-gray-500 font-semibold">
            Only your coach can see
          </p>
        </div>

        {weight ? (
          <div className="flex items-center ">
            <p className="text-lg text-gray-700 w-1/5">Weight:</p>
            <p className="text-gray-700 text-lg font-semibold pl-2">{`${weight}kg`}</p>
          </div>
        ) : null}
        {heightInFeet || heightInInch ? (
          <div className="flex items-center">
            <p className="text-lg text-gray-700 w-1/5">Height:</p>
            <p className="text-gray-700 text-lg font-semibold pl-2">{`${heightInFeet}ft ${heightInInch}in`}</p>
          </div>
        ) : null}
        {age ? (
          <div className="flex items-center">
            <p className="text-lg text-gray-700 w-1/5">Age:</p>
            <p className="text-gray-700 text-lg font-semibold pl-2">{`${age}years`}</p>
          </div>
        ) : null}
      </div>
    </div>
  ) : null;
};

export default LockedSection;
