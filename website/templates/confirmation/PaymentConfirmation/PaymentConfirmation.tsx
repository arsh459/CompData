import Button from "@components/button";
import { homeDomain } from "@constants/seo";
import { EventInterface } from "@models/Event/Event";
import { Registration } from "@models/Registrations/Registrations";
import { sbEventPayment } from "@utils/payments/interface";
import Link from "next/link";
// import { sbEventPayment } from "pages/api/payments/utils/interface";
import ContactUs from "./ContactUs";
import InviteDetails from "./InviteDetails";
import OrderDetails from "./OrderDetails";

interface Props {
  payment: sbEventPayment | undefined;
  event: EventInterface | undefined;
  registration: Registration | undefined;
}

const PaymentConfirmation: React.FC<Props> = ({
  payment,
  event,
  registration,
}) => {
  return (
    <div className="w-72 h-full flex flex-col justify-between">
      <div />
      <div className="">
        <div className="flex justify-center">
          <img
            src={
              event && (payment || registration)
                ? "./images/done-all-outline.svg"
                : "./images/alert-triangle-outline.svg"
            }
            className="w-24 h-24 object-cover"
            alt={
              event && (payment || registration)
                ? "done tick green"
                : "alert triangle outline"
            }
          />
        </div>
        <div>
          <p className="text-2xl text-gray-700 font-semibold text-center">
            {event && (payment || registration) ? "Thank you!" : "Oops"}
          </p>
          <p className="text-center text-gray-700">
            {event && (payment || registration)
              ? "You have successfully signed up"
              : "Something went wrong"}
          </p>
        </div>
        <div className="pt-4">
          {event && payment ? (
            <OrderDetails event={event} payment={payment} />
          ) : event && registration ? (
            <InviteDetails event={event} registration={registration} />
          ) : (
            <div className="flex justify-center pt-2">
              <Link
                href={
                  event ? `/events/${event.eventKey}` : `https://${homeDomain}`
                }
              >
                <Button appearance="contained">
                  {event ? "Try again" : "Home"}
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="pb-8">
        <p className="text-gray-700 text-sm text-center">
          Reach out for any querries
        </p>
        <div className="pt-2">
          <ContactUs />
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmation;
