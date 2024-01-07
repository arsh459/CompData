import { Journey } from "@models/Jounrney/Jourrney";
import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";
import { createNewJourney } from "@utils/journey/utills";
import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { useAuthContext } from "@providers/auth/AuthProvider";

export const useLocalJourney = (journeyId?: string) => {
  const { state } = useAuthContext();
  const [localJourney, setLocalJourney] = useState<Journey>(createNewJourney());

  useEffect(() => {
    const getJourney = async () => {
      const journeyDoc = await firestore()
        .collection("users")
        .doc(state.uid)
        .collection("journey")
        .doc(journeyId)
        .get();

      if (journeyDoc.data()) {
        setLocalJourney(journeyDoc.data() as Journey);
      }
    };

    getJourney();
  }, [state.uid, journeyId]);

  const setWeight = (val: number) => {
    setLocalJourney((p) => ({ ...p, currWeight: val }));
  };

  const onUploadMedia = (newFiles: (CloudinaryMedia | AWSMedia)[]) => {
    if (newFiles.length) {
      setLocalJourney((p) => ({ ...p, media: newFiles[0] }));
    }
  };

  const onDeleteMedia = () => {
    setLocalJourney((p) => ({ ...p, media: undefined }));
  };

  const setDisplayOn = (val: number) => {
    setLocalJourney((p) => ({ ...p, displayOn: val }));
  };

  const resetJourney = () => {
    setLocalJourney(createNewJourney());
  };

  return {
    onDeleteMedia,
    localJourney,
    onUploadMedia,
    setWeight,
    setDisplayOn,
    resetJourney,
  };
};
