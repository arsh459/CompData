import { EventInterface, SessionV2 } from "@models/Event/Event";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@config/firebase";
import { useRouter } from "next/router";
import { DrawerElement } from "@components/drawers/Drawer";
import { getNewDrawerForEvent } from "./utils";
import { dashboardQuery } from "@hooks/drawer/interface";
import { ListItem } from "@templates/listing/NumberedList/NumberedList";

export const useCurrentEvent = (setDrawerElements?: any) => {
  const [remoteEvent, setRemoteEvent] = useState<EventInterface>();
  const [name, setName] = useState<string>("");
  const [eventKey, setEventKey] = useState<string>("");
  const [courseGoal, setCourseGoal] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [joinURL, setJoinURL] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [googleTitle, setGoogleTitle] = useState<string>("");
  const [googleDescription, setGoogleDescription] = useState<string>("");
  const [googleSEOImg, setGoogleSEOImg] = useState<
    CloudinaryMedia | AWSMedia
  >();
  const [media, setMedia] = useState<(CloudinaryMedia | AWSMedia)[]>([]);
  const [thumnail, setThumbnail] = useState<CloudinaryMedia | AWSMedia>();
  const [whoIsItFor, setWhoIsItFor] = useState<ListItem[]>([]);
  const [faq, setFAQ] = useState<ListItem[]>([]);
  const [programDetails, setProgramDetails] = useState<ListItem[]>([]);
  const [program, setProgram] = useState<SessionV2[]>([]);
  const [eventDateTimeList, setEventDateTimeList] = useState<Date[] | null>([
    new Date(),
  ]);

  const router = useRouter();
  const q = router.query as dashboardQuery;

  useEffect(() => {
    if (router.isReady) {
      if (q.eventId) {
        const unsub = onSnapshot(doc(db, "sbEvents", q.eventId), (doc) => {
          const data = doc.data() as EventInterface | undefined;
          // console.log("data", data);
          // if event exists;
          if (data) {
            // setCurrentEvent(data);

            setRemoteEvent(data);
            setName(data.name);
            setDescription(data.description);
            setPrice(data.cost);
            setMedia(data.media);
            setThumbnail(data.thumbnail);
            setEventKey(data.eventKey ? data.eventKey : "");
            setJoinURL(data.joinURL);
            setGoogleDescription(
              data.googleDescription ? data.googleDescription : ""
            );
            setGoogleTitle(data.googleTitle ? data.googleTitle : "");
            setGoogleSEOImg(data.googleSEOImg);
            setWhoIsItFor(data.whoIsItFor ? data.whoIsItFor : []);
            setFAQ(data.faq ? data.faq : []);
            setCourseGoal(data.courseGoal ? data.courseGoal : "");
            setProgramDetails(data.programDetails ? data.programDetails : []);
            setProgram(data.program ? data.program : []);
            setEventDateTimeList(
              data.eventDateTimeList
                ? data.eventDateTimeList.map((item) => new Date(item))
                : []
            );

            if (setDrawerElements) {
              setDrawerElements((prev: DrawerElement[]) => {
                return [
                  prev[0],
                  prev[1],
                  {
                    ...prev[2],
                    subElements: getNewDrawerForEvent(data),
                  },
                ];
              });
            }
          }
        });

        return () => {
          if (unsub) {
            unsub();
          }
        };
      }
    }
  }, [router.isReady, q.eventId, setDrawerElements]);

  return {
    name,
    setName,
    description,
    setDescription,
    remoteEvent,
    price,
    setPrice,
    media,
    setMedia,
    joinURL,
    setJoinURL,
    eventDateTimeList,
    setEventDateTimeList,
    whoIsItFor,
    setWhoIsItFor,
    faq,
    setFAQ,
    courseGoal,
    setCourseGoal,
    programDetails,
    setProgramDetails,
    eventKey,
    setEventKey,
    googleTitle,
    googleDescription,
    setGoogleTitle,
    setGoogleDescription,
    googleSEOImg,
    setGoogleSEOImg,
    program,
    setProgram,
    thumnail,
    setThumbnail,
  };
};

/**
Create new
All events - Initially selected
  Current event -> Show status; Live page; Link;
    Name
    Description
    Cost
    Media
    Registrations
 */
