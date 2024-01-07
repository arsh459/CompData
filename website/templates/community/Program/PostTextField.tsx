import { TextField } from "@mui/material";

interface Props {
  text: string | undefined;
  placeholder?: string;
  onChangeText: (newVal: string) => void;
  multiline: boolean;
  label: string;
}

// const useStyles = makeStyles({
//   underline: {
//     "&&&:before": {
//       borderBottom: "none",
//     },
//     "&&:after": {
//       borderBottom: "none",
//     },
//   },
// });

const PostTextField: React.FC<Props> = ({
  text,
  onChangeText,
  multiline,
  placeholder,
  label,
  //   name,
}) => {
  // const classes = useStyles();
  // console.log("name", name);
  return (
    <div className="flex">
      <div className="w-full">
        <TextField
          //   InputProps={{ classes }}
          inputProps={{ style: { fontSize: 12 } }} // font size of input text
          id="standard-basic"
          variant="outlined"
          multiline={multiline}
          minRows={multiline ? 4 : 1}
          maxRows={5}
          style={{ width: "100%" }}
          label={label}
          placeholder={placeholder ? placeholder : "What's happening?"}
          value={text}
          onChange={(newVal) => onChangeText(newVal.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
    </div>
  );
};

export default PostTextField;
