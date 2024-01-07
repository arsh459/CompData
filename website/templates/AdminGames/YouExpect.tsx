import UppyWidgetContainer from "@components/Uppy/UppyWidgetContainer";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { Badge, TextAndImgType } from "@models/Prizes/PrizeV2";
import CloseBtn from "@templates/community/Program/Feed/CloseBtn";
import MediaTile from "@templates/listing/HeaderImage/MediaTile";
import { useState } from "react";

interface Props {
  uid: string;
  badge: Badge;
  setBadge: (data: Badge) => void;
}

const YouExpect: React.FC<Props> = ({ uid, badge, setBadge }) => {
  const [add, setAdd] = useState<boolean>(false);

  const [textAndImg, setTextAndImg] = useState<TextAndImgType>({
    icon: undefined,
    text: "",
  });

  const handleSaveTextAndImg = () => {
    if (textAndImg.icon && textAndImg.text) {
      const remoteTextAndImg: TextAndImgType[] = badge.youExpect
        ? [...badge.youExpect, textAndImg]
        : [textAndImg];
      setBadge({ ...badge, youExpect: remoteTextAndImg });
      setTextAndImg({ icon: undefined, text: "" });
    }
  };

  const onUpload = (media: (CloudinaryMedia | AWSMedia | undefined)[]) => {
    if (media && media.length) {
      setTextAndImg((prev) => ({ ...prev, icon: media[0] }));
    }
  };

  const onDelete = (media: CloudinaryMedia | AWSMedia) => {
    setTextAndImg((prev) => ({ ...prev, icon: undefined }));
  };

  const onDeleteTextAndImg = (textAndImg: TextAndImgType) => {
    const remoteTextAndImg = badge.youExpect?.filter(
      (each: TextAndImgType) => each !== textAndImg
    );
    setBadge({ ...badge, youExpect: remoteTextAndImg });
  };

  const onEditTextAndImg = (textAndImg: TextAndImgType) => {
    const remoteTextAndImg = badge.youExpect?.filter(
      (each: TextAndImgType) => each !== textAndImg
    );
    setBadge({ ...badge, youExpect: remoteTextAndImg });
    setTextAndImg({ icon: textAndImg.icon, text: textAndImg.text });
  };

  return (
    <div className="border p-4 m-4">
      <h2 className="font-bold px-2">You Expect (Image Frame 55*55) :</h2>

      {add ? null : (
        <button
          className="m-2 px-6 py-0.5 border bg-slate-200 rounded-md"
          onClick={() => setAdd(true)}
        >
          Add You Expect
        </button>
      )}

      {add ? (
        <div>
          <div className="flex items-center p-4">
            <label className="pr-2">Text :</label>
            <input
              type="string"
              className="border rounded-md"
              name="text"
              value={textAndImg.text}
              onChange={(e) =>
                setTextAndImg((prev) => ({
                  icon: prev.icon,
                  text: e.target.value,
                }))
              }
            />
          </div>
          <div className="p-4">
            <UppyWidgetContainer
              onUpload={onUpload}
              screenName="admin"
              taskName="admin"
              onDelete={onDelete}
              media={[textAndImg.icon]}
              uid={uid}
              heading=""
              helperText=""
              height="none"
              filterButton={true}
              tileHeight="small"
              bgWhite={true}
              styles="rounded-none bg-red-500 border-none text-white"
              containerStyles="border border-dashed border-2 border-slate-500 bg-gray-100 h-64 flex justify-center items-center"
            />
          </div>
          <div className="flex justify-between items-center p-4">
            <button
              className="px-6 py-0.5 border bg-slate-200 rounded-md"
              onClick={handleSaveTextAndImg}
            >
              Save
            </button>
            <button
              className="px-6 py-0.5 border bg-slate-200 rounded-md"
              onClick={() => setAdd(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : null}

      {badge.youExpect && badge.youExpect.length > 0 ? (
        <div className="grid grid-flow-col auto-cols-fr">
          {badge.youExpect.map((each, index) => (
            <div
              key={`${each.text}-${index}`}
              className=" m-1 p-2 bg-gray-100 rounded-lg flex flex-col justify-center items-center"
            >
              <div className="pb-2 self-end">
                <CloseBtn
                  onCloseModal={() => onDeleteTextAndImg(each)}
                  tone="dark"
                />
              </div>
              <div
                onClick={() => onEditTextAndImg(each)}
                className="pb-2 self-end cursor-pointer"
              >
                <p className="text-red-500">Edit</p>
              </div>
              {each.icon ? (
                <MediaTile
                  media={each.icon}
                  width={100}
                  height={100}
                  alt="prise image"
                />
              ) : null}
              <p className="py-2">{each.text}</p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default YouExpect;
