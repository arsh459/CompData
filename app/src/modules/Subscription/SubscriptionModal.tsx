import HelpBtn from "@components/Buttons/HelpBtn";
import UseModal from "@components/UseModal";
import Header from "@modules/Header";
import SubscriptionV3 from "./SubscriptionV3";
interface Props {
  isOpen: boolean;
  onCloseModal: () => void;
}

const SubscriptionModal: React.FC<Props> = ({ isOpen, onCloseModal }) => {
  return (
    <UseModal
      visible={isOpen}
      onClose={onCloseModal}
      width="w-full"
      height="h-full"
      hasHeader={true}
    >
      <Header
        back={true}
        onBack={onCloseModal}
        optionNode={<HelpBtn />}
        headerColor="#100F1A"
        headerType="transparent"
        tone="dark"
      />
      <SubscriptionV3 onCloseModal={onCloseModal} />
    </UseModal>
  );
};
export default SubscriptionModal;
