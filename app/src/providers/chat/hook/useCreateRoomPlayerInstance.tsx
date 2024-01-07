import { useEffect } from "react";
import { useChatVoiceStore } from "../store/useChatVoiceStore";
import AudioRecorderPlayer from "react-native-audio-recorder-player";
import { shallow } from "zustand/shallow";

const useCreateRoomPlayerInstance = () => {
  const { setAudioPlayer, setCurrentMessageAudio } = useChatVoiceStore(
    (state) => ({
      setAudioPlayer: state.setAudioPlayer,
      setCurrentMessageAudio: state.setCurrentMessageAudio,
    }),
    shallow
  );
  useEffect(() => {
    const player = new AudioRecorderPlayer();
    setAudioPlayer(player);
    // console.log("create instance");

    // if (audioPlayer) {
    return () => {
      player.stopPlayer();
      player.removePlayBackListener();
      setAudioPlayer(null);
      setCurrentMessageAudio("Reset");
      // console.log("Instance is cleared");
    };
    // }
  }, []);
  return;
};

export default useCreateRoomPlayerInstance;
