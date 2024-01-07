import { Activity } from "@models/Activities/Activity";
import {
  PaidDumpInterface,
  UserDumpInterface,
} from "@models/UserDumpInterface/interface";
import axios from "axios";
import { format } from "date-fns";

export interface LevelSummary {
  uid: string;
  name?: string;
  email?: string;
  phone?: string;
  totalFPoints?: number;
  activeFitPoints?: number;
  level: number;

  fetchedOnDate: string;
  fetchedOnTime: string;
}

// interface ActivityUserDump {
//   uid: string;
//   phone: string;
//   email: string;
//   games: string;
//   activityId: string;
//   postId: string;
//   startDate: string;
//   startTime: string;
//   startUNIX: number;

//   activityName?: string;
//   calories?: number;
//   fitPoints?: number;
//   name?: string;
//   source?: string;
// }

export interface TeamDump {
  memberUID: string;
  teamName: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  // phone: string;
  // email: string;
  teamId: string;
  teamCoach: string;

  fetchedOnDate: string;
  fetchedOnTime: string;
}

export interface ActivityUserTaskDump {
  uid: string;
  activityId: string;
  phone: string;
  name?: string;
  email: string;

  activityName?: string;
  calories?: number;
  fitPoints?: number;

  source?: string;
  link: string;

  games: string;
  startDate: string;
  startTime: string;
  startUNIX: number;
}

export interface UserActivity extends Activity {
  uid: string;
  name: string;
  email: string;
  phone: string;

  link: string;
}

const paidDumpToCSV = (data: PaidDumpInterface[]) => {
  const csvString = [
    ["uid", "freeTrialEndsOn", "paidPeriodEndsOn"],
    ...data.map((item) => [
      item.uid,
      item.freeTrialEndsOn,
      item.paidPeriodEndsOn,
    ]),
  ]
    .map((e) => e.join(","))
    .join("\n");

  //   console.log("csv", csvString);

  return csvString;
};

const progressDataToCSV = (data: ExportUserProgressData[]) => {
  const csvString = [
    ["uid", "phone", "name", "mood", "energy", "weight", "sleep", "date"],
    ...data.map((item) => [
      item.uid,
      item.phone,
      item.name.replaceAll(",", " "),
      item.mood ? item.mood : "",
      item.energy ? item.energy : "",
      item.weight ? item.weight : "",
      item.sleep ? item.sleep : "",
      item.date,
    ]),
  ]
    .map((e) => e.join(","))
    .join("\n");

  //   console.log("csv", csvString);

  return csvString;
};

const activityDataToCSV = (data: ExportUserActivityProgressData[]) => {
  const csvString = [
    ["uid", "phone", "name", "fp", "type", "activity name", "date"],
    ...data.map((item) => [
      item.uid,
      item.phone,
      item.name,
      item.fp ? item.fp : "",
      item.type ? item.type : "",
      item.activityName ? item.activityName.replaceAll(",", " ") : "",
      item.date,
    ]),
  ]
    .map((e) => e.join(","))
    .join("\n");

  //   console.log("csv", csvString);

  return csvString;
};

const levelDumpToCSV = (data: UserDumpInterface[]) => {
  const csvString = [
    [
      "uid",
      "phone",
      "email",
      "name",
      "signedUpTime",
      "signedInTime",
      "fpCredit",
      "fpDebit",
      "height",
      "weight",
      "gender",
      "level",
      "paceOfAchievementInMonth",
      "desiredWeight",
      "fitnessGoal",
      "fitnessConcerns",
      "repsCount",
      "difficulty",
      "hasTeam",
      "games",
      "dailyFPTarget",
      "dailyStepTarget",
      "dailyKCalTarget",
      "badgeId",
      "currentBodyType",
      "desiredBodyType",
    ],
    ...data.map((item) => [
      item.uid,
      item.phone,
      item.email,
      item.name,
      item.signedUpTime,
      item.signedInTime,
      item.fpCredit,
      item.fpDebit,
      item.height,
      item.weight,
      item.gender,
      item.level,
      item.paceOfAchievementInMonth,
      item.desiredWeight,
      item.fitnessGoal,
      item.fitnessConcerns,
      item.repsCount,
      item.difficulty,
      item.hasTeam,
      item.games,
      item.dailyFPTarget,
      item.dailyStepTarget,
      item.dailyKCalTarget,
      item.badgeId,
      item.currentBodyType,
      item.desiredBodyType,
    ]),
  ]
    .map((e) => e.join(","))
    .join("\n");

  //   console.log("csv", csvString);

  return csvString;
};

