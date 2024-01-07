// import axios from "axios";
import { MUX_SECRET_PROD, MUX_ACCESS_TOKEN_ID_PROD } from "react-native-dotenv";
import { encode as btoa } from "base-64";

// const { StreamManager } = NativeModules;
export interface playbackId {
  policy: string;
  id: string;
}

interface muxStreamCreation {
  data?: {
    id?: string;
    stream_key?: string;
    status?: string;
    playback_ids?: playbackId[];
    created_at?: string;
  };
}

export const createNewStream = async () => {
  const response = await fetch("https://api.mux.com/video/v1/live-streams", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Basic " + btoa(`${MUX_ACCESS_TOKEN_ID_PROD}:${MUX_SECRET_PROD}`),
    },
    // body: '{ "playback_policy": ["public"], "new_asset_settings": { "playback_policy": ["public"] } }',
    body: JSON.stringify({
      playback_policy: ["public"],
      new_asset_settings: {
        playback_policy: ["public"],
        // mp4_support: "standard",
      },
    }),
  });

  const result = await response.json();

  // const response = await axios({
  //   url: "https://api.mux.com/video/v1/live-streams",
  //   method: "POST",
  //   data: {
  //     playback_policy: ["public"],
  //     new_asset_settings: {
  //       playback_policy: ["public"],
  //     },
  //   },
  //   auth: {
  //     username: MUX_ACCESS_TOKEN_ID,
  //     password: MUX_SECRET,
  //   },
  // });

  const results = result as muxStreamCreation;
  return results;
  // if (results.data) {
  //   if (StreamManager.startCamera) {
  //     StreamManager.startCamera();
  //   }
  // }
};
