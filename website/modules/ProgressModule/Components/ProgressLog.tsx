import NavWrapper from "@components/NavWrapper";
import { ChevronRightIcon } from "@heroicons/react/solid";

interface Props {
  linkToNavigate?: string;
  baseLink?: string;
  color?: string;
  text?: string;
  subText?: string;
  imgUrl?: string;
  textStyleTw?: string;
  subTextStyleTw?: string;
}

const ProgressLog: React.FC<Props> = ({
  linkToNavigate,
  color,
  text,
  subText,
  imgUrl,
  baseLink,
}) => {
  return (
    <NavWrapper link={linkToNavigate} baseLink={baseLink}>
      <div className="px-4 mb-4 cursor-pointer">
        <div
          className="rounded-2xl flex flex-row px-5 py-4 "
          style={{ backgroundColor: color }}
        >
          <div className="w-11 aspect-1 flex justify-center items-center">
            {imgUrl && (
              <img src={imgUrl} className="w-full h-full object-contain" />
            )}
          </div>

          <div className="ml-4 flex-1 flex flex-row justify-between items-center">
            <div>
              <p className="text-[#383838] text-base iphoneX:text-lg font-bold">
                {text}
              </p>
              <p className="text-[#292929B2] text-xs font-light">{subText}</p>
            </div>

            <div className="w-6 aspect-1">
              <ChevronRightIcon color="#202020" />
            </div>
          </div>
        </div>
      </div>
    </NavWrapper>
  );
};

export default ProgressLog;
