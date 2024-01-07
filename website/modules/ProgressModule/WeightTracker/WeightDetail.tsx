import { UserInterface } from "@models/User/User";
import React from "react";
interface Props {
  user?: UserInterface;
}
const WeightDetail: React.FC<Props> = ({ user }) => {
  return (
    <div className="bg-[#FFD2E9] w-full aspect-[388/331] flex flex-col justify-around rounded-xl p-4 px-8 flex-1">
      <div className="flex justify-between items-center text-[#383838] ">
        <p className="text-2xl leading-6 font-nunitoSB whitespace-pre-wrap max-w-[160px]">
          Current Weight
        </p>
        <p className="font-nunitoB text-3xl ">
          {user?.weight ? `${user.weight}kg` : "-"}
        </p>
      </div>
      <div className="flex justify-between text-[#BF0050] items-center">
        <p className="text-2xl leading-6 font-nunitoSB whitespace-pre-wrap max-w-[160px]">
          Desired Weight
        </p>
        <p className="font-nunitoB text-3xl ">
          {user?.desiredWeight ? `${user.desiredWeight}kg` : "-"}
        </p>
      </div>
    </div>
  );
};

export default WeightDetail;
