import ChatVoicePermissionWrapper from "./wrapper/ChatVoicePermissionWrapper";
import VoicePremissionGranted from "./component/VoicePermissionGranted";

const ChatVoiceMain = () => {

  return (
    <ChatVoicePermissionWrapper>
      <VoicePremissionGranted  />
    </ChatVoicePermissionWrapper>
  );
};

export default ChatVoiceMain;
