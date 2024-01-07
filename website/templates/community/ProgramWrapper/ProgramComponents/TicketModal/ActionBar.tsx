interface Props {
  isRevaluated?: boolean;
  leftText: string;
  leftButtonLink: string;
  onClearTicket: () => void;
}

const ActionBar: React.FC<Props> = ({
  isRevaluated,
  onClearTicket,
  leftButtonLink,
  leftText,
}) => {
  return (
    <>
      <div className="w-full h-px bg-[#BABABA]" />
      <div className="iphoneX:text-lg w-full flex justify-evenly items-center">
        <a href={leftButtonLink}>
          <button className="flex items-center my-4" onClick={() => {}}>
            <img
              src={`https://ik.imagekit.io/socialboat/Vector__4__X4Na5-xfU.png?ik-sdk-version=javascript-1.4.3&updatedAt=1653904714709`}
              alt="view icon"
            />
            <p className="pl-2">{leftText}</p>
          </button>
        </a>
        {isRevaluated ? <div className="w-px h-full bg-[#BABABA]" /> : null}
        {isRevaluated ? (
          <button className="flex items-center my-4" onClick={onClearTicket}>
            <img
              src={`https://ik.imagekit.io/socialboat/ic_baseline-airplane-ticket_iZNx6bYrP.png?ik-sdk-version=javascript-1.4.3&updatedAt=1653904714751`}
              alt="retry icon"
            />
            <p className="pl-2">Clear Ticket</p>
          </button>
        ) : null}
      </div>
      <div className="w-full h-px bg-[#BABABA]" />
    </>
  );
};

export default ActionBar;
