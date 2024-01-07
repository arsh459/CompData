import { checkoutCodeVerify } from "@models/Event/checkoutCodeVerify";
import { useEffect, useState } from "react";

export const usePreCheckout = (eventId: string) => {
  //   const [cName, setName] = useState<string>("");
  //   const [cEmail, setEmail] = useState<string>("");
  //   const [cPhone, setPhone] = useState<string>("");
  const [cInviteCode, setInviteCode] = useState<string>("");
  const [codeValid, setCodeValid] = useState<boolean>(false);
  const [discountOnPage, setDiscount] = useState<number>(0);
  const [discCodeId, setCodeId] = useState<string>("");

  useEffect(() => {
    // console.log("in useEffect");
    const verifyTimer = setTimeout(async () => {
      try {
        // console.log("here");
        if (cInviteCode) {
          // console.log("cInviteCode", cInviteCode);
          const { codeValid, discount, codeId } = await checkoutCodeVerify(
            eventId,
            cInviteCode
          );

          if (codeValid) {
            setCodeValid(true);
            setDiscount(discount);
            setCodeId(codeId);
          } else {
            setCodeValid(false);
            setDiscount(0);
            setCodeId("");
          }
        }
      } catch (error) {
        setCodeValid(false);
      }
    }, 120);

    // console.log("verifyTimer", verifyTimer);

    return () => {
      if (verifyTimer) {
        clearTimeout(verifyTimer);
      }
    };
  }, [cInviteCode, eventId]);

  return {
    // cName,
    // setName,
    // cEmail,
    // setEmail,
    // cPhone,
    // setPhone,
    discountOnPage,
    cInviteCode,
    setInviteCode,
    codeValid,
    discCodeId,
  };
};
