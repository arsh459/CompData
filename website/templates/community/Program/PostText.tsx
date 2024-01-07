import { profileClick } from "@analytics/click/wrappers";
import { TextField } from "@mui/material";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import UserPhoto from "./Feed/PostView/UserPhoto";

interface Props {
  text: string;
  placeholder?: string;
  onChangeText: (newVal: string) => void;
  img?: CloudinaryMedia | AWSMedia;
  name?: string;
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

const PostText: React.FC<Props> = ({
  text,
  onChangeText,
  img,
  placeholder,
  name,
}) => {
  // const classes = useStyles;
  // console.log("name", name);
  return (
    <div className="flex">
      <div className="flex-none pr-2">
        <UserPhoto
          name={name}
          onImgClick={() => {
            profileClick();
          }}
          nameInvisible={true}
          img={img}
          size="small"
        />
      </div>
      <div className="w-full">
        <TextField
          // InputProps={{ classes }}
          inputProps={{ style: { fontSize: 18 } }} // font size of input text
          id="standard-basic"
          multiline={true}
          minRows={4}
          maxRows={5}
          style={{ width: "100%" }}
          label=""
          placeholder={placeholder ? placeholder : "What's happening?"}
          // variant="filled"
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

export default PostText;
