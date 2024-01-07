import React from "react";
import {
  // freePlan,
  // INR_200Plan,
  // INR_500Plan,
  // INR_999Plan,
  // INR_99lan,
  PlanType,
} from "./plans";
import {
  aditiPoints,
  gautamPoints,
  khushiPoints,
  priyankaPoints,
  priyaPoints,
  rohanPoints,
  shaliniPoints,
  // swapnilPoints,
} from "./points";
import { step1Text, step2Text, step3Text, step4Text } from "./StepText";
import { gautamSEO, teamSEOType } from "./teamSEO";
import {
  aditiTitle,
  gautamTitle,
  khushiTitle,
  priyankaTitle,
  priyaTitle,
  rohanTitle,
  shaliniTitle,
  // swapnilTitle,
} from "./titles";

export type teamnames =
  | "teamgautam"
  // | "teamswapnil"
  | "teamaditi"
  | "teampriya"
  | "teamshalini"
  | "teamkhushi"
  | "teampriyanka"
  | "teamrohan";

export type stepType = { text?: React.ReactNode; image?: string };

export interface teamObj {
  teamname: teamnames;
  title: React.ReactNode;
  subtitle: string;
  teamId: string;
  leaderId: string;
  planData: PlanType;
  seo?: teamSEOType;
  points?: { icon: string; text: string }[];
  steps?: {
    step1?: stepType;
    step2?: stepType;
    step3?: stepType;
    step4?: stepType;
  };
}

const steps = {
  step1: {
    text: step1Text,
    image:
      "https://ik.imagekit.io/socialboat/tr:h-800,c-maintain_ratio,fo-auto/Group_1029_-aStprKMv.png?ik-sdk-version=javascript-1.4.3&updatedAt=1673251189546",
  },
  step2: { text: step2Text },
  step3: { text: step3Text },
  step4: { text: step4Text },
};

const teamgautam: teamObj = {
  teamname: "teamgautam",
  title: gautamTitle,
  subtitle: "23 days | 8000 steps a day challenge",
  teamId: "1d5523c2-339d-4472-97be-3a3133238155",
  leaderId: "KJhyTFmhPHhnK7wmo0SmqBQb8FS2",
  seo: gautamSEO,
  points: gautamPoints,
  planData: {
    companyCode: "teamgautam",
    plansTitle: `GAUTAM's FIT FEST Plans`,
    plans: [], //[INR_200Plan],
  },
  steps,
};

// const teamswapnil: teamObj = {
//   teamname: "teamswapnil",
//   title: swapnilTitle,
//   subtitle: "30 days | 8 Fitpoint's a day challenge",
//   teamId: "6462458d-b68a-4edb-a2a0-e1b05d043235",
//   leaderId: "wPKaomDuk4eoKHIIE7ArFPyynhU2",
//   planData: {
//     companyCode: "teamswapnil",
//     plansTitle: `Swapnil's IRON MAN challenge Plans`,
//     plans: [INR_500Plan],
//   },
//   points: swapnilPoints,
// };

const teamaditi: teamObj = {
  teamname: "teamaditi",
  title: aditiTitle,
  subtitle: "30 days | 12 Fitpoint's a day challenge",
  teamId: "6462458d-b68a-4edb-a2a0-e1b05d043236",
  leaderId: "40OqdGRJ0rQdUbSaZDyj9zm36uU2",
  planData: {
    companyCode: "teamaditi",
    plansTitle: `Aditi's fitness challenge Plans`,
    plans: [], //[freePlan],
  },
  points: aditiPoints,
  steps,
};

const teampriya: teamObj = {
  teamname: "teampriya",
  title: priyaTitle,
  subtitle: "30 days | 10 Fitpoint's a day challenge",
  teamId: "28842034-4775-44f3-935c-74e6908c50a6",
  leaderId: "H8IhRKQ4V0dQ3wsj2sNc8Ewu6XE3",
  planData: {
    companyCode: "teampriya",
    plansTitle: `Priya's fitness challenge Plans`,
    plans: [], //[INR_200Plan],
  },
  points: priyaPoints,
  steps,
};

const teamshalini: teamObj = {
  teamname: "teamshalini",
  title: shaliniTitle,
  subtitle: "30 days | 10 Fitpoint's a day challenge",
  teamId: "3e2e8dc6-bb7a-445c-bec5-90509fc1708a",
  leaderId: "Ng3E1hNiBGdlk4vkq6DFDgOcqn43",
  planData: {
    companyCode: "teamshalini",
    plansTitle: `Shalini's fitness challenge Plans`,
    plans: [], // [INR_200Plan],
  },
  points: shaliniPoints,
  steps,
};

const teamkhushi: teamObj = {
  teamname: "teamkhushi",
  title: khushiTitle,
  subtitle: "30 days | 8 Fitpoint's a day challenge",
  teamId: "43a97078-c6fa-435c-b52c-76bb925a16d7",
  leaderId: "CEaCmCWdqrUC52Effiw2ZsPHT4j2",
  planData: {
    companyCode: "teamkhushi",
    plansTitle: `Khushi se Yoga fitness challenge Plans`,
    plans: [], // [INR_999Plan],
  },
  points: khushiPoints,
  steps,
};

const teampriyanka: teamObj = {
  teamname: "teampriyanka",
  title: priyankaTitle,
  subtitle: "30 days | 10 Fitpoint's a day challenge",
  teamId: "fa9fa614-9d75-431d-9dbf-57f13afc1103",
  leaderId: "BqrxhxvQGuNTQMDUwPuFUCVmzIa2",
  planData: {
    companyCode: "teampriyanka",
    plansTitle: `Priyanka's new year fitness challenge Plans`,
    plans: [], // [freePlan],
  },
  points: priyankaPoints,
  steps,
};

const teamrohan: teamObj = {
  teamname: "teamrohan",
  title: rohanTitle,
  subtitle: "30 days | 5K Steps a day",
  teamId: "f6d6087d-5a1f-455f-b91e-aafbaf83ea7e",
  leaderId: "ggI5I8kP7NMdOd3zy5z21ytmYyo2",
  planData: {
    companyCode: "teamrohan",
    plansTitle: `Rohan's Ultra Running Challenge Plans`,
    plans: [], // [INR_99lan],
  },
  points: rohanPoints,
  steps,
};

export const teams: { [key in teamnames]: teamObj } = {
  teamgautam,
  // teamswapnil,
  teamaditi,
  teampriya,
  teamshalini,
  teamkhushi,
  teampriyanka,
  teamrohan,
};
