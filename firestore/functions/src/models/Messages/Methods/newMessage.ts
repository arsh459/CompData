import { message, UserSnippet, Group } from "../Message";
import { firestore } from "firebase-admin";
import { getUserById } from "../../User/Methods";
// import { UserInterface } from "../../User/User";
import { createNotification } from "../../Notifications/createNotification";
import { sendNotificationToUserTokens } from "../../Notifications/Methods";

const Holidaying = {
  // uid: "f7ELDBRL2jaXDZnmfU6QRcZWycd2",
  imageURL:
    "https://firebasestorage.googleapis.com/v0/b/holidaying-prod.appspot.com/o/users%2Fbc30415b-7c23-47df-b7ff-b16340324576-?alt=media&token=557fb3f3-2440-4341-8445-4ba3169c8bad",
  // unread: 0,
  name: "Holidaying",
  // role: "admin",
};

export const handleMessage = async (groupId: string, newMessage: message) => {
  const group = await getGroupData(groupId);

  if (group) {
    // make batch
    const batch = firestore().batch();
    const members = group.members;

    for (const member of Object.values(members)) {
      if (member.uid === newMessage.uid || member.uid.search("ghost") !== -1) {
        continue;
      }

      // const user: UserInterface = await getUserById(member.uid);
      // const isOnline = await checkOnLine(groupId, user);
      if (!member.isOnline) {
        // increase unread messages
        // member.unread += 1;

        const user = await getUserById(member.uid);

        // send notification if enabled
        if (user && user.tokens) {
          await sendMessageNotification(
            user.tokens,
            group,
            newMessage.text,
            newMessage.uid,
          );
        }
      }

      // unread messages
      batch.update(firestore().collection("users").doc(member.uid), {
        unreadMessages: true,
      });
    }

    // batch.update(firestore().collection("groups").doc(group.groupId), {
    //   members: members,
    // });

    await batch.commit();
  }
};

const sendMessageNotification = async (
  userTokens: string[],
  group: Group,
  newMessageText: string,
  newMssgUid: string,
) => {
  // get image & name
  const { groupImage, groupName } = getImageAndName(
    Object.values(group.members),
    newMssgUid,
  );

  const notification = createNotification(
    groupName,
    newMessageText,
    "message",
    group.groupId,
    "message",
    undefined,
    groupImage,
  );

  await sendNotificationToUserTokens(userTokens, notification);
};

const getGroupData = async (groupId: string) => {
  const groupRef = await firestore().collection("groups").doc(groupId).get();

  if (groupRef.exists) {
    return groupRef.data() as Group;
  }

  return undefined;
};

// const checkOnLine = async (groupId: string, user: UserInterface) => {
//   if (user.activeGroups && user.activeGroups[groupId]) {
//     return true;
//   }

//   return false;
// };

const getImageAndName = (members: UserSnippet[], newMssgUid: string) => {
  let groupImage;
  let groupName;

  members.forEach((mem) => {
    if (mem.uid === newMssgUid) {
      groupImage = mem.imageURL;
      groupName = mem.name;
    }
  });

  if (groupName === undefined) {
    groupName = "Holidaying User";
  }

  if (groupImage === undefined) {
    groupImage = Holidaying.imageURL;
  }

  return { groupImage, groupName };
};
