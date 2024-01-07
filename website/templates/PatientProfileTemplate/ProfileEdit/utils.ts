import { Dispatch, SetStateAction } from "react";
import { FieldObject } from "./interface";

export interface SingleFieldCompProps {
  fieldObject: FieldObject;
  setReRenderCount: Dispatch<SetStateAction<number>>;
  depedentFieldObject?: FieldObject;
}

export const getOnSavePromise = (fieldObject: FieldObject) => {
  switch (fieldObject.type) {
    case "text":
      return fieldObject.onSave(fieldObject.value);
    case "date":
      return fieldObject.onSave(fieldObject.value);
    case "quntity":
      return fieldObject.onSave(fieldObject.value);
    case "options":
      return fieldObject.onSave(fieldObject.value, fieldObject.other);
    case "dropdown":
      return fieldObject.onSave(fieldObject.value);
  }
};
