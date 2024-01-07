import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import StartNewChatMain from "@modules/ChatBot/StartNewChatMain";

const StartNewChat = () => {
  useScreenTrack();

  return <StartNewChatMain />;
};

export default StartNewChat;
