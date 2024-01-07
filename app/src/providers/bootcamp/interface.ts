import { userBootcampStatus } from "@hooks/bootcamp/useBootCamp";
import { Bootcamp } from "@models/BootCamp";

export type BootcampContextProps = {
  children: React.ReactNode;
};

export interface BootcampContextInterface {
  bootcamp?: Bootcamp;
  loading: boolean;
  bootcampStatus: userBootcampStatus;
  start: number;
  end: number;
}
