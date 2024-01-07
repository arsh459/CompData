import { ProgramDetails } from "../OurPrograms";

interface Props {
  detail: ProgramDetails;
}
const MiddleCardComp: React.FC<Props> = ({ detail }) => {
  return (
    <div className="w-full h-1/3 flex items-center justify-start ">
      <div className="p-2.5 rounded-[10px] bg-white/20 ml-7">
        <div className="w-5">
          <img src={detail.iconUrl} className="w-full h-full aspect-[20/17]" />
        </div>
      </div>
      <div className="text-white flex-1 font-popL text-xs ml-3 tracking-wider">
        {detail.title}
      </div>
    </div>
  );
};
export default MiddleCardComp;
