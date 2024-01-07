import clsx from "clsx";

interface Props {
  onCloseModal: () => void;
  sizeString?: string;
}

const TopClose: React.FC<Props> = ({ onCloseModal, sizeString }) => {
  return (
    <div className="cursor-pointer" onClick={onCloseModal}>
      <img
        alt="close-icon"
        src="/images/close-outline.svg"
        className={clsx(sizeString ? sizeString : "w-6 h-6")}
      />
    </div>
  );
};

export default TopClose;
