import RNFetchBlob from "rn-fetch-blob";
import { Platform } from "react-native";

export const checkIfFileExists = async (audioUrl: string) => {
  const filePath =
    Platform.OS === "ios"
      ? audioUrl.replace("file:///", "").replace("file://", "")
      : audioUrl.replace("file://", "").replace("file:/", "");

  const fileExists = await RNFetchBlob.fs.exists(filePath);
  return fileExists;
};

export const transcribeAudio = async (
  audioUrl: string,
  apiKey: string,
  previousMessageInConv?: string
) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${apiKey}`,
  };

  const filePath =
    Platform.OS === "ios"
      ? audioUrl.replace("file:///", "").replace("file://", "")
      : audioUrl.replace("file://", "").replace("file:/", "");

  const fileExists = await RNFetchBlob.fs.exists(filePath);
  // console.log("fileExists", fileExists);

  if (fileExists) {
    const data = RNFetchBlob.wrap(filePath);
    // console.log("data", data);
    // console.log("previousMessageInConv", previousMessageInConv);

    try {
      const whisperResponse = await RNFetchBlob.fetch(
        "POST",
        "https://api.openai.com/v1/audio/transcriptions",
        headers,
        [
          {
            name: "file",
            filename: Platform.OS === "ios" ? "sound.m4a" : "sound.mp4",
            type: Platform.OS === "ios" ? "audio/m4a" : "audio/mp4",
            data: data,
            // /data/user/0/com.socialboat.socialboat/cache/sound.mp4
          },
          { name: "model", data: "whisper-1" },
          {
            name: "prompt",
            data: `The transcription will be most likely in english or hindi.\nPrevious message: ${previousMessageInConv}`,
          },
        ]
      );

      // console.log("whisperResponse", whisperResponse);

      return JSON.parse(whisperResponse.data).text;
    } catch (error: any) {
      console.log("error", error);
      throw new Error(error.response);
      // console.log(error.response);
    }
  } else {
    console.log("skipping");
    throw new Error("File doesn't exist. Try again");
  }
};

export const formatAudioTime = (milliseconds: number) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes < 10 ? "0" + minutes : minutes}:${
    seconds < 10 ? "0" + seconds : seconds
  }`;
};
