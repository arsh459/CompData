import { v4 as uuid } from "uuid";

export interface NutritionsDoc {
  id: string;
  date: string;
  uid: string;
  kcal: number;
  updatedOn: number;
  createdOn: number;
}

export const createNewDoc = (
  uid: string,
  kcal: number,
  date: string,
  createdOn: number,
  id?: string,
): NutritionsDoc => {
  return {
    uid,
    kcal,
    date,
    updatedOn: Date.now(),
    id: id ? id : uuid(),
    createdOn,
  };
};
