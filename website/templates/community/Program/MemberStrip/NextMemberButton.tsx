interface Props {
  onClick: () => void;
  noText?: boolean;
}

const NextMemberButton: React.FC<Props> = ({ onClick, noText }) => {
  return (
    <div
      onClick={onClick}
      className=" flex flex-col items-center justify-center cursor-pointer"
    >
      <div className=" shadow-sm border flex-none  rounded-full bg-gray-300 p-3">
        <img
          className="w-3 h-3 object-cover"
          src="https://img.icons8.com/material-outlined/96/000000/double-right.png"
        />
      </div>
      {/* <div className="flex-grow"> */}
      {noText ? null : (
        <p className="pt-0.5 underline text-gray-700 flex-grow  text-xs text-center">
          Show more
        </p>
      )}
      {/* </div> */}
    </div>
  );
};

export default NextMemberButton;
