import UppyWidgetContainer from "@components/Uppy/UppyWidgetContainer";
import { UserInterface } from "@models/User/User";
import { useLocalCreator } from "./hooks/useLocalCreator";

interface Props {
  creator: UserInterface;
}

const EditCreator: React.FC<Props> = ({ creator }) => {
  const {
    tempStr,
    settempStr,
    localCreator,
    onUserDescriptionUpdate,
    onAddStringToArray,
    onRemoveStringFromArray,
    onUploadSingleMedia,
    onDeleteSingleMedia,
    onSave,
  } = useLocalCreator(creator.uid);

  return (
    <div className="min-h-screen p-4 flex flex-col">
      <h1 className="text-4xl font-bold mb-4">Edit Creator Details</h1>
      <div className="flex-1 w-max">
        <div className="flex p-4">
          <label className="pr-2">Description :</label>
          <textarea
            name="description"
            className="flex-1 h-20 border rounded-md"
            value={localCreator?.description}
            onChange={(e) => onUserDescriptionUpdate(e.target.value)}
          />
        </div>
        <div className="border m-2 p-4">
          <div className="flex items-center">
            <label className="pr-2">award / achievement :</label>
            <input
              type="string"
              className="border rounded-md"
              name="bgLinearColors"
              value={tempStr.awards}
              onChange={(e) =>
                settempStr((p) => ({ ...p, awards: e.target.value }))
              }
            />
            <p
              onClick={() =>
                tempStr.awards !== "" &&
                onAddStringToArray("awards", tempStr.awards)
              }
              className="bg-red-500 text-white ml-2 px-4 py-1"
            >
              Add
            </p>
          </div>
          <div className="p-1 my-1">
            {localCreator?.awards?.map((each, index) => (
              <div
                key={`${each}-${index}`}
                className="border flex justify-between items-center p-1 m-1"
              >
                <span>{each}</span>
                <span onClick={() => onRemoveStringFromArray("awards", each)}>
                  &#10060;
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="min-w-[200px] min-h-[200px] flex flex-col p-4 border m-1">
          <label className="p-2">Profile Image Without BG :</label>
          <UppyWidgetContainer
            onUpload={(media) =>
              onUploadSingleMedia("profileImgWithoutBG", media)
            }
            screenName="admin"
            taskName="admin"
            onDelete={(media) =>
              onDeleteSingleMedia("profileImgWithoutBG", media)
            }
            media={[localCreator?.profileImgWithoutBG]}
            uid={creator.uid}
            heading=""
            helperText=""
            height="none"
            filterButton={true}
            tileHeight="small"
            bgWhite={true}
            styles="rounded-none bg-red-500 border-none text-white"
          />
        </div>
      </div>
      <button
        className="w-max m-4 px-8 py-1 border bg-[#ff725c] text-lg rounded-md"
        onClick={onSave}
      >
        Save
      </button>
    </div>
  );
};

export default EditCreator;
