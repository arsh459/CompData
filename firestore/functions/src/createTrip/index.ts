import * as functions from "firebase-functions";
import * as cors from "cors";

// import { InsertRequest, DeleteRequest } from "../modifyTrip/interface";
// import { getTripById } from "../models/TripObj/Methods";
// import { getCircuitPacket } from "../models/CircuitPacket/Methods";
// import { insertInTripInDb } from "../modifyTrip/insertInTrip";
// import { fetchRecommendations } from "../recommendations/recMain";
// import { deleteInTripInDb } from "../modifyTrip/deleteInTrip";
// import { FinalTrip } from "./interface";
// import { createNewTrip } from "./main";
// import { FetchRecsRequest } from "../fetchTripRecommendations/interface";

const corsHandler = cors({ origin: true });

export const insertInTripFunc = functions
  .region("asia-east2")
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      // const logging = new Logging();
      try {
        // const result = await tPromise.decode(InsertRequest, request.body);

        // // update trip
        // const tripObj = await getTripById(result.tripId);

        // // get all tasks
        // const allTasks = await getCircuitPacket(tripObj.circuitId);

        // const modifiedTrip = await insertInTripInDb(tripObj, result, allTasks);

        // const recommendationsResponse = fetchRecommendations(
        //   modifiedTrip,
        //   allTasks,
        //   false
        // );

        // return response.status(200).send(recommendationsResponse);
        return response.status(400).send({ error: `Invalid request` });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: `Invalid request` });
      }
    });
  });

export const deleteInTripFunc = functions
  .region("asia-east2")
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        // const result = await tPromise.decode(DeleteRequest, request.body);

        // // update trip
        // const tripObj = await getTripById(result.tripId);

        // // get all tasks
        // const allTasks = await getCircuitPacket(tripObj.circuitId);

        // const modifiedTrip = await deleteInTripInDb(tripObj, result);

        // const recommendationsResponse = fetchRecommendations(
        //   modifiedTrip,
        //   allTasks,
        //   false
        // );
        // return response.status(200).send(recommendationsResponse);

        return response.status(400).send({ error: `Invalid request` });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: `Invalid request` });
      }
    });
  });

export const createTripFunc = functions
  .region("asia-east2")
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        // const result = await tPromise.decode(FinalTrip, request.body);

        // const { tripObj } = await createNewTrip(result);

        // const allTasks = await getCircuitPacket(tripObj.circuitId);

        // const recommendationsResponse = fetchRecommendations(
        //   tripObj,
        //   allTasks,
        //   result.needCircuit
        // );

        // return response.status(200).send(recommendationsResponse);
        return response.status(400).send({ error: `Invalid request` });
      } catch (error) {
        console.info(error);
        return response.status(400).send({ error: `Invalid request` });
      }
    });
  });

export const fetchTripRecommendationsFunc = functions
  .region("asia-east2")
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        // const result = await tPromise.decode(FetchRecsRequest, request.body);

        // // update trip
        // const tripObj = await getTripById(result.tripId);

        // const allTasks = await getCircuitPacket(tripObj.circuitId);

        // const recommendationsResponse = fetchRecommendations(
        //   tripObj,
        //   allTasks,
        //   false
        // );

        // return response.status(200).send(recommendationsResponse);
        return response.status(400).send({ error: `Invalid request` });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: `Invalid request` });
      }
    });
  });
