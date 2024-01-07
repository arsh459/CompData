import DateComp from "./DateComp";
import DropdownComp from "./DropdownComp";
import OptionsComp from "./OptionsComp";
import QuantityComp from "./QuantityComp";
import TextComp from "./TextComp";
import { SingleFieldCompProps } from "../utils";

interface Props extends SingleFieldCompProps {
  color: string;
}

const FieldComp: React.FC<Props> = ({
  fieldObject,
  depedentFieldObject,
  color,
  setReRenderCount,
}) => {
  if (fieldObject.hideIfDepedent) return null;

  switch (fieldObject.type) {
    case "text":
      return (
        <TextComp
          fieldObject={fieldObject}
          depedentFieldObject={depedentFieldObject}
          setReRenderCount={setReRenderCount}
        />
      );
    case "date":
      return (
        <DateComp
          fieldObject={fieldObject}
          depedentFieldObject={depedentFieldObject}
          setReRenderCount={setReRenderCount}
        />
      );
    case "quntity":
      return (
        <QuantityComp
          fieldObject={fieldObject}
          depedentFieldObject={depedentFieldObject}
          setReRenderCount={setReRenderCount}
        />
      );
    case "options":
      return (
        <OptionsComp
          fieldObject={fieldObject}
          depedentFieldObject={depedentFieldObject}
          setReRenderCount={setReRenderCount}
          color={color}
        />
      );
    case "dropdown":
      return (
        <DropdownComp
          fieldObject={fieldObject}
          depedentFieldObject={depedentFieldObject}
          setReRenderCount={setReRenderCount}
        />
      );
    default:
      return null;
  }
};

export default FieldComp;
