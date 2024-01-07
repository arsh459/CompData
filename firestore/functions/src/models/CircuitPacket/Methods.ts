// import {fetchOne} from '../../utils/firestore/fetchOne';
import {
  // CircuitPacket,
  InternalCircuitInterface,
} from "./CircuitPacket";

export const getCircuitPacket = async (
  circuitId: string,
): Promise<InternalCircuitInterface> => {
  // const circuitPacket = await fetchOne('circuitPackets', 'pack-' + circuitId);
  // console.log('circuitPacket', circuitPacket);
  // const result = await tPromise.decode(CircuitPacket, circuitPacket.data());
  // return result.listings
  // convert to required internal type
  const obj = {} as InternalCircuitInterface;
  return obj;
  //return result['listings'].reduce((acc, item) => {
  //    acc[item.listingId] = item
  //    return acc
  //}, obj);
};
