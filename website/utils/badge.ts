import { TEAM_ALPHABET_GAME } from "@constants/gameStats";
import { Badge, CourseReview } from "@models/Prizes/PrizeV2";
import { Task } from "@models/Tasks/Task";
import { UserInterface } from "@models/User/User";
import { FAQDATA } from "@templates/joinBoatTemplate/utils";

export const getCourseData = async (slug: string) => {
  const firebase = (await import("@config/adminFire")).default;
  const db = firebase.firestore();

  const remoteDocs = await db
    .collection("sbEvents")
    .doc(TEAM_ALPHABET_GAME)
    .collection("badges")
    .where("slug", "==", slug)
    .get();

  if (remoteDocs.docs.length) {
    const badge = remoteDocs.docs[0].data() as Badge;

    const otherAuthorPromises = [];
    if (badge.creatorIds)
      for (const uid of badge.creatorIds) {
        otherAuthorPromises.push(db.collection("users").doc(uid).get());
      }

    const allUsers = await Promise.all(otherAuthorPromises);
    const otherAuthors: UserInterface[] = [];
    let primaryCoach: UserInterface | undefined = undefined;
    for (const user of allUsers) {
      if (user.data()) {
        const author = user.data() as UserInterface;
        otherAuthors.push(author);

        if (author.uid === badge.primaryCoach) {
          primaryCoach = author;
        }
      }
    }

    const keyStr = `${badge.id}_0`;

    const dayZeroTasksT = await db
      .collection("tasks")
      .where("landingPage", "==", true)
      // .where("badgeIds", "array-contains", badge.id)
      .where("badgeDays", "array-contains", `${badge.id}_0`)
      .get();

    const dayZeroTasks: Task[] = [];
    for (const rev of dayZeroTasksT.docs) {
      const tk = rev.data() as Task;
      dayZeroTasks.push(tk);
    }

    // console.log("keyStr", keyStr);

    const sorted = dayZeroTasks.sort((a, b) =>
      a.badgeDayPriority && b.badgeDayPriority
        ? a.badgeDayPriority[keyStr] - b.badgeDayPriority[keyStr]
        : 0
    );

    const badgeReviewsR = await db
      .collection("sbEvents")
      .doc(TEAM_ALPHABET_GAME)
      .collection("badges")
      .doc(badge.id)
      .collection("reviews")
      .get();

    const badgeReview: CourseReview[] = [];
    for (const rev of badgeReviewsR.docs) {
      badgeReview.push(rev.data() as CourseReview);
    }
    const badgeFAQsR = await db
      .collection("sbEvents")
      .doc(TEAM_ALPHABET_GAME)
      .collection("badges")
      .doc(badge.id)
      .collection("faq")
      .get();

    const courseFAQ: FAQDATA[] = [];
    for (const faqR of badgeFAQsR.docs) {
      courseFAQ.push(faqR.data() as FAQDATA);
    }

    return {
      badge,
      otherAuthors,
      primaryCoach,
      badgeReview,
      courseFAQ,
      dayZeroTasks: sorted,
    };
  }

  // console.log("tes", testimonials.length);

  return {};
};
