import { dateObject } from "@hooks/tasks/program/useProgramTasks";
import CreateModal from "@templates/community/Program/CreateModal/CreateModal";
// import CloseBtn from "@templates/community/Program/Feed/CloseBtn";
import CloseBtnV2 from "./CloseBtnV2";
import SelectMonth from "./SelectMonth";

interface Props {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;

  daysArray: dateObject[];
  selectedMonth: string;
  setMonth: (val: string) => void;
}

const SelectMonthModal: React.FC<Props> = ({
  isOpen,
  setIsOpen,
  daysArray,
  selectedMonth,
  setMonth,
}) => {
  const onClose = () => setIsOpen(false);
  return (
    <CreateModal
      isOpen={isOpen}
      heading=""
      onBackdrop={onClose}
      onButtonPress={onClose}
      onCloseModal={onClose}
      bgData="bg-[#F3F9FFE3] fixed inset-0 z-50 w-full h-full mx-auto "
    >
      <div className="w-full h-full p-4 backdrop-blur-[14px] overflow-y-scroll flex items-center flex-col justify-center  ">
        <div className=" flex   items-center justify-between w-full px-8">
          <h2 className="text-2xl italic font-extrabold text-[#59A4DA] flex-1 ">
            Complete Program
          </h2>
          <CloseBtnV2 onCloseModal={onClose} color={"#59A4DA"} />
        </div>
        <div className="h-px bg-[#515151]" />

        <SelectMonth
          daysArray={daysArray}
          selectedMonth={selectedMonth}
          setMonth={setMonth}
          onClose={onClose}
        />
        <div className="h-2px bg-[#000]" />
      </div>
    </CreateModal>
  );
};

export default SelectMonthModal;
