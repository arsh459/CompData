interface Props {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}

const GoalModalWidget: React.FC<Props> = ({ isOpen, setIsOpen }) => {
  return (
    <div className="bg-[#282828]  rounded-lg w-full">
      {isOpen ? null : (
        <>
          <div className="flex items-center justify-between p-2">
            <h2 className="text-xl  font-bold text-white">Your Tasks</h2>
            <img
              src={`https://ik.imagekit.io/socialboat/Vector_6akik0r7W.png?ik-sdk-version=javascript-1.4.3&updatedAt=1652676176035`}
              alt="expand icon"
              className="cursor-pointer"
              onClick={() => setIsOpen(true)}
            />
          </div>
          <div className="h-px bg-[#515151]" />
          <div className="flex py-2 items-center justify-between text-[#45A4E9] p-2">
            <p>Run 5km Marathon</p>
            <p className="text-[.6rem]">On-going</p>
          </div>
        </>
      )}
    </div>
  );
};

export default GoalModalWidget;
