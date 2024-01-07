// import { PathReporter } from 'io-ts/lib/PathReporter';
import * as t from "io-ts";
import { fold } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/pipeable";

export const incomingValidationPromise = (reqType: t.Type<any>, req: any) => {
  // return tPromise.decode(reqType, req);
};

export const incomingValidation = (reqType: t.Type<any>, req: any) => {
  const result = reqType.decode(req);
  return pipe(result, fold(onLeft, onRight));
};

// failure handler
const onLeft = (errors: t.Errors): boolean => false;

// success handler
const onRight = (): boolean => true;
