interface Props {
  onCloseModal: () => void;
  color?: string;
}

const CloseBtnV2: React.FC<Props> = ({ onCloseModal, color }) => {
  return (
    <div className="cursor-pointer" onClick={onCloseModal}>
      <svg
        width="19"
        height="19"
        viewBox="0 0 19 19"
        fill="none"
        stroke={color ? color : "white"}
      >
        <path d="M1 1L18 18" />
        <path d="M18.5 1L1.5 18" />
      </svg>
    </div>
  );
};

export default CloseBtnV2;
