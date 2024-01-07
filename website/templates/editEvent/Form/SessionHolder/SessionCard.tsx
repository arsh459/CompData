import IconButton from "@components/button/iconButton";
import { SessionV2 } from "@models/Event/Event";

interface Props {
  session: SessionV2;
  onClose: () => void;
  onClick: () => void;
}

const SessionCard: React.FC<Props> = ({ onClick, onClose, session }) => {
  return (
    <div className="relative">
      <div
        onClick={onClick}
        className="bg-white cursor-pointer shadow-md p-2 outline  w-44 rounded-md"
      >
        <div className="">
          <p className="text-gray-700 text-sm font-medium">
            {session.name ? session.name : "Add heading"}
          </p>
          <p className="text-gray-500 text-sm line-clamp-1 pt-1">
            {session.description ? session.description : "Add description"}
          </p>
        </div>
      </div>
      <div className="top-1 right-1 absolute">
        <IconButton onClick={onClose} />
      </div>
    </div>
  );
};

export default SessionCard;
