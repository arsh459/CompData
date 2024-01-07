import { mmkvStorage } from "@config/mmkv";
import { useEffect } from "react";
import { useDeviceStore } from "../useDeviceStore";
import { shallow } from "zustand/shallow";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

export const useInstallId = () => {
  const setAnonId = useDeviceStore((st) => st.setAnonId, shallow);

  useEffect(() => {
    const ret = mmkvStorage.getString("user.installId");

    if (ret) {
      setAnonId(ret);
    } else {
      const id = uuidv4();

      setAnonId(id);
      mmkvStorage.set("user.installId", id);
    }
  }, []);
};
