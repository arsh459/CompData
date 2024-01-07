import { getAllUserUniqueTz, updateTimezoneDb } from "./utils";

export const timezoneDbUpdateMain = async () => {
  // getting unique timezones from all users data where timezone if set

  const uniqueTz = await getAllUserUniqueTz();
  console.log("unique users", uniqueTz?.length);

  if (uniqueTz && uniqueTz.length) {
    // updating tz db

    await updateTimezoneDb(uniqueTz);
    return true;
  }

  return false;
};
