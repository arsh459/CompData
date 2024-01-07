import clsx from "clsx";
import { TextField } from "@mui/material";
import Button from "@components/button";
import { ListItemContent } from "@hooks/sprints/useSprint";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import UppyWidget from "@components/Uppy";
import MediaCard from "@components/MediaCard";

interface Props {
  onUpdateWin: (newValue: ListItemContent[]) => void;
  howToWin?: ListItemContent[];
  uid: string;
}

const HowToWinAdder: React.FC<Props> = ({ howToWin, onUpdateWin, uid }) => {
  const onAddNewWin = () => {
    onUpdateWin([
      ...(howToWin ? howToWin : []),
      {
        text: "",
      },
    ]);
  };

  const onTextUpdate = (index: number, text: string) => {
    if (howToWin && howToWin[index]) {
      onUpdateWin([
        ...howToWin.slice(0, index),
        {
          ...howToWin[index],
          text,
        },
        ...howToWin.slice(index + 1, howToWin.length),
      ]);
    }
  };

  const onMediaDelete = (index: number) => {
    if (howToWin && howToWin[index]) {
      onUpdateWin([
        ...howToWin.slice(0, index),
        {
          ...howToWin[index],
          image: undefined,
        },
        ...howToWin.slice(index + 1, howToWin.length),
      ]);
    }
  };
  const onMediaUpload = (
    index: number,
    media: (CloudinaryMedia | AWSMedia)[]
  ) => {
    if (howToWin && howToWin[index] && media.length) {
      onUpdateWin([
        ...howToWin.slice(0, index),
        {
          ...howToWin[index],
          image: media[0],
        },
        ...howToWin.slice(index + 1, howToWin.length),
      ]);
    }
  };

  const onHeadingRemove = (index: number) => {
    // console.log("index", index);
    if (howToWin && howToWin[index]) {
      onUpdateWin([
        ...howToWin.slice(0, index),
        ...howToWin.slice(index + 1, howToWin.length),
      ]);
    }
  };

  //   console.log("co", howToWin);

  return (
    <div>
      <div className="py-2 flex flex-wrap">
        {howToWin &&
          howToWin.map((item, index) => {
            return (
              <div
                key={`index-howToWin-${index}`}
                className={clsx("m-1 border p-2", "border-gray-200")}
              >
                <div className="w-48 py-2">
                  <TextField
                    style={{ width: "100%" }}
                    label={"text"}
                    variant="outlined"
                    onChange={(val) => {
                      onTextUpdate(index, val.target.value);
                    }}
                    value={
                      howToWin && howToWin[index] ? howToWin[index].text : ""
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>

                <div>
                  <UppyWidget
                    onUpload={(media) => onMediaUpload(index, media)}
                    onRemove={(media) => onMediaDelete(index)}
                    uid={uid}
                    styles="rounded-none bg-red-500  text-center  mt-2 text-white rounded-2xl"
                    filterButton={true}
                    leftButtonText="Add image"
                    screenName="admin"
                    taskName="admin"
                  />
                </div>
                {howToWin && howToWin[index] && howToWin[index].image ? (
                  <div className="w-1/4 aspect-1 relative border-2">
                    <MediaCard media={howToWin[index].image} />
                    <div
                      onClick={() => onMediaDelete(index)}
                      className="absolute top-1/4 bg-yellow-300 rounded-full right-0"
                    >
                      ❌
                    </div>
                  </div>
                ) : null}

                <div className="pt-1">
                  <button
                    className="underline"
                    onClick={() => onHeadingRemove(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
      </div>
      <div className="flex">
        <Button onClick={onAddNewWin} appearance="contained">
          Add How To Win
        </Button>
      </div>
    </div>
  );
};

export default HowToWinAdder;
