import * as admin from "firebase-admin";

export const removeOrphanBadgeIds = async (
  badgeId: string,
  taskIds: string[],
) => {
  for (const taskId of taskIds) {
    await admin
      .firestore()
      .collection("tasks")
      .doc(taskId)
      .update({
        badgeIds: admin.firestore.FieldValue.arrayRemove(badgeId),
      });
  }
};
