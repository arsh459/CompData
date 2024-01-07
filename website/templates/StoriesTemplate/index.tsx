// import Script from "next/script";
import { TextField } from "@mui/material";
import BottomNavComV2 from "@templates/listing/Book/BottomNavComV2";
import { useState } from "react";
import { useRouter } from "next/router";
import Loading from "@components/loading/Loading";
import UppyWidgetContainer from "@components/Uppy/UppyWidgetContainer";
import { useNewStories } from "@hooks/stories/useNewStories";
import { saveNewStories } from "@models/Stories/createUtils";

interface Props {
  uid: string;
  storiesId: string;
}

const AddStoriesTemplate: React.FC<Props> = ({ storiesId, uid }) => {
  //   const { id } = useTestimonialParams();

  const {
    stories,

    onMediaDelete,
    onMediaUpload,
    onUpdateText,
    onUpdateTitle,
    onUpdatePriority,
    onUpdateLink,
  } = useNewStories(uid, storiesId);

  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  console.log({ stories });

  const onSave = async () => {
    if (loading === false) {
      setLoading(true);

      if (stories) {
        try {
          // console.log("testim", stories);
          await saveNewStories(stories);
          router.push("/admin/stories");
          // setLoading(false);
        } catch (error) {
          console.log("error", error);
        }
      }
    }
  };

  return (
    <div className="p-4 pt-8">
      <div>
        <p className="text-gray-700 text-4xl font-semibold">Add Story</p>
      </div>
      <>
        {loading ? (
          <div className="pt-8">
            <div className="flex justify-center items-center">
              <Loading fill="#ff735c" width={48} height={48} />
            </div>
          </div>
        ) : (
          <div className="py-8 mb-9">
            <div>
              <UppyWidgetContainer
                media={stories?.media ? [stories?.media] : []}
                leftButtonText="Add Image"
                uid={uid}
                onDelete={onMediaDelete}
                onUpload={onMediaUpload}
                onRemove={onMediaDelete}
                heading=""
                helperText=""
                height="none"
                filterButton={true}
                tileHeight="small"
                bgWhite={true}
                screenName="admin"
                taskName="admin"
              />
            </div>
            <div className="pt-4">
              <TextField
                style={{ width: "100%" }}
                placeholder={"Name of user"}
                label={"Name of user"}
                variant="outlined"
                onChange={(val) => onUpdateTitle(val.target.value)}
                value={stories?.title}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>

            <div className="pt-4">
              <TextField
                style={{ width: "100%" }}
                placeholder={"Text"}
                helperText="120 characters only"
                label={"Text"}
                variant="outlined"
                onChange={(val) => onUpdateText(val.target.value)}
                value={stories?.text}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div className="pt-4">
              <TextField
                style={{ width: "100%" }}
                placeholder={"Link to navigate"}
                // helperText="120 characters only"
                label={"Link"}
                variant="outlined"
                onChange={(val) => onUpdateLink(val.target.value)}
                value={stories?.link}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>

            <div className="py-4">
              <TextField
                style={{ width: "100%" }}
                placeholder={"Priority of this activity"}
                label={"Priority"}
                variant="outlined"
                onChange={(val) => onUpdatePriority(val.target.value)}
                value={stories?.priority || 0}
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
          </div>
        )}
      </>

      <div className="fixed bottom-0 left-0 right-0  z-50">
        <BottomNavComV2 cta={"Save Story"} onClick={onSave} />
      </div>
    </div>
  );
};

export default AddStoriesTemplate;
