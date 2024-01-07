import Filter from "@templates/AdminDashboard/Filter";
import DatesModal from "@templates/AdminDashboard/FilterModal/DatesModal";
import { getFilterName } from "@templates/AdminDashboard/FilterModal/utils";
import CreateModal from "@templates/community/Program/CreateModal/CreateModal";
import { useState } from "react";

interface Props {
  q: { dS?: string | undefined; dE?: string | undefined };
}

// const nowDate = new Date();
// const now = new Date(
//   nowDate.getFullYear(),
//   nowDate.getMonth(),
//   nowDate.getDate(),
//   0,
//   0,
//   0,
//   0
// ).getTime();
// const now_7 = now + 7 * 24 * 60 * 60 * 1000;

// console.log(now, now_7);

const DateModal: React.FC<Props> = ({ q }) => {
  const [modalState, setModalState] = useState<boolean>(false);
  const onCloseModal = () => setModalState(false);
  const onOpenModal = () => setModalState(true);

  return (
    <>
      <CreateModal
        isOpen={modalState}
        onBackdrop={onCloseModal}
        onCloseModal={onCloseModal}
        heading=""
        //   maxW="max-w-2xl"
        onButtonPress={() => {}}
      >
        <DatesModal q={q} />
      </CreateModal>
      <Filter
        text={getFilterName("dS", q)}
        selected={true}
        onClick={onOpenModal}
      />
    </>
  );
};

export default DateModal;
