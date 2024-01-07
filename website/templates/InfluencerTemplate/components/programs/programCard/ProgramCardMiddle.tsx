import { ProgramDetails } from "../OurPrograms";
import MiddleCardComp from "./MiddleCardComp";

interface Props {
  details: ProgramDetails[];
}

// const arr = [1, 2, 3];
const ProgramCardMiddle: React.FC<Props> = ({ details }) => {
  return (
    <div className="w-full h-[30%] ">
      {details.map((each, index) => {
        return <MiddleCardComp key={index} detail={each} />;
      })}
    </div>
  );
};

export default ProgramCardMiddle;
