import { db } from "@config/firebase";
import { uuidv4 } from "@firebase/util";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export interface ListItemContent {
  image?: AWSMedia | CloudinaryMedia;
  text?: string;
}

// form path -> sbEvents/gameId/sprintDetails/{sprintId}

export interface SprintDetail {
  id: string;
  sprintId: string;
  howToWin: ListItemContent[];
  mainImage?: AWSMedia | CloudinaryMedia;
  description: string;
}

export const useSprint = (gameId: string, id: string) => {
  const [sprintDetail, setSprintDetail] = useState<SprintDetail>();

  useEffect(() => {
    const getSprintDetail = async () => {
      console.log({ gameId, id });
      if (gameId && id) {
        const document = await getDoc(
          doc(doc(db, "sbEvents", gameId), "sprintDetails", id)
        );
        const data = document.data();
        if (data) {
          console.log("if");
          const sd = data as SprintDetail;
          setSprintDetail(sd);
        } else {
          console.log("else");

          setSprintDetail({
            id: uuidv4(),
            howToWin: [],
            sprintId: "",
            description: "",
          });
        }
      }
      // setSprintDetail({
      //   id: uuidv4(),
      //   howToWin: [],
      //   sprintId: "",
      //   description: "",
      // });
    };
    getSprintDetail();
  }, [gameId, id]);

  return {
    sprintDetail,
    setSprintDetail,
  };
};

export default useSprint;
