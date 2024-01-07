import { ChevronLeftIcon } from "@heroicons/react/solid";
import { UserInterface } from "@models/User/User";

interface Props {
  onBack: () => void;
  remoteUser?: UserInterface;
  text: string;
  moreNode?: React.ReactNode;
}

const ProgressHeader: React.FC<Props> = ({ onBack, text, moreNode }) => (
  <div className="w-full flex items-center justify-between py-4">
    <div onClick={onBack} className="cursor-pointer">
      <ChevronLeftIcon className="w-8 h-8" color="#23262F" />
    </div>

    <p className="text-[#23262F] text-base font-popSB flex-1 px-4 md:text-center">
      {text}
    </p>

    {moreNode ? moreNode : null}
  </div>
);

export default ProgressHeader;
