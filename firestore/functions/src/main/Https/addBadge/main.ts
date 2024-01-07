import { difficulty } from "./addBadgeFunc";
import * as admin from "firebase-admin";
import { UserInterface } from "../../../models/User/User";
import { calculateKCalTarget } from "./calculateKCalTarget";

export const badgeAdderFunc = async (
  userObj: UserInterface,
  uid: string,
  pace: difficulty,
) => {
  if (uid && pace) {
    let badgeId: string = "b36f6018-73d0-46b2-b230-29020060ea70";
    let dailyFPTarget: number = 50;
    let dailyStepTarget: number = 3000;
    let dailyKcalTarget: number = 1900;

    if (userObj?.invitedPageId === "coachravinder") {
      badgeId = "70ba39ec-e870-4789-9063-47849f5c6fca";
    } else if (userObj.invitedPageId === "kirsten") {
      badgeId = "00c40004-26c0-4bf2-916a-144e25422394";
    }
    dailyKcalTarget = calculateKCalTarget(userObj);

    // if (
    //   userObj?.invitedPageId &&
    //   userObj.invitedPageId === "AIESEC Delhi University"
    // ) {
    //   badgeId = "397afe31-2663-43a9-bb86-3f9ab9e60499";
    //   dailyFPTarget = 20;
    // } else if (
    //   userObj?.invitedPageId &&
    //   userObj.invitedPageId === "PECFEST"
    // ) {
    //   badgeId = "9ef56ee6-bd64-4242-aeea-457494355e68";
    //   dailyFPTarget = 20;
    // } else
    if (userObj?.invitedPageId === "teamgautam") {
      dailyFPTarget = 8;
      badgeId = "b871132e-1def-480c-8b96-dbac27bab63e";
      dailyStepTarget = 4000;
    } else if (userObj.invitedPageId === "kirsten") {
      dailyFPTarget = 10;
      badgeId = "00c40004-26c0-4bf2-916a-144e25422394";
      dailyStepTarget = 4000;
    } else if (pace === "Easy") {
      // badgeId =   "47e708aa-5045-473d-9abd-456df478d17a";
      dailyFPTarget = 20;
    } else if (pace === "Medium") {
      // badgeId = "911d0f8a-feea-4e00-9635-55c9bc8a423b";
      dailyFPTarget = 30;
      dailyStepTarget = 5000;
    } else if (pace === "Not Easy") {
      // badgeId = "cf7add71-e2cf-4a1d-9378-2ba6c6188799";
      dailyFPTarget = 50;
      dailyStepTarget = 6000;
    } else if (pace === "Hard") {
      // badgeId = "85c13380-a744-4d9f-bb66-25ec7bcc9f46";
      dailyFPTarget = 70;
      dailyStepTarget = 7500;
    }

    await admin.firestore().collection("users").doc(uid).update({
      badgeId: badgeId,
      onboarded: true,
      dailyFPTarget,
      dailyStepTarget,
      dailyKcalTarget,
    });
  }
};
