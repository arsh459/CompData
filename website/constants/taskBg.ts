// export const beginnerBg = "https://firebasestorage.googleapis.com/v0/b/vocal-pad-262908.appspot.com/o/icons%2FCompressedBg%2FbeginnerBg.jpeg?alt=media&token=ce2f8f68-dab7-4ed5-bd2e-3dc388560576";
// export const cyclingBg = "https://firebasestorage.googleapis.com/v0/b/vocal-pad-262908.appspot.com/o/icons%2FCompressedBg%2FcyclingBg.jpeg?alt=media&token=653769b3-191b-4d90-b737-aefd327a96fc";
// export const calesthenicsBg ="https://firebasestorage.googleapis.com/v0/b/vocal-pad-262908.appspot.com/o/icons%2FCompressedBg%2FcalethenicsBg.jpeg?alt=media&token=0d30a9af-bc50-46cc-863f-bd8b32eff7ac";
// export const yogaBg = "https://firebasestorage.googleapis.com/v0/b/vocal-pad-262908.appspot.com/o/icons%2FCompressedBg%2FyogaBg.jpeg?alt=media&token=26b1ca41-1781-4314-a6c1-e860b7f9fe2b";
// export const strengthBg = "https://firebasestorage.googleapis.com/v0/b/vocal-pad-262908.appspot.com/o/icons%2FCompressedBg%2FstrengthBg.jpeg?alt=media&token=59c593a0-595f-4e95-b2ca-d0272a73268b";
// export const runningBg = "https://firebasestorage.googleapis.com/v0/b/vocal-pad-262908.appspot.com/o/icons%2FCompressedBg%2FrunningBg.jpeg?alt=media&token=62b56b9c-9647-4101-980b-c306151b01bb";

import { labelType } from "@models/Tasks/Task";

export const headerBgList: { [task in labelType]: string } = {
  strength:
    "sq_strength_BAOWrKvpP.png?ik-sdk-version=javascript-1.4.3&updatedAt=1651302594311",
  endurance:
    "sq_endurance_CpJIxugLm.png?ik-sdk-version=javascript-1.4.3&updatedAt=1651302594163",
  agility:
    "sq_agility_r29AgeJTfQ.png?ik-sdk-version=javascript-1.4.3&updatedAt=1651302594128",
  cardio:
    "sq_cardio_zUcDfdHXa.png?ik-sdk-version=javascript-1.4.3&updatedAt=1651302025072",
  beginner:
    "3__1__6ywuNww3v.png?ik-sdk-version=javascript-1.4.3&updatedAt=1654366739411",
  intermediate:
    "2_Cfko5oPPw.png?ik-sdk-version=javascript-1.4.3&updatedAt=1654366739674",
  advanced:
    "1_FgVPknKCXr.png?ik-sdk-version=javascript-1.4.3&updatedAt=1654366739945",
  master:
    "5__1__4xlRxnGr3.png?ik-sdk-version=javascript-1.4.3&updatedAt=1654366739438",
  finale:
    "Group_350__1__dzWLolJd_.png?ik-sdk-version=javascript-1.4.3&updatedAt=1655556768343",
};

export const linersAboutTasks: { [task in labelType]: string } = {
  strength:
    "These tasks will test how strong you are. Your ability to lift, push and pull.",
  endurance:
    "These tasks will test how long can you push. Your stamina to keep going when the journey get's hard",
  agility:
    "These tasks will test how nimble and quick you are. Your ability to do quick moves",
  cardio:
    "These tasks test your cardio vascular strength. How strong are your lungs and heart",
  beginner: "These tasks are simple tasks. Meant for users starting up",
  intermediate:
    "These tasks are meant for a user who has been working out from 3 months",
  advanced: "These tasks are for people who consider them athletes",
  master: "These tasks are hard. If you can do them, you are a natural athlete",
  finale:
    "This is the grand finale for champions. All the rewards are up for contention in this round",
};
