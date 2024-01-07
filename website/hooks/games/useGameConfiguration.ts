import { useEffect, useState } from "react";
import { db } from "@config/firebase";
import { onSnapshot, doc, updateDoc } from "firebase/firestore";
import { EventInterface, GameConfiguration } from "@models/Event/Event";

export const useGameConfiguration = (id: string) => {
  const [loading, setLoading] = useState(false);
  const [game, setGame] = useState<EventInterface>();

  useEffect(() => {
    const ref = doc(db, "sbEvents", id);

    const unsub = onSnapshot(ref, (snapshot) => {
      if (snapshot.data()) {
        const remoteGame = snapshot.data() as EventInterface;

        setGame(remoteGame);
      }
    });

    return () => {
      if (unsub) {
        unsub();
      }
    };
  }, [id]);

  const addTags = (val: string) => {
    setGame((prev) => {
      if (prev) {
        const { configuration, ...rest } = prev;
        const remoteTags = configuration?.tagTypes
          ? [...configuration.tagTypes, val]
          : [val];

        return {
          ...rest,
          configuration: (configuration
            ? { ...configuration, tagTypes: remoteTags }
            : { tagTypes: remoteTags }) as GameConfiguration,
        };
      }
    });
  };

  const removeTags = (val: string) => {
    setGame((prev) => {
      if (prev) {
        const { configuration, ...rest } = prev;
        const remoteTags = configuration?.tagTypes?.filter(
          (each) => each !== val
        );

        return {
          ...rest,
          configuration: (configuration
            ? { ...configuration, tagTypes: remoteTags }
            : { tagTypes: remoteTags }) as GameConfiguration,
        };
      }
    });
  };

  const onSave = async () => {
    if (game?.configuration) {
      setLoading(true);
      const ref = doc(db, "sbEvents", id);

      await updateDoc(ref, { configuration: game.configuration });
      setLoading(false);
    }
  };

  return {
    configuration: game?.configuration,
    addTags,
    removeTags,
    onSave,
    loading,
  };
};
