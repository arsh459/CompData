import { useEffect, useState } from "react";
import axios from "axios";
import firestore from "@react-native-firebase/firestore";
import crashlytics from "@react-native-firebase/crashlytics";

export interface Ice_Server {
  url: string;
  urls?: string;
  username?: string;
  credential?: string;
}

export interface TwilioRes {
  username: string;
  iceServers: Ice_Server[];
  dateUpdated: string;
  accountSid: string;
  ttl: string;
  dateCreated: string;
  password: string;
}

export interface STUNResponse {
  status: "success";
  response: TwilioRes;
}

export const useStun = () => {
  const [servers, setServers] = useState<Ice_Server[]>([]);

  useEffect(() => {
    const getSTUN = async () => {
      try {
        const now = Date.now() - 60 * 60 * 1000;

        const remoteStun = await firestore()
          .collection("turn")
          .where("expires", ">=", now)
          .get();

        if (remoteStun.docs.length) {
          const remDoc = remoteStun.docs[0].data() as TwilioRes;
          setServers(remDoc.iceServers);
        } else {
          const response = await axios({
            url: "https://asia-south1-holidaying-prod.cloudfunctions.net/turn",
            method: "POST",
          });

          if (response.data) {
            const res = response.data as STUNResponse;
            setServers(res.response.iceServers);
          } else {
            setServers([
              {
                url: "turn:socialboat.xyz:3478",
                username: "sbapp",
                credential: "sbapp1235",
              },
            ]);
          }
        }
      } catch (error: any) {
        setServers([
          {
            url: "turn:socialboat.xyz:3478",
            username: "sbapp",
            credential: "sbapp1235",
          },
        ]);
        crashlytics().recordError(error);
      }
    };

    getSTUN();
  }, []);

  return {
    servers,
  };
};
