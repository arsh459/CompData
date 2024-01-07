import {
  ContactMBInterface,
  messageBirdImage,
} from "../../../main/Https/messagebird/interface";
import * as admin from "firebase-admin";
import { LeaderBoard } from "../../LeaderBoard/interface";
import { Group, message, UserSnippet } from "../Message";
import { v4 as uuid } from "uuid";
import { getName_MB } from "../../../main/Https/messagebird/newMessage/templates/newMessage";
import { UserInterface } from "../../User/User";

export const createNewGroup_Ghost = async (
  contact: ContactMBInterface,
  messageToSend: string,
  autoReply: string,
  createdTime: number,
  image?: messageBirdImage,
  file?: messageBirdImage,
) => {
  const adminUser = await getAdminLeader();

  if (adminUser) {
    const ghostMessage = createGhostMessage(
      messageToSend,
      contact,
      createdTime,
      image,
      file,
    );
    const autoMessage = createNewMessage(
      adminUser.uid,
      autoReply,
      createdTime + 10,
    );

    const batch = admin.firestore().batch();

    const newGroupId = uuid();
    const group: Group = {
      groupId: newGroupId,
      createdBy: adminUser.uid,
      createdAt: createdTime,
      updatedAt: createdTime,
      ghostLastUpdate: autoMessage.createdAt,
      members: {
        [adminUser.uid]: getAdminMember(adminUser),
        [ghostMessage.uid]: getGhostMember(contact),
      },
      membersUid: [ghostMessage.uid, adminUser.uid],
      lastMessage: {
        text: autoMessage.text,
        sendBy: autoMessage.uid,
        sendAt: autoMessage.createdAt,
      },
      ghostCustomer: true,
    };

    // group
    batch.set(admin.firestore().collection("groups").doc(newGroupId), group);

    // batch.message 1
    batch.set(
      admin
        .firestore()
        .collection("groups")
        .doc(newGroupId)
        .collection("messages")
        .doc(ghostMessage.uid),
      ghostMessage,
    );

    // batch.message 2
    batch.set(
      admin
        .firestore()
        .collection("groups")
        .doc(newGroupId)
        .collection("messages")
        .doc(autoMessage.uid),
      autoMessage,
    );

    await batch.commit();

    // const groupRef = admin.firestore().collection("groups").doc();

    //creating a new group
    // await groupRef.set(group);

    // await admin
    //   .firestore()
    //   .collection("groups")
    //   .doc(group.groupId)
    //   .collection("messages")
    //   .doc(ghostMessage.messageId)
    //   .set(ghostMessage);

    // await admin.firestore().collection('groups').doc(group.groupId).collection()

    return group.groupId;
  }

  return undefined;
};

const getAdminLeader = async () => {
  const adminUser = await admin
    .firestore()
    .collection("leaderBoard")
    .where("adminUser", "==", true)
    .get();

  if (adminUser.docs.length > 0 && adminUser.docs[0].exists) {
    return adminUser.docs[0].data() as LeaderBoard;
  }

  return undefined;
};

const getGhostMember = (ghost: ContactMBInterface): UserSnippet => {
  return {
    uid: `ghost-${ghost.id}`,
    name: getName_MB(ghost),
    role: "member",
    isOnline: false,
    unread: 0,
    phone: `${ghost.msisdn}`,
  };
};

const getAdminMember = (adminUser: LeaderBoard): UserSnippet => {
  return {
    uid: adminUser.uid,
    name: adminUser.name ? adminUser.name : "Holidaying",
    role: "admin",
    isOnline: false,
    unread: 0,
    imageURL: adminUser.imageURI ? adminUser.imageURI : "",
  };
};

const createUserSnippet = (user: UserInterface): UserSnippet => {
  return {
    uid: user.uid,
    name: user.name ? user.name : "Holidaying influencer",
    role: "member",
    isOnline: false,
    unread: 0,
    phone: user.phone ? user.phone : "",
    email: user.email ? user.email : "",
    imageURL: user.imageURI ? user.imageURI : "",
  };
};

