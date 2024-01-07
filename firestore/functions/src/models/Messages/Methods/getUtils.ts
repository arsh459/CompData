import * as admin from "firebase-admin";
import { Group, UserSnippet } from "../Message";

export const getUserGroups = async (uid: string) => {
  const groups = await admin
    .firestore()
    .collection("groups")
    .where("membersUid", "array-contains", uid)
    .get();

  const allGroups: Group[] = [];
  return groups.docs.reduce((acc, item) => {
    acc.push(item.data() as Group);
    return acc;
  }, allGroups);
};

export const getGroupById = async (id: string) => {
  const group = await admin.firestore().collection("groups").doc(id).get();

  if (group.exists) {
    return group.data() as Group;
  }

  return undefined;
};

export const getGhostUser = (members: { [uid: string]: UserSnippet }) => {
  for (const uid of Object.keys(members)) {
    if (uid.search("ghost") !== -1) {
      return members[uid];
    }
  }

  return undefined;
};

export const getAdminUser = (members: { [uid: string]: UserSnippet }) => {
  for (const member of Object.values(members)) {
    if (member.role === "admin") {
      return member;
    }
  }

  return undefined;
};
