import Loading from "@components/loading/Loading";
import UppyWidgetContainer from "@components/Uppy/UppyWidgetContainer";
import { useNewAdvertisement } from "@hooks/advertisement/useNewAdvertisement";
import { saveNewAdvertisement } from "@models/AdvertisementDoc/createUtils";
import { TextField } from "@mui/material";
import BottomNavComV2 from "@templates/listing/Book/BottomNavComV2";
import { useRouter } from "next/router";
import { useState } from "react";

interface Props {
  uid: string;
  gameId: string;
  advertisementId: string;
}

const AdvertisementFormTemplate: React.FC<Props> = ({
  uid,
  gameId,
  advertisementId,
}) => {
  const { advertisementDoc, onMediaUpload, onMediaDelete, onUpdateLink } =
    useNewAdvertisement(
      gameId,
      advertisementId === "add" ? undefined : advertisementId
    );

  // console.log("a", advertisementId);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const onSave = async () => {
    if (loading === false) {
      setLoading(true);

      if (advertisementDoc) {
        try {
          await saveNewAdvertisement(gameId, advertisementDoc);
          router.back();
        } catch (error) {
          console.log(error);
        }
      }
      setLoading(false);
    }
  };

  return (
    <div className="h-screen p-4 pt-8 flex flex-col">
      <p className="text-gray-700 text-4xl font-semibold">
        {advertisementId === "add" ? "Add" : "Edit"} AdvertisementDoc
      </p>
      <>
        {loading ? (
          <div className="flex-1 flex justify-center items-center">
            <Loading fill="#ff735c" width={48} height={48} />
          </div>
        ) : (
          <div className="py-8">
            <UppyWidgetContainer
              media={advertisementDoc?.image ? [advertisementDoc.image] : []}
              leftButtonText="Add media"
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
            <div className="h-8" />
            <TextField
              style={{ width: "100%" }}
              placeholder={""}
              label={"Webview Link"}
              variant="outlined"
              onChange={(val) => onUpdateLink(val.target.value)}
              value={advertisementDoc?.link}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
        )}
      </>
      {loading ? null : (
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <BottomNavComV2 cta={"Save Ad"} onClick={onSave} />
        </div>
      )}
    </div>
  );
};

export default AdvertisementFormTemplate;
