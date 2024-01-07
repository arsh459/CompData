import { UserInterface } from "@models/User/User";

// import Script from "next/script";
import { Checkbox, TextField } from "@mui/material";
import { useNewTestimonial } from "@hooks/testimonials/useNewTestimonial";
import BottomNavComV2 from "@templates/listing/Book/BottomNavComV2";
import { useState } from "react";
import { saveNewTestimonial } from "@models/Testimonial/createUtils";
import { useRouter } from "next/router";
import Loading from "@components/loading/Loading";
import { useTestimonialParams } from "@hooks/testimonials/useTestimonialParams";
import UppyWidgetContainer from "@components/Uppy/UppyWidgetContainer";
import { AWSMedia } from "@models/Media/cloudinaryUpload";

interface Props {
  user: UserInterface;
}

const AddTestimonialTemplate: React.FC<Props> = ({ user }) => {
  const { id } = useTestimonialParams();

  const {
    testimonial,
    onUpdateAchiev,
    onUpdateName,
    onUpdateQuote,
    onMediaDelete,
    onMediaUpload,
    onToggleFemale,
    onToggleTransformation,
    onUpdateYoutubeId,
    onUpdatePriority,
    onUpdateShortAchiev,
  } = useNewTestimonial(user.uid, id);

  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const onSave = async () => {
    if (loading === false) {
      setLoading(true);

      if (testimonial) {
        try {
          // console.log("testim", testimonial);
          await saveNewTestimonial(testimonial);
          router.push("/admin/testimonials");
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
        <h1 className="text-gray-700 text-4xl font-semibold">
          Add Testimonial
        </h1>
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
                media={testimonial?.media ? [testimonial?.media] : []}
                leftButtonText="Add profile"
                uid={user.uid}
                onDelete={() => onMediaDelete("media")}
                onUpload={(newMedias: AWSMedia[]) =>
                  onMediaUpload(newMedias, "media")
                }
                onRemove={() => onMediaDelete("media")}
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
                placeholder={""}
                label={"Name of user"}
                // variant="outlined"
                onChange={(val) => onUpdateName(val.target.value)}
                value={testimonial?.name}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div className="pt-4">
              <TextField
                style={{ width: "100%" }}
                placeholder={""}
                label={"YoutubeId of Video"}
                // variant="outlined"
                onChange={(val) => onUpdateYoutubeId(val.target.value)}
                value={testimonial?.youtubeId}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div className="pt-4">
              <TextField
                style={{ width: "100%" }}
                placeholder={""}
                helperText="120 characters only"
                label={"Achievement"}
                // variant="outlined"
                onChange={(val) => onUpdateAchiev(val.target.value)}
                value={testimonial?.achievement}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div className="pt-4">
              <TextField
                style={{ width: "100%" }}
                placeholder={""}
                helperText="120 characters only"
                label={"Short Achievement"}
                // variant="outlined"
                onChange={(val) => onUpdateShortAchiev(val.target.value)}
                value={testimonial?.shortAchievement}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div className="pt-4">
              <TextField
                style={{ width: "100%" }}
                placeholder={"Quote by the user"}
                label={"Quote"}
                onChange={(val) => onUpdateQuote(val.target.value)}
                value={testimonial?.quote}
                multiline={true}
                minRows={5}
                maxRows={8}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div className="py-4 flex">
              <UppyWidgetContainer
                media={testimonial?.video ? [testimonial?.video] : []}
                leftButtonText="Add Video"
                uid={user.uid}
                onDelete={() => onMediaDelete("video")}
                onUpload={(newMedias: AWSMedia[]) =>
                  onMediaUpload(newMedias, "video")
                }
                onRemove={() => onMediaDelete("video")}
                heading=""
                helperText=""
                height="none"
                filterButton={true}
                tileHeight="small"
                bgWhite={true}
                screenName="admin"
                taskName="admin"
              />
              <div className="px-4">
                <UppyWidgetContainer
                  media={testimonial?.thumbnail ? [testimonial?.thumbnail] : []}
                  leftButtonText="Add thumbnail"
                  uid={user.uid}
                  onDelete={() => onMediaDelete("thumbnail")}
                  onUpload={(newMedias: AWSMedia[]) =>
                    onMediaUpload(newMedias, "thumbnail")
                  }
                  onRemove={() => onMediaDelete("thumbnail")}
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
              <UppyWidgetContainer
                media={testimonial?.image ? [testimonial?.image] : []}
                leftButtonText="Add Image"
                uid={user.uid}
                onDelete={() => onMediaDelete("image")}
                onUpload={(newMedias: AWSMedia[]) =>
                  onMediaUpload(newMedias, "image")
                }
                onRemove={() => onMediaDelete("image")}
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

            <div className="py-4">
              <TextField
                style={{ width: "100%" }}
                placeholder={"Priority of this activity"}
                label={"Priority"}
                variant="outlined"
                onChange={(val) => onUpdatePriority(val.target.value)}
                value={testimonial?.priority || 0}
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>

            <div className="pr-4 flex items-center">
              <Checkbox
                color="primary"
                checked={testimonial?.isFemale ? true : false}
                onChange={() => onToggleFemale(!testimonial?.isFemale)}
              />
              <p className="text-gray-700">is Female</p>
            </div>
            <div className="pr-4 flex items-center">
              <Checkbox
                color="primary"
                checked={testimonial?.isTransformation ? true : false}
                onChange={() =>
                  onToggleTransformation(!testimonial?.isTransformation)
                }
              />
              <p className="text-gray-700">is Video Transformation?</p>
            </div>
          </div>
        )}
      </>

      <div className="fixed bottom-0 left-0 right-0  z-50">
        <BottomNavComV2 cta={"Save Testimonial"} onClick={onSave} />
      </div>
    </div>
  );
};

export default AddTestimonialTemplate;