const createGhostMessage = (
  messageMBText: string,
  contact: ContactMBInterface,
  createdTime: number,
  image?: messageBirdImage,
  file?: messageBirdImage,
): message => {
  const newId = uuid();
  return {
    messageId: newId,
    text: messageMBText ? messageMBText : "",
    ...(image ? { image: image } : {}),
    ...(file ? { file: file } : {}),
    createdAt: createdTime,
    uid: `ghost-${contact.id}`,
    system: false,
  };
};

const createNewMessage = (
  uid: string,
  text: string,
  time: number,
  sentToGhost?: boolean,
): message => {
  const newId = uuid();
  return {
    messageId: newId,
    text: text,
    createdAt: time,
    system: false,
    uid: uid,
    ...(sentToGhost ? { sentToGhost: true } : false),
  };
};

export const pushNewGhostMessage = async (
  messageMBText: string,
  contact: ContactMBInterface,
  groupId: string,
  messageTime: number,
  image?: messageBirdImage,
  file?: messageBirdImage,
) => {
  const ghostMessage = createGhostMessage(
    messageMBText,
    contact,
    messageTime,
    image,
    file,
  );

  const batch = admin.firestore().batch();

  batch.set(
    admin
      .firestore()
      .collection("groups")
      .doc(groupId)
      .collection("messages")
      .doc(ghostMessage.messageId),
    ghostMessage,
  );

  batch.update(admin.firestore().collection("groups").doc(groupId), {
    lastMessage: {
      text: ghostMessage.text,
      sendBy: ghostMessage.uid,
      sendAt: ghostMessage.createdAt,
    },
    ghostLastUpdate: ghostMessage.createdAt,
    updatedAt: ghostMessage.createdAt,
  });

  await batch.commit();
};

export const removeUserFromGroup = async (
  group: Group,
  user: UserInterface,
  messageTime: number,
) => {
  const batch = admin.firestore().batch();

  const newMessage = createNewMessage(
    user.uid,
    `${user.name ? user.name : "An influencer"} has been removed from group`,
    messageTime,
  );

  batch.set(
    admin
      .firestore()
      .collection("groups")
      .doc(group.groupId)
      .collection("messages")
      .doc(newMessage.messageId),
    newMessage,
  );

  batch.update(admin.firestore().collection("groups").doc(group.groupId), {
    [`members.${user.uid}`]: admin.firestore.FieldValue.delete(),
    membersUid: admin.firestore.FieldValue.arrayRemove(user.uid),
  });

  await batch.commit();
};

export const addUserToGroup = async (
  group: Group,
  user: UserInterface,
  messageTime: number,
) => {
  const batch = admin.firestore().batch();

  const newMessage = createNewMessage(
    user.uid,
    `${user.name ? user.name : "An influencer"} has been added`,
    messageTime,
  );

  batch.set(
    admin
      .firestore()
      .collection("groups")
      .doc(group.groupId)
      .collection("messages")
      .doc(newMessage.messageId),
    newMessage,
  );

  batch.update(admin.firestore().collection("groups").doc(group.groupId), {
    [`members.${user.uid}`]: createUserSnippet(user),
    membersUid: admin.firestore.FieldValue.arrayUnion(user.uid),
  });

  await batch.commit();
};

export const pushMessageToGroup = async (
  groupId: string,
  messageToSend: string,
  user: UserSnippet,
  messageTime: number,
  sentToGhost?: boolean,
) => {
  const batch = admin.firestore().batch();

  const newMessage = createNewMessage(
    user.uid,
    messageToSend,
    messageTime,
    sentToGhost,
  );

  batch.set(
    admin
      .firestore()
      .collection("groups")
      .doc(groupId)
      .collection("messages")
      .doc(newMessage.messageId),
    newMessage,
  );

  batch.update(admin.firestore().collection("groups").doc(groupId), {
    lastMessage: {
      text: newMessage.text,
      sendBy: newMessage.uid,
      sendAt: newMessage.createdAt,
    },
    updatedAt: newMessage.createdAt,
  });

  await batch.commit();
};
