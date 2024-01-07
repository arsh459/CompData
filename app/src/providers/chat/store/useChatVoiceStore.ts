import { MessageResponse } from "@models/ChatBot/interface";
import { formatAudioTime } from "@modules/ChatBot/utils";
import AudioRecorderPlayer, {
  PlayBackType,
  RecordBackType,
} from "react-native-audio-recorder-player";
import { create } from "zustand";

export type voiceStateType = "Record" | "Listening" | "Play";

export type recordedAudioStateType =
  | "Start"
  | "Paused"
  | "Resumed"
  | "Playing"
  | undefined;
export type chatAudioStateType =
  | "Start"
  | "Paused"
  | "Resumed"
  | "Playing"
  | "Reset"
  | undefined;
export interface RoomSysPromptInterface {
  roomId: string;
}

interface currentMessageAudioInterface {
  id: string;
  audioUrl: string;
  audioState: chatAudioStateType;
}
export type onSendVoicetype = (toSendMessage: string) => void;

export interface ChatVoiceStoreInterface {
  roomId: string | undefined;
  voiceState: voiceStateType;
  recordedAudioState: recordedAudioStateType;
  currentMessageAudio: currentMessageAudioInterface | undefined;
  setCurrentMessageAudio: (
    date: chatAudioStateType,
    id?: string,
    audioUrl?: string
  ) => Promise<void>;
  setVoiceState: (state: voiceStateType) => void;
  setRecordedAudioState: (state: recordedAudioStateType) => void;
  audioPlayer: AudioRecorderPlayer | null;
  setAudioPlayer: (data: AudioRecorderPlayer | null) => void;
  recordAudioPath: string | undefined;
  setRecordAudioPath: (data: string) => void;
  setRoomId: (data: string) => void;
  currentActiveMessage: MessageResponse | undefined;
  setCurrentActiveMessageVoice: (data: MessageResponse | undefined) => void;
  recordingDuration: string;
  setRecordingDuration: (data: string) => void;
  onStartRecord: () => Promise<void>;
  onStopRecord: () => Promise<void>;
  onStartPlay: () => Promise<void>;
  onPausePlay: () => Promise<void>;
  onResumePlay: () => Promise<void>;
  onStopPlay: () => Promise<void>;
  onRetry: () => Promise<void>;
}

export const useChatVoiceStore = create<ChatVoiceStoreInterface>(
  (set, get) => ({
    recordingDuration: "00:00",
    setRecordingDuration: (data: string) => {
      set((state) => ({
        ...state,
        recordingDuration: data,
      }));
    },
    currentMessageAudio: undefined,
    saveLoader: false,
    voiceState: "Record",
    recordedAudioState: undefined,
    roomId: undefined,
    sysPrompt: undefined,
    currentActiveMessage: undefined,
    setCurrentActiveMessageVoice: (data: MessageResponse | undefined) => {
      set((state) => ({
        ...state,
        currentActiveMessage: data,
      }));
    },
    setRoomId: (data: string) => {
      set((state) => ({
        ...state,
        roomId: data,
      }));
    },
    audioPlayer: null,
    recordAudioPath: undefined,
    setAudioPlayer: (data: AudioRecorderPlayer | null) => {
      set((state) => ({
        ...state,
        audioPlayer: data,
      }));
    },
    setRecordAudioPath: (data: string | undefined) => {
      set((state) => ({
        ...state,
        recordAudioPath: data,
      }));
    },
    setVoiceState: (data: voiceStateType | undefined) => {
      set((state) => ({
        ...state,
        voiceState: data,
      }));
    },
    setRecordedAudioState: (data: recordedAudioStateType) => {
      set((state) => ({
        ...state,
        recordedAudioState: data,
      }));
    },
    onStartRecord: async () => {
      const { audioPlayer } = get();
      if (audioPlayer) {
        const uri = await audioPlayer.startRecorder();
        // console.log(uri, "from the start record");
        set((state) => ({
          ...state,
          voiceState: "Listening",
          recordAudioPath: uri,
        }));

        audioPlayer.addRecordBackListener((e: RecordBackType) => {
          const durationRecorded = formatAudioTime(e.currentPosition);
          set((state) => ({
            ...state,
            recordingDuration: durationRecorded,
          }));
          return;
        });
      }
    },
    onStopRecord: async () => {
      const { audioPlayer } = get();
      if (audioPlayer) {
        await audioPlayer.stopRecorder();

        set((state) => ({
          ...state,
          voiceState: "Play",
          recordedAudioState: "Start",
        }));
      }
    },
    setCurrentMessageAudio: async (
      data: chatAudioStateType,
      id?: string,
      audioUrl?: string
    ) => {
      const { audioPlayer, currentMessageAudio } = get();
      if (audioPlayer) {
        if (data === "Reset") {
          set((state) => ({
            ...state,
            currentMessageAudio: undefined,
          }));
        } else if (audioUrl && id) {
          if (data === "Start") {
            if (currentMessageAudio?.id !== id) {
              await audioPlayer.stopPlayer();
            }
            await audioPlayer.startPlayer(audioUrl);
            audioPlayer.addPlayBackListener((e: PlayBackType) => {
              if (e.duration === e.currentPosition) {
                set((state) => ({
                  ...state,
                  currentMessageAudio: undefined,
                }));
              }
            });
            set((state) => ({
              ...state,
              currentMessageAudio: {
                id: id,
                audioUrl: audioUrl,
                audioState: "Playing",
              },
            }));
          } else if (data === "Paused") {
            await audioPlayer.pausePlayer();
            set((state) => ({
              ...state,
              currentMessageAudio: {
                id: id,
                audioUrl: audioUrl,
                audioState: "Paused",
              },
            }));
          } else if (data === "Resumed") {
            await audioPlayer.resumePlayer();
            set((state) => ({
              ...state,
              currentMessageAudio: {
                id: id,
                audioUrl: audioUrl,
                audioState: "Playing",
              },
            }));
          }
        }
      }
      return;
    },
    onStartPlay: async () => {
      const { audioPlayer, recordAudioPath } = get();
      if (audioPlayer && recordAudioPath) {
        await audioPlayer.startPlayer(recordAudioPath);
        set((state) => ({
          ...state,
          recordedAudioState: "Playing",
        }));
        audioPlayer.addPlayBackListener((e: PlayBackType) => {
          if (e.duration === e.currentPosition) {
            const duration = formatAudioTime(e.duration);
            set((state) => ({
              ...state,
              recordedAudioState: "Start",
              recordingDuration: duration,
            }));
          } else {
            const durationLeft = e.duration - e.currentPosition;
            const formatedTime = formatAudioTime(durationLeft);
            set((state) => ({
              ...state,
              recordingDuration: formatedTime,
            }));
          }
          return;
        });
      }
    },
    onPausePlay: async () => {
      const { audioPlayer } = get();
      if (audioPlayer) {
        await audioPlayer.pausePlayer();
        set((state) => ({
          ...state,
          recordedAudioState: "Paused",
        }));
      }
    },
    onResumePlay: async () => {
      const { audioPlayer } = get();
      if (audioPlayer) {
        await audioPlayer.resumePlayer();
        set((state) => ({
          ...state,
          recordedAudioState: "Playing",
        }));
      }
    },
    onStopPlay: async () => {
      const { audioPlayer } = get();
      if (audioPlayer) {
        await audioPlayer.stopPlayer();
        set((state) => ({
          ...state,
          recordedAudioState: "Start",
        }));
      }
    },
    onRetry: async () => {
      set((state) => ({
        ...state,
        voiceState: "Record",
        recordedAudioState: undefined,
      }));
    },
  })
);