const levelSummaryToCSV = (data: LevelSummary[]) => {
  const csvString = [
    [
      "UID",
      "Name",
      "Email",
      "Phone",
      "TotalFPoints",
      "ActiveFPoints",
      "Level",
      "FetchedOnDate",
      "FetchedOnTime",
    ],
    ...data.map((item) => [
      item.uid,
      item.name,
      item.email,
      item.phone,
      item.totalFPoints,
      item.activeFitPoints,
      item.level,
      item.fetchedOnDate,
      item.fetchedOnTime,
    ]),
  ]
    .map((e) => e.join(","))
    .join("\n");

  //   console.log("csv", csvString);

  return csvString;
};

const teamDumpSummaryToCSV = (data: TeamDump[]) => {
  const csvString = [
    [
      "MemberUID",
      "TeamName",
      "UserName",
      "UserEmail",
      "UserPhone",
      // "Email",
      "TeamId",
      "TeamCoach",
      "FetchedOnDate",
      "FetchedOnTime",
    ],
    ...data.map((item) => [
      item.memberUID,
      item.teamName,
      item.userName,
      item.userEmail,
      item.userPhone,
      // item.phone,
      // item.email,
      item.teamId,
      item.teamCoach,
      item.fetchedOnDate,
      item.fetchedOnTime,
    ]),
  ]
    .map((e) => e.join(","))
    .join("\n");

  //   console.log("csv", csvString);

  return csvString;
};

const activityTaskDumpSummaryToCSV = (data: ActivityUserTaskDump[]) => {
  const csvString = [
    [
      "uid",
      "activityId",
      "phone",
      "name",
      "email",
      "activityName",
      "calories",
      "fitPoints",
      "source",
      "link",
      "games",
      "startDate",
      "startTime",
      "startUnix",
    ],
    ...data.map((item) => [
      item.uid,
      item.activityId,
      item.phone,
      item.name,
      item.email,
      item.activityName,
      item.calories,
      item.fitPoints,
      item.source,
      item.link,
      item.games,
      item.startDate,
      item.startTime,
      item.startUNIX,
    ]),
  ]
    .map((e) => e.join(","))
    .join("\n");

  //   console.log("csv", csvString);

  return csvString;
};

const userActivitySummaryToCSV = (data: UserActivity[]) => {
  const csvString = [
    [
      "uid",
      "activityId",
      "phone",
      "name",
      "email",
      "activityName",
      "calories",
      "fitPoints",
      "source",
      "link",
      "games",
      "taskId",
      "date",
      "createdOn",
    ],
    ...data.map((item) => [
      item.uid,
      item.id ? item.id : item.postId,
      item.phone,
      item.name,
      item.email,
      item.activityName,
      item.calories,
      item.fitPoints,
      item.source,
      item.link,
      item.games,
      item.taskId ? item.taskId : "",
      item.createdOn
        ? format(new Date(item.createdOn), "dd/MM/yyyy")
        : item.date,
      item.createdOn,
    ]),
  ]
    .map((e) => e.join(","))
    .join("\n");

  //   console.log("csv", csvString);

  return csvString;
};

const internalUserSummaryRequest = async () => {
  const response = await axios({
    url: "/api/download/userSummary",
    method: "GET",
  });

  const { data } = response.data as { data: LevelSummary[] };

  return data;
};

export interface ExportUserProgressData {
  uid: string;
  name: string;
  phone: string;
  mood?: number;
  energy?: number;
  weight?: number;
  sleep?: number;
  date: string; // yyyy-mm-dd
}

