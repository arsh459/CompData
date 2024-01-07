import { CircuitInterface } from "./Circuit";
import { fetchOne } from "../../utils/firestore/fetchOne";

export const getCircuitById = async (circuitId: string) => {
  const circuitObj = await fetchOne("circuits", circuitId);
  return circuitObj.data() as CircuitInterface;
  // console.log("circuitObj", circuitObj);
  // const result = await tPromise.decode(Circuit, circuitObj.data());
  // return result
};
