import { TripObjInterface } from "../models/TripObj/Trip";
import { ListingInterface } from "../models/ListingObj/Listing";
import { getFeasibleTasks } from "./feasibility/feasible";
import { regulariseOutput } from "./utils";
import { addTotalScore } from "./scoring/totalScore";
import { RecommendationResponseInterface } from "./interface";
//import {fetchOne} from '../utils/firestore/fetchOne';

export const fetchRecommendations = (
  tripObj: TripObjInterface,
  allTasks: { [name: string]: ListingInterface },
  needCircuit: boolean,
): RecommendationResponseInterface => {
  // regularise trip
  // const regularTrip = regulariseTrip(tripObj, circuit);

  // console.log('regularTrip', regularTrip);

  // get recommendations array
  const recObj = getFeasibleTasks(allTasks, tripObj);

  // add score
  const recommendationsWithScore = addTotalScore(allTasks, recObj);

  // get response for formatted tasks
  const recommendationsResponse = regulariseOutput(
    recommendationsWithScore,
    needCircuit,
    allTasks,
  );

  return recommendationsResponse;
};
