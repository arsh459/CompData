import { useChatVoicePremissionStore } from "@providers/chat/store/useChatVoicePermissionStore";
import VoicePermissionRequest from "../component/VoicePermissionRequest";
import Header from "@modules/Header";
import { useEffect } from "react";
import {
  getMicPermission,
  getStoragePremission,
  // requestMicPermission,
  requestStoragePermission,
} from "@providers/chat/utils";
import { shallow } from "zustand/shallow";

interface Props {
  children: React.ReactNode;
}

const ChatVoicePermissionWrapper: React.FC<Props> = ({ children }) => {
  const {
    permissionStatusVoice,
    setStoragePermissionGranted,
    setPermissionStausVoice,
  } = useChatVoicePremissionStore(
    (state) => ({
      permissionStatusVoice: state.premissionStatusVoice,
      setStoragePermissionGranted: state.setStoragePermissionGranted,
      setPermissionStausVoice: state.setPremissionStatusVoice,
    }),
    shallow
  );

  // console.log("permissionStatusVoice", permissionStatusVoice);

  useEffect(() => {
    const checkPermission = async () => {
      const micPermStatus = await getMicPermission();
      // console.log("micPermStatus", micPermStatus);

      const storagePermStatus = await getStoragePremission();
      setPermissionStausVoice(micPermStatus);

      // console.log("storagePermStatus", storagePermStatus);

      if (storagePermStatus) {
        setStoragePermissionGranted(storagePermStatus);
      } else {
        const status = await requestStoragePermission();
        // console.log("status", status);
        setStoragePermissionGranted(status);
      }
    };
    //if (Platform.OS === "android") {
    checkPermission();
    // }
  }, []);

  // if (Platform.OS === "ios") {
  //   return (
  //     <>
  //       <Header tone="dark" headerColor="#232136" back={true} />
  //       <>{children}</>
  //     </>
  //   );
  // }

  return (
    <>
      <Header tone="dark" headerColor="#232136" back={true} />
      {permissionStatusVoice === "granted" ? (
        <>{children}</>
      ) : (
        <VoicePermissionRequest />
      )}
    </>
  );
};

export default ChatVoicePermissionWrapper;
