import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

declare global {
  // eslint-disable-next-line no-var
  var FIREBASE_APPCHECK_DEBUG_TOKEN: boolean | string | undefined;
}

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = JSON.parse(
  process.env.NEXT_PUBLIC_FIREBASE_CONFIG
    ? process.env.NEXT_PUBLIC_FIREBASE_CONFIG
    : "{}"
);
// console.log("firebaseConfig", firebaseConfig);

// console.log("getApps", getApps());

// if (getApps().length === 0) {
//   console.log("initialising");
//   initializeApp(firebaseConfig);
//   // Check that `window` is in scope for the analytics module!
//   // if (typeof window !== 'undefined') {
//   //     // Enable analytics. https://firebase.google.com/docs/analytics/get-started
//   // if ('measurementId' in clientCredentials) {
//   // firebase.analytics();
//   //       firebase.performance()
//   // }
//   // }
// } else {
//   getApp()
// }

const firebase =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export default firebase;

import { getFirestore } from "firebase/firestore";
export const db = getFirestore(firebase);

import { getAuth } from "firebase/auth";
export const auth = getAuth(firebase);

import { Analytics, getAnalytics } from "firebase/analytics";
let analytics: Analytics | undefined = undefined;
if (typeof window !== "undefined") {
  analytics = getAnalytics(firebase);

  if (process.env.NODE_ENV === "development") {
    self.FIREBASE_APPCHECK_DEBUG_TOKEN = process.env.DEBUG_APPCHECK_TOKEN;
  }

  initializeAppCheck(firebase, {
    provider: new ReCaptchaV3Provider(
      process.env.NEXT_PUBLIC_RECAPCHA_KEY
        ? process.env.NEXT_PUBLIC_RECAPCHA_KEY
        : ""
    ),

    // Optional argument. If true, the SDK automatically refreshes App Check
    // tokens as needed.
    isTokenAutoRefreshEnabled: true,
  });
}

export { analytics };

// import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

// export const appCheck =
//   getApps().length === 0 && typeof window === "object"
//     ? initializeAppCheck(firebase, {
//         provider: new ReCaptchaV3Provider(
//           "6LddiVcdAAAAAJ-_B35sPAPvvKfjLvCMxRH6Ikpm"
//         ),

//         // Optional argument. If true, the SDK automatically refreshes App Check
//         // tokens as needed.
//         // isTokenAutoRefreshEnabled: true,
//       })
//     : null;
