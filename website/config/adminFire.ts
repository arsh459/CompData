// const serviceAccount = require("./service_account_key.json");

const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT
    ? process.env.FIREBASE_SERVICE_ACCOUNT
    : "{}"
);
import * as admin from "firebase-admin";

// console.log("serviceAccount", serviceAccount);
// console.log("process.env.DATABASE_URL", process.env.DATABASE_URL);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.DATABASE_URL,
  });
}

export default admin;
