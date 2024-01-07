import { EventInterface } from "@models/Event/Event";
import { sbEventPayment } from "@utils/payments/interface";
// import { sbEventPayment } from "pages/api/payments/utils/interface";

interface Props {
  payment: sbEventPayment;
  event: EventInterface;
}

const OrderDetails: React.FC<Props> = ({ payment, event }) => {
  return (
    <div className="">
      <p className="text-sm text-gray-600 font-semibold">Details</p>
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">Order ID:</p>
        <p className="text-sm text-gray-700 text-right break-all ml-2">
          {payment.order_id}
        </p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">Name:</p>
        <p className="text-sm text-gray-700 text-right break-all ml-2">
          {event.name}
        </p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">Your phone:</p>
        <p className="text-sm text-gray-700 text-right break-all ml-2">
          {payment.contact}
        </p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">Amount paid:</p>
        <p className="text-sm text-gray-700 text-right break-all ml-2">
          {payment.currency} {payment.amount / 100}
        </p>
      </div>

      <div className="pt-4">
        <p className="text-gray-500 text-sm">
          A confirmation would have been sent to you over email & WhatsApp
          number with the joining details.
        </p>
      </div>
    </div>
  );
};

export default OrderDetails;
