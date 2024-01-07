export type FieldObjectType =
  | "text"
  | "date"
  | "quntity"
  | "options"
  | "dropdown";

interface TextInterface {
  type: "text";
  value?: string;
  onSave: (val?: string) => Promise<void>;
}

interface QuantityInterface {
  type: "quntity";
  value?: number;
  onSave: (val?: number) => Promise<void>;
  text?: string;
  step: number;
  minVal: number;
  maxVal: number;
}

interface DateInterface {
  type: "date";
  value?: number;
  onSave: (val?: number) => Promise<void>;
  time?: boolean;
}

interface OptionInterface {
  type: "options";
  value?: string[];
  onSave: (val?: string[], other?: string) => Promise<void>;
  options?: string[];
  showOther: boolean;
  other?: string;
}

interface DropdownInterface {
  type: "dropdown";
  value?: string;
  onSave: (val?: string) => Promise<void>;
  options?: string[];
}

export type FieldObject = {
  id: string; // this shoud be unique
  name: string;
  dependencyId?: string; // same as id of field which is depedent
  dependencyDependVal?: string | number; // value on which depedency depend
  hideIfDepedent?: boolean; // show or hide if depedent on other field
} & (
  | TextInterface
  // | FormattedTimeInterface
  | QuantityInterface
  | DateInterface
  | OptionInterface
  | DropdownInterface
);

export interface EditObject {
  heading: string;
  fieldsArr: FieldObject[];
}
