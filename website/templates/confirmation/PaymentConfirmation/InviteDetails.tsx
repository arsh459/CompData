import { EventInterface } from "@models/Event/Event";
import { Registration } from "@models/Registrations/Registrations";
// import { sbEventPayment } from "pages/api/payments/utils/interface";

interface Props {
  registration: Registration;
  event: EventInterface;
}

const InviteDetails: React.FC<Props> = ({ registration, event }) => {
  return (
    <div className="">
      <p className="text-sm text-gray-600 font-semibold">Details</p>
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">ID:</p>
        <p className="text-sm text-gray-700 text-right break-all ml-2">
          {registration.id}
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
          {registration.phone}
        </p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">Amount paid:</p>
        <p className="text-sm text-gray-700 text-right break-all ml-2">
          By invite
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

export default InviteDetails;
