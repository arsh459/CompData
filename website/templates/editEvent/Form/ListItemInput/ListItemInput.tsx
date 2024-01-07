import Button from "@components/button";
import { ListItem } from "@templates/listing/NumberedList/NumberedList";
import { useState, Fragment, useCallback } from "react";
import ListInput from "./ListInput";
import { Dialog, Transition } from "@headlessui/react";
import ListItemHolder from "./ListItemHolder";
import clsx from "clsx";
import UppyWidgetContainer from "@components/Uppy/UppyWidgetContainer";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
// import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";
// import CloudinaryWidget from "../CloudinaryWidget";

interface Props {
  currentItems: ListItem[];
  onChange: any;
  buttonText: string;
  leftButtonText: string;
  modalHeading: string;
  helperTextHeading: string;
  labelHeading: string;
  placeholderHeading: string;
  helperText: string;
  label: string;
  placeholder: string;
  uid: string;
  eventId: string;
  onButtonPress: () => void;
  sectionHeading: string;
  sectionHelper: string;
}

const ListItemInput: React.FC<Props> = ({
  onChange,
  buttonText,
  leftButtonText,
  modalHeading,
  currentItems,
  onButtonPress,
  uid,
  helperText,
  label,
  placeholder,
  helperTextHeading,
  labelHeading,
  placeholderHeading,
  eventId,
  sectionHeading,
  sectionHelper,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  //   const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  // const [media, setMedia] = useState<(CloudinaryMedia | undefined)[]>(() =>
  //   currentItems.map((item) => item.media)
  // );

  const onUploadMedia = useCallback(
    (newFiles: (CloudinaryMedia | AWSMedia)[]) => {
      onChange((prev: ListItem[]) => [
        ...prev.slice(0, selectedIndex),
        { ...prev[selectedIndex], media: newFiles[0] },
        ...prev.slice(selectedIndex + 1, prev.length),
      ]);
    },
    [onChange, selectedIndex]
  );

  function closeModal() {
    // if (selectedItem) {
    //   onChange([...currentItems, selectedItem]);
    //   setIsOpen(false);
    // } else {
    setIsOpen(false);
    // }
  }

  const onDeleteMedia = () => {
    onChange((prev: ListItem[]) => [
      ...prev.slice(0, selectedIndex),
      { ...prev[selectedIndex], media: null },
      ...prev.slice(selectedIndex + 1, prev.length),
    ]);
  };

  function openModal() {
    // setSelectedItem({ text: "", heading: "" });
    onChange([...currentItems, { text: "", heading: "" }]);
    setSelectedIndex(currentItems.length);
    setIsOpen(true);
  }

  // console.log("cu", currentItems);

  return (
    <div className="">
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {modalHeading}
                </Dialog.Title>
                {/* <div className="mt-2">
                  <p className="text-sm text-gray-500"></p>
                </div> */}

                <div>
                  <UppyWidgetContainer
                    height="none"
                    media={
                      currentItems[selectedIndex] &&
                      currentItems[selectedIndex].media
                        ? [currentItems[selectedIndex].media]
                        : []
                    }
                    leftButtonText="Add media"
                    heading=""
                    helperText=""
                    uid={uid}
                    buttonHelperText="*A short video/image to better explain it"
                    onUpload={onUploadMedia}
                    onDelete={onDeleteMedia}
                    screenName="admin"
                    taskName="admin"
                    // onDelete={removeMedia}
                    // multiple={false}
                    // maxFiles={1}
                  />
                </div>

                {currentItems && currentItems[selectedIndex] ? (
                  <div className="pt-4 pb-2">
                    <ListInput
                      item={currentItems[selectedIndex]}
                      selectedIndex={selectedIndex}
                      onChange={onChange}
                      helperText={helperText}
                      label={label}
                      placeholder={placeholder}
                      helperTextHeading={helperTextHeading}
                      labelHeading={labelHeading}
                      placeholderHeading={placeholderHeading}
                      //   setSelectedItem={setSelectedItem}
                    />
                  </div>
                ) : null}

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModal}
                  >
                    Add
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      <div className="pb-4">
        <p className="text-4xl text-gray-600 font-medium">{sectionHeading}</p>
        <p className="text-sm text-gray-600 font-light pt-1">{sectionHelper}</p>
      </div>

      <div className="flex flex-wrap h-52 overflow-y-auto bg-gray-300 rounded-md shadow-inner">
        {currentItems.map((item, index) => {
          return (
            <div key={`liItem-${index}`} className={clsx("p-2")}>
              <ListItemHolder
                item={item}
                onClick={() => {
                  setSelectedIndex(index);
                  setIsOpen(true);
                }}
                onClose={() => {
                  onChange([
                    ...currentItems.slice(0, index),
                    ...currentItems.slice(index + 1, currentItems.length),
                  ]);
                }}
              />
            </div>
          );
        })}
        {/* <ListInput item={{ text: "Beginners", heading: "Heading" }} /> */}
      </div>
      <div className="flex pt-4">
        <div className="pr-2">
          <Button
            appearance="control"
            onClick={openModal}
            // onClick={() => onChange((prev: ListItem[]) => [...prev])}
          >
            <div className="pl-2 pr-2">
              <p className="capitalize text-gray-700 font-medium">
                {leftButtonText}
              </p>
            </div>
          </Button>
        </div>
        <Button
          appearance="contained"
          onClick={onButtonPress}
          //   onClick={() => onButtonPress("schedule", "", dateTimeList)}
        >
          <div className="pl-2 pr-2">
            <p className="capitalize">{buttonText}</p>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default ListItemInput;
