import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import ChatVoiceMain from "@modules/ChatBot/ChatVoiceMain";

const ChatVoiceScreen = () => {
  useScreenTrack();
  return <ChatVoiceMain  />;
};

export default ChatVoiceScreen;
