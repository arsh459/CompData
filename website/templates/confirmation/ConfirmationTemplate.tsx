import Header from "@components/header";
import Loading from "@components/loading/Loading";
import { useConfirmation } from "@hooks/confirmation/useConfirmation";
import FooterV2 from "@modules/footer/Footer";
import clsx from "clsx";
import PaymentConfirmation from "./PaymentConfirmation/PaymentConfirmation";

interface Props {}

const ConfirmationTemplate: React.FC<Props> = ({}) => {
  const { loading, paymentObj, eventObj, registrationObj } = useConfirmation();

  return (
    <div className={clsx("w-screen", "max-w-screen-xl mx-auto")}>
      <div className="fixed left-0 right-0 top-0 z-50 bg-white">
        <Header menuVisible={true} noShadow={true} />
      </div>

      <div className="h-screen">
        {!loading ? (
          <div className="flex justify-center items-center h-full">
            <PaymentConfirmation
              payment={paymentObj}
              event={eventObj}
              registration={registrationObj}
            />
          </div>
        ) : loading ? (
          <div className="flex justify-center items-center h-full">
            <Loading fill="#ff735c" width={48} height={48} />
          </div>
        ) : null}
      </div>

      <div className="pt-8 bg-gradient-to-b from-white to-gray-100 shadow-lg">
        <FooterV2 />
      </div>
    </div>
  );
};

export default ConfirmationTemplate;
