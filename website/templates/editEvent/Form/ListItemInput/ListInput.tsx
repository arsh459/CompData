import { TextField } from "@mui/material";
import { ListItem } from "@templates/listing/NumberedList/NumberedList";
// import clsx from "clsx";

interface Props {
  item: ListItem;
  selectedIndex: number;
  onChange: any;
  helperTextHeading: string;
  labelHeading: string;
  placeholderHeading: string;
  helperText: string;
  label: string;
  placeholder: string;
  //   setSelectedItem: (newItem: ListItem) => void;
}

const ListInput: React.FC<Props> = ({
  item,
  selectedIndex,
  onChange,
  helperText,
  label,
  labelHeading,
  placeholder,
  placeholderHeading,
  helperTextHeading,
}) => {
  return (
    <div className="">
      <div>
        <TextField
          style={{ width: "100%" }}
          helperText={helperTextHeading}
          placeholder={placeholderHeading}
          label={labelHeading}
          variant="outlined"
          onChange={
            (newVal) =>
              onChange((prev: ListItem[]) => [
                ...prev.slice(0, selectedIndex),
                { ...prev[selectedIndex], heading: newVal.target.value },
                ...prev.slice(selectedIndex + 1, prev.length),
              ])
            // setSelectedItem({ ...item, heading: newVal.target.value })
          }
          value={item.heading}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div className="pt-4">
        <TextField
          multiline={true}
          style={{ width: "100%" }}
          rows={4}
          helperText={helperText}
          placeholder={placeholder}
          label={label}
          variant="outlined"
          value={item.text}
          onChange={
            (newVal) =>
              onChange((prev: ListItem[]) => [
                ...prev.slice(0, selectedIndex),
                { ...prev[selectedIndex], text: newVal.target.value },
                ...prev.slice(selectedIndex + 1, prev.length),
              ])
            // setSelectedItem({ ...item, heading: newVal.target.value })
          }
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
    </div>
  );
};

export default ListInput;
