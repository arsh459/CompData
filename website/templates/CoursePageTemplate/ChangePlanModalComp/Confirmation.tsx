export interface ConfirmationProps {
  onClose: () => void;
  onNext: () => void;
  heading: string;
  subtitle: string;
  ctaCancel?: string;
  ctaProceed?: string;
}

const Confirmation: React.FC<ConfirmationProps> = ({
  onClose,
  heading,
  subtitle,
  onNext,
  ctaCancel,
  ctaProceed,
}) => {
  return (
    <div>
      <p className="text-white text-2xl" style={{ fontFamily: "Nunito-Bold" }}>
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
  );
};

export default Confirmation;
