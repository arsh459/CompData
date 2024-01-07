import clsx from "clsx";
import CreateModal from "../CreateModal/CreateModal";
import TopClose from "../Feed/TopClose";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  months: { key: string; value: string }[];
  selectedMonth: string;
  currentMonth: string;
  onMonthClick: (newMonth: string) => void;
}

const MonthSelectorModal: React.FC<Props> = ({
  isOpen,
  onClose,
  months,
  selectedMonth,
  currentMonth,
  onMonthClick,
}) => {
  //   console.log("currentMonth", currentMonth);

  return (
    <div>
      <CreateModal
        isOpen={isOpen}
        onBackdrop={onClose}
        onCloseModal={onClose}
        heading=""
        onButtonPress={() => {}}
      >
        <div className="py-4 px-4">
          <div className="pb-2  flex justify-between">
            <div className="cursor-pointer">
              <TopClose onCloseModal={onClose} />
            </div>
            <div>
              <p className="text-xl font-semibold text-gray-500">
                Select month
              </p>
            </div>
            <div></div>
          </div>

          <div className="pt-4">
            {months.map((item) => {
              return (
                <div
                  onClick={() => {
                    onMonthClick(item.key);
                    onClose();
                  }}
                  className="py-2 cursor-pointer w-full flex items-center justify-center"
                  key={item.key}
                >
                  <p
                    className={clsx(
                      item.key === selectedMonth
                        ? "font-semibold"
                        : "font-light",

                      "text-xl"
                    )}
                  >
                    {item.value}
                  </p>

                  {currentMonth === item.value ? (
                    <p className="text-lg pl-4 text-gray-500">(Current)</p>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </CreateModal>
    </div>
  );
};

export default MonthSelectorModal;
