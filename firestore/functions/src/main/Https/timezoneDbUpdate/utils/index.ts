import * as admin from "firebase-admin";
import { UserInterface } from "../../../../models/User/User";

export const getAllUserUniqueTz = async () => {
  // there no direct way in firebase to qurey not empty string so using ">" qurey below

  const uniqueTzUsers = await admin
    .firestore()
    .collection("users")
    .where("recommendationConfig.timezone.tzString", ">", "")
    .get();
  const uniqueTimezones: { [key: string]: boolean } = {};

  // add the unique tz to objects

  if (uniqueTzUsers.docs.length) {
    console.log("unique users", uniqueTzUsers.docs.length);
    for (const users of uniqueTzUsers.docs) {
      const userData = users.data() as UserInterface;
      const userTimezone = userData.recommendationConfig?.timezone?.tzString;

      if (userTimezone) {
        uniqueTimezones[userTimezone] = true;
      }
    }
    const finalUniqueKeys = Object.keys(uniqueTimezones);
    console.log("finalUniqueKeys", finalUniqueKeys);
    return finalUniqueKeys;
  }
  return undefined;
};

export const updateTimezoneDb = async (timezones: string[]) => {
  const timezoneDbRef = admin.firestore().doc("/timezones/tzdb");

  // updating the db with timezones

  await timezoneDbRef.update({
    timezones: timezones,
  });

  console.log("updated in db");

  return;
};
