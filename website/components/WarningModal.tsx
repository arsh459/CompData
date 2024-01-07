import Loading from "@components/loading/Loading";
import CreateModal from "@templates/community/Program/CreateModal/CreateModal";

interface Props {
  visible: boolean;
  onClose: () => void;
  onNext: () => void;
  heading: string;
  subtitle: string;
  loading?: boolean;
  ctaCancel?: string;
  ctaProceed?: string;
}

const WarningModal: React.FC<Props> = ({
  visible,
  onClose,
  heading,
  subtitle,
  onNext,
  loading,
  ctaCancel,
  ctaProceed,
}) => {
  return (
    <CreateModal
      isOpen={visible}
      onCloseModal={onClose}
      onBackdrop={onClose}
      onButtonPress={onClose}
      heading=""
      maxW="max-w-none"
      bgProp="w-full h-screen"
    >
      <div className="w-full h-full flex justify-center items-center bg-[#100F1A]/25 backdrop-blur-2xl">
        {loading ? (
          <Loading fill="#ff735c" height={30} width={30} />
        ) : (
          <div className="p-12">
            <p
              className="text-white text-2xl"
              style={{ fontFamily: "Nunito-Bold" }}
            >
              {heading}
            </p>
            <p
              className="text-[#CCCCCC] text-sm my-4"
              style={{ fontFamily: "Nunito-Regular" }}
            >
              {subtitle}
            </p>
            <div className="my-4 flex flex-row gap-4">
              <div
                onClick={onClose}
                className="flex-1 bg-[#6D55D1] rounded-md py-2.5"
              >
                <p
                  className="text-white text-sm text-center"
                  style={{ fontFamily: "Nunito-Medium" }}
                >
                  {ctaCancel ? ctaCancel : "No keep my plan"}
                </p>
              </div>
              <div
                onClick={onNext}
                className="flex-1 border border-white rounded-md py-2.5"
              >
                <p
                  className="text-white text-sm text-center"
                  style={{ fontFamily: "Nunito-Medium" }}
                >
                  {ctaProceed ? ctaProceed : "Yes change it"}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </CreateModal>
  );
};

export default WarningModal;
