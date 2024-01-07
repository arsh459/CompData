import * as functions from "firebase-functions";
import * as cors from "cors";
import { getPaidUsers } from "./paidUsers";
import { getUserProgressValue } from "./getProgress";
import { format } from "date-fns";

const corsHandler = cors({ origin: true });

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

export const exportFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 120 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        // console.log("request");
        const { start } = request.body as {
          start?: number;
        };

        // get paid users
        const { paidUsers } = await getPaidUsers();

        const finalData: ExportUserProgressData[] = [];
        // for each user fetch data

        let i: number = 0;
        for (const paidUser of paidUsers) {
          const { moods, energy, sleep, weight } = await getUserProgressValue(
            paidUser.uid,
            start ? start : Date.now(),
            Date.now(),
          );

          console.log(
            i,
            paidUser.name,
            moods.length,
            energy.length,
            sleep.length,
            weight.length,
          );
          i++;

          for (const mood of moods) {
            finalData.push({
              uid: paidUser.uid,
              name: paidUser.name ? paidUser.name : "na",
              phone: paidUser.phone ? paidUser.phone : "na",
              mood: mood.mood ? mood.mood : -1,
              date: format(new Date(mood.unix), "yyyy-MM-dd"),
            });
          }

          for (const e of energy) {
            finalData.push({
              uid: paidUser.uid,
              name: paidUser.name ? paidUser.name : "na",
              phone: paidUser.phone ? paidUser.phone : "na",
              energy: e.energy ? e.energy : -1,
              date: format(new Date(e.unix), "yyyy-MM-dd"),
            });
          }

          for (const s of sleep) {
            finalData.push({
              uid: paidUser.uid,
              name: paidUser.name ? paidUser.name : "na",
              phone: paidUser.phone ? paidUser.phone : "na",
              sleep: s.sleepHours ? s.sleepHours : -1,
              date: format(new Date(s.unix), "yyyy-MM-dd"),
            });
          }

          for (const w of weight) {
            finalData.push({
              uid: paidUser.uid,
              name: paidUser.name ? paidUser.name : "na",
              phone: paidUser.phone ? paidUser.phone : "na",
              weight: w.weight ? w.weight : -1,
              date: format(new Date(w.unix), "yyyy-MM-dd"),
            });
          }

          if (weight.length === 0) {
            finalData.push({
              uid: paidUser.uid,
              name: paidUser.name ? paidUser.name : "na",
              phone: paidUser.phone ? paidUser.phone : "na",
              weight: paidUser.weight ? paidUser.weight : -1,
              date: paidUser.authSignupTime
                ? format(new Date(paidUser.authSignupTime), "yyyy-MM-dd")
                : "-",
            });
          }
        }

        return response
          .status(200)
          .send({ status: "success", numEntries: i, data: finalData });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
