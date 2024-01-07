import Button from "@components/button";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import MediaFile from "@templates/editEvent/Form/MediaGrid/MediaFile";
import clsx from "clsx";
import UppyWidget from ".";

interface Props {
  onUpload: (newMediaList: AWSMedia[]) => void;
  onRemove?: (id: string) => void;
  onDelete: (toRemove: CloudinaryMedia | AWSMedia) => void;
  styles?: string | undefined;
  leftButtonText?: string;

  media: (CloudinaryMedia | AWSMedia | undefined)[];
  uid: string;

  heading: string;
  helperText: string;
  buttonHelperText?: string;
  containerStyles?: string | undefined;
  filterButton?: boolean;

  onNext?: () => void;
  backButtonText?: string;
  backButtonPress?: () => void;

  height?: "none" | "small" | "medium";
  bgWhite?: boolean;
  tileHeight?: "small";
  screenName: string;
  taskName: string;
}

const UppyWidgetContainer: React.FC<Props> = ({
  onRemove,
  onUpload,
  children,
  heading,
  leftButtonText,
  helperText,
  containerStyles,
  onNext,
  backButtonPress,
  backButtonText,
  buttonHelperText,
  height,
  bgWhite,
  media,
  tileHeight,
  onDelete,
  styles,
  filterButton,
  uid,
  screenName,
  taskName,
}) => {
  return (
    <div className="max-w-lg">
      {heading || helperText ? (
        <div className="pb-4">
          <p className="text-4xl text-gray-600 font-medium">{heading}</p>
          <p className="text-sm text-gray-600 font-light pt-1">{helperText}</p>
        </div>
      ) : null}

      <div className={`flex ${containerStyles}`}>
        <UppyWidget
          onUpload={onUpload}
          uid={uid}
          onRemove={onRemove}
          styles={styles}
          filterButton={filterButton}
          leftButtonText={leftButtonText}
          screenName={screenName}
          taskName={taskName}
        />
        {children}

        {backButtonText && backButtonPress ? (
          <div className="pl-4">
            <Button appearance="control" onClick={backButtonPress}>
              <div className="pl-2 pr-2">
                <p className="capitalize text-gray-700 font-medium">
                  {backButtonText}
                </p>
              </div>
            </Button>
          </div>
        ) : null}

        {onNext ? (
          <div className="pl-4">
            <Button appearance="control" onClick={onNext}>
              <div>
                <p className="text-gray-700 font-semibold">Next</p>
              </div>
            </Button>
          </div>
        ) : null}
      </div>

      {buttonHelperText ? (
        <p className="text-sm text-gray-600 font-light pt-1">
          {buttonHelperText}
        </p>
      ) : null}

      <div>
        <div>
          <div
            // {...provided.droppableProps}
            // ref={provided.innerRef}
            className={clsx(
              "flex flex-wrap",

              height === "none"
                ? " "
                : height === "small"
                ? "h-24 mt-2 p-2 overflow-x-auto"
                : "h-52 mt-2 p-2 overflow-x-auto",

              bgWhite ? "" : "bg-gray-300",
              "rounded-md shaddow-inner"
            )}
          >
            {media.map((el, index) => {
              if (el)
                return (
                  <div key={el.id}>
                    <div>
                      <MediaFile
                        selected={false}
                        mediaElement={el}
                        tileHeight={tileHeight}
                        onDelete={onDelete}
                        index={index}
                      />
                    </div>
                  </div>
                );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UppyWidgetContainer;
