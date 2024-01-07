import { useEffect, useState } from "react";

export type popupType = "CANCELLED" | "DONE" | "PENDING";

export const usePopup = (time: number, cancel?: boolean) => {
  const [popupState, setPopupState] = useState<popupType>(
    cancel ? "CANCELLED" : "PENDING"
  );
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined = undefined;
    if (popupState === "PENDING" && !cancel) {
      timer = setTimeout(() => {
        setVisible(true);
        setPopupState("DONE");
      }, time);
    }

    if (timer) {
      return () => {
        clearTimeout(timer);
      };
    }
  }, [popupState, time, cancel]);

  const cancelPopup = () => setPopupState("CANCELLED");
  const hidePopup = () => setVisible(false);

  return {
    visible,
    popupState,
    cancelPopup,
    hidePopup,
  };
};
