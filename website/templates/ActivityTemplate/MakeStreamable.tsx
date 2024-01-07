import axios from "axios";
import { useState } from "react";

interface Props {
  url?: string;
  playbackId?: string;
  onUpdatePlayback: (id: string) => void;
}

export interface playbackId {
  policy: string;
  id: string;
}

export interface muxStreamCreation {
  data?: {
    status?: string;
    playback_ids?: playbackId[];
    mp4_support?: string;
    master_access?: string;
    id?: string;
    created_at?: string;
  };
}

const MakeStreamable: React.FC<Props> = ({
  url,
  playbackId,
  onUpdatePlayback,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const onRemovePlayback = () => {
    onUpdatePlayback("");
  };

  const onAddPlayback = async () => {
    if (url) {
      setLoading(true);
      try {
        const response = await axios({
          url: "/api/mux/add",
          method: "POST",
          params: {
            url,
          },
        });

        const result = response.data as { playbackId?: string };

        if (result.playbackId) {
          const pID = result.playbackId;
          pID && onUpdatePlayback(pID);
        }

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
  };

  return (
    <div className="pt-2">
      {loading ? (
        <p className="text-yellow-500 text-xl">Loading</p>
      ) : !url ? (
        <p className="text-red-500 text-xl">Add Media First</p>
      ) : playbackId ? (
        <p
          onClick={onRemovePlayback}
          className="text-blue-500 text-xl underline"
        >
          Remove Current Stream
        </p>
      ) : !playbackId ? (
        <p onClick={onAddPlayback} className="text-green-500 text-xl underline">
          Make Streamable
        </p>
      ) : null}
    </div>
  );
};

export default MakeStreamable;
