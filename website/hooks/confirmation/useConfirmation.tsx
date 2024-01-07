import { EventInterface } from "@models/Event/Event";
import { getEvent } from "@models/Event/getUtils";
import { getRegistration } from "@models/Registrations/getRegistration";
import { Registration } from "@models/Registrations/Registrations";
import { getPayment } from "@utils/payments/getPayment";
import { sbEventPayment } from "@utils/payments/interface";
import { useRouter } from "next/router";
// import { sbEventPayment } from
import { useEffect, useState } from "react";

export const useConfirmation = () => {
  const router = useRouter();

  const [paymentObj, setPaymentObj] = useState<sbEventPayment>();
  const [registrationObj, setRegistrationObj] = useState<Registration>();
  const [eventObj, setEventObj] = useState<EventInterface>();
  const [loading, setLoading] = useState<boolean>(true);

  // console.log("paymentObj", paymentObj);
  // console.log("eventObj", eventObj);

  useEffect(() => {
    const handleConfirmation = async () => {
      if (router.isReady) {
        const q = router.query as confirmationQuery;

        try {
          if (q.eventId) {
            const eventObj = await getEvent(q.eventId);

            // console.log("event", eventObj?.id);

            let payObj = undefined;
            let regisObj = undefined;
            if (eventObj && q.paymentId) {
              payObj = await getPayment(eventObj.ownerUID, q.paymentId);

              // console.log("pay", payObj?.id);
            }

            if (eventObj && q.registrationId) {
              regisObj = await getRegistration(
                eventObj.ownerUID,
                q.registrationId
              );

              // console.log("regisObj", regisObj?.id);
            }

            setEventObj(eventObj);
            setPaymentObj(payObj);
            setRegistrationObj(regisObj);
            setLoading(false);
          } else {
            setLoading(false);
          }
        } catch (error) {
          setLoading(false);
        }
      }
    };

    handleConfirmation();
  }, [router.isReady, router.query]);

  return {
    eventObj,
    paymentObj,
    loading,
    registrationObj,
  };
};

interface confirmationQuery {
  eventId?: string;
  paymentId?: string;
  registrationId?: string;
}
