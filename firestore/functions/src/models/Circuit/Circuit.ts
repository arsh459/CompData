import * as t from "io-ts";

// type
export const Circuit = t.type({
  circuitId: t.string,
  circuitName: t.string,
  lat: t.number,
  lng: t.number,
  timezone: t.string,
  images: t.array(t.string),
});

export type CircuitType = t.Type<typeof Circuit>;

// interfaces
export interface CircuitInterface {
  circuitId: string;
  circuitName: string;
  lat: number;
  lng: number;
  timezone: string;
  images: string[];
}
