import * as admin from "firebase-admin";
import {
  ChatMessage,
  MessageResponse,
  Room,
} from "../../../../models/Room/Room";
import { getFormattedDateForUnix } from "../../../PubSub/activityTracker/utils";

export const getSakhiQuestionsMain = async () => {
  const remoteRoomDocs = await getAllRooms();

  console.log("number of rooms", remoteRoomDocs.length);

  const roomsCount: number = remoteRoomDocs.length;
  let userMessages: number = 0;
  const msgTexts: {
    content: string;
    user: string;
    roomId: string;
    createdOn: string;
    role: string;
  }[] = [];
  const userObjs: { [uid: string]: boolean } = {};
  const allMessages: ChatMessage[] = [];
  for (const remoteRoom of remoteRoomDocs) {
    const messageObjs = await getRoomMessages(remoteRoom.ref);

    const uid = remoteRoom.ref.path.split("/")[1];

    const roomObj = remoteRoom.data() as Room;

    userObjs[uid] = true;
    console.log(`#### ${roomObj.title} - ${uid} ####`);

    // let messageAdded: boolean = false;

    for (const messageObj of messageObjs) {
      // if (messageAdded) {
      // break;
      // }

      for (const resp of messageObj.messages) {
        allMessages.push(resp);

        // if (resp.role === "user") {
        if (resp.role === "user") {
          console.log(`${resp.role}: ${resp.content}`);

          msgTexts.push({
            content: resp.content,
            user: uid,
            roomId: roomObj.id,
            role: resp.role,
            createdOn: getFormattedDateForUnix(
              resp.createdOn,
              "hh:mma DD-MM-YYYY",
            ),
          });

          userMessages++;
          // messageAdded = true;
          // break;
        }

        // }
      }
    }

    console.log("");
    console.log("");
  }

  const ctUsers = Object.keys(userObjs).length;
  console.log("MSG EXCHANGES", msgTexts.length);
  console.log("userMessages EXCHANGES", userMessages);
  console.log("USER COUNT", ctUsers);

  return { roomsCount, userMessages, msgTexts };
};

const getAllRooms = async () => {
  const allRooms = await admin
    .firestore()
    .collectionGroup("rooms")
    // .limit(2)
    .get();

  const remoteRooms: admin.firestore.QueryDocumentSnapshot<admin.firestore.DocumentData>[] =
    [];
  for (const room of allRooms.docs) {
    // const roomDoc = room.data() as Room;

    remoteRooms.push(room);
  }

  return remoteRooms;
};

const getRoomMessages = async (
  ref: admin.firestore.DocumentReference<admin.firestore.DocumentData>,
) => {
  const remoteMessages = await ref
    .collection("messages")
    .orderBy("createdOn", "asc")
    .get();

  const messages: MessageResponse[] = [];
  for (const remoteMessage of remoteMessages.docs) {
    messages.push(remoteMessage.data() as MessageResponse);
  }

  return messages;
};