const internalAllUserProgress = async (start: number) => {
  const response = await axios({
    url: "/api/download/progress",
    method: "POST",
    data: { start },
    params: { start },
  });

  const { data } = response.data as {
    data: ExportUserProgressData[];
    numResults: number;
  };

  return data;
};

export interface ExportUserActivityProgressData {
  uid: string;
  name: string;
  phone: string;
  fp: number;
  type: "workout" | "steps" | "nutrition";
  activityName: string;
  date: string; // yyyy-mm-dd
}

const internalAllUserActivity = async (start: number) => {
  const response = await axios({
    url: "/api/download/activity",
    method: "POST",
    data: { start },
    params: { start },
  });

  const { data } = response.data as {
    data: ExportUserActivityProgressData[];
    numResults: number;
  };

  return data;
};

const internalUserDumpRequest = async (
  start: number,
  end: number,
  key: string
) => {
  const response = await axios({
    url: "/api/download/progress",
    method: "POST",
    data: { start },
    params: { start },
  });

  const { data } = response.data as {
    data: UserDumpInterface[];
    numResults: number;
  };

  return data;
};

const internalPaidUserDumpRequest = async () => {
  const response = await axios({
    url: "/api/download/paidDump",
    method: "POST",
  });

  const { data } = response.data as {
    data: PaidDumpInterface[];
    numResults: number;
  };

  return data;
};

const internalTeamDumpRequest = async (eventId: string) => {
  //   console.log("e", eventId);
  const response = await axios({
    url: "/api/download/teamDump",
    method: "POST",
    data: {
      eventId,
    },
  });

  const { data } = response.data as { data: TeamDump[] };

  return data;
};

const internalTaskDumpRequest = async (taskId: string) => {
  //   console.log("e", eventId);
  const response = await axios({
    url: "/api/download/activityTaskDump",
    method: "POST",
    data: {
      taskId,
    },
  });

  const { data } = response.data as { data: ActivityUserTaskDump[] };

  return data;
};

const internalUserActivityDump = async (
  uid: string,
  limit: number,
  date?: string
) => {
  let jsDate: number = 0;
  if (date) {
    jsDate = new Date(date).getTime();
    // console.log("js", jsDate, jsDate.getTime());
  }

  // throw new Error();

  const response = await axios({
    url: "/api/download/userActivityDump",
    method: "POST",
    data: {
      uid,
      limit,
      unix: jsDate,
    },
  });

  const { data } = response.data as { data: UserActivity[] };

  return data;
};

export const handleUserSummaryRequest = async () => {
  const levelSummary = await internalUserSummaryRequest();

  return levelSummaryToCSV(levelSummary);
};

export const handleExportDataRequest = async (
  start: number,
  end: number,
  key: string
) => {
  const levelDump = await internalUserDumpRequest(start, end, key);

  return levelDumpToCSV(levelDump);
};

export const handleProgressDataRequest = async (start: number) => {
  const levelDump = await internalAllUserProgress(start);

  return progressDataToCSV(levelDump);
};

export const handleProgressActivityRequest = async (start: number) => {
  const levelDump = await internalAllUserActivity(start);

  return activityDataToCSV(levelDump);
};

export const handleUserDumpRequest = async (
  start: number,
  end: number,
  key: string
) => {
  const levelDump = await internalUserDumpRequest(start, end, key);

  return levelDumpToCSV(levelDump);
};

export const handlePaidDump = async () => {
  const levelDump = await internalPaidUserDumpRequest();

  return paidDumpToCSV(levelDump);
};

export const handleTeamDumpRequest = async (id: string) => {
  const teamDump = await internalTeamDumpRequest(id);

  return teamDumpSummaryToCSV(teamDump);
};

export const handleActivityTaskDumpRequest = async (id: string) => {
  const teamDump = await internalTaskDumpRequest(id);

  return activityTaskDumpSummaryToCSV(teamDump);
};

export const handleUserActivityDownload = async (
  uid: string,
  limit: number,
  date?: string
) => {
  const teamDump = await internalUserActivityDump(uid, limit, date);

  return userActivitySummaryToCSV(teamDump);
};
