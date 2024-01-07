import { useEffect } from "react";
import { useChatVoiceStore } from "../store/useChatVoiceStore";
import AudioRecorderPlayer from "react-native-audio-recorder-player";
import { shallow } from "zustand/shallow";

const useCreatePlayerInstance = () => {
  const { setAudioPlayer, setVoiceState, setRecordedAudioState } =
    useChatVoiceStore(
      (state) => ({
        setAudioPlayer: state.setAudioPlayer,
        setVoiceState: state.setVoiceState,
        setRecordedAudioState: state.setRecordedAudioState,
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
      // setAudioPlayer(null);
      setVoiceState("Record");
      setRecordedAudioState(undefined);
      // console.log("Instance is cleared");
    };
    // }
  }, []);
  return;
};

export default useCreatePlayerInstance;
