import { AntStream } from "@models/AntStream/AntStream";

export type AntStreamContextProps = {
  children: React.ReactNode;
};

export interface AntStreamContextInterface {
  antStream?: AntStream;
}
