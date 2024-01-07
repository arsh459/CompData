import { v4 as uuidv4 } from "uuid";
import { Cast } from "./Cast";
import { getDatabase, ref, set, update } from "firebase/database";

export const createNewCast = (): string => {
  const castId = uuidv4();

  const newCast: Cast = {
    id: castId,
    state: "created",
    createdOn: Date.now(),
  };

  const database = getDatabase();
  const reference = ref(database, "casts/" + castId);

  set(reference, newCast);

  return castId;
};

export const updateCastState = (castId: string) => {
  const database = getDatabase();
  update(ref(database, "casts/" + castId), {
    state: "welcomed",
  });
};

export const updatePlaybackState = (
  castId: string,
  state: "play" | "pause"
) => {
  const database = getDatabase();
  update(ref(database, "casts/" + castId), {
    taskState: state,
  });
};
