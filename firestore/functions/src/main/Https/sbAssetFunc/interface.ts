interface MUXTrack {
  type?: "video";
  max_width?: number;
  max_height?: number;
  max_frame_rate?: number;
  id?: string;
}

export interface PlayBackId {
  policy: string;
  id: string;
}

interface MUXRecordingTime {
  type?: "content";
  started_at?: { seconds: number; nanos: number };
  duration: number;
}

interface MUXData {
  tracks?: MUXTrack[];
  status?: "ready";
  recording_times?: MUXRecordingTime[];
  playback_ids?: PlayBackId[];
  live_stream_id?: string;
  isLive?: boolean;
  id?: string;
  duration?: number;
  aspect_ratio?: string;
}

export interface muxResponse {
  type:
    | "video.asset.ready"
    | "video.asset.created"
    | "video.asset.errored"
    | "video.asset.updated"
    | "video.asset.deleted"
    | "video.asset.live_stream_completed";
  object?: {
    type?: string;
    id?: string;
  };
  id?: string;
  request_id?: string | null;
  data?: MUXData;
}
