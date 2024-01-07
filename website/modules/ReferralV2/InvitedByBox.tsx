interface Props {
  invitedBy?: string;
  invitedText?: string;
}
const InvitedByBox: React.FC<Props> = ({ invitedBy, invitedText }) => {
  return (
    <div className=" px-2 py-5  bg-opacity-70 shadow-inner border rounded-2xl border-gray-600 backdrop-blur-2xl bg-[#100F1AB8]">
      <p className=" font-bold w-full text-2xl iphoneX:text-[26px] flex-1 text-white ">
        You have been invited by <br />
        <span className="text-[#FF5970] ">{invitedBy}</span>
      </p>
      <p className="w-full py-2 text-xs iphoneX:text-sm font-normal text-[#F2F2F7D4]">
        {invitedText}
      </p>
    </div>
  );
};
export default InvitedByBox;
