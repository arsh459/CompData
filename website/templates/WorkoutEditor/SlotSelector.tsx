import { Divider, Checkbox } from "@mui/material";
import EditorLayout from "./EditorLayout";
// import TextField from "@mui/material/TextField";
// import AdapterDateFns from "@mui/lab/AdapterDateFns";
// import LocalizationProvider from "@mui/lab/LocalizationProvider";
// import TimePicker from "@mui/lab/TimePicker";
import IconButton from "@components/button/iconButton";
import Button from "@components/button";

// import clsx from "clsx";

interface Props {
  heading: string;
  leftButtonText?: string;
  //   leftButtonOnPress?: () => void;
  buttonText: string;
  onButtonPress: () => void;
  helperText: string;
  slots: string[];

  onSlotsAdd: (newSlot: string) => void;
  onSlotsDelete: (index: number) => void;
  duration: number;
  onSlotUpdate: (value: string, index: number) => void;
  onSlotSet: (slots: string[]) => void;
}

const SlotSelector: React.FC<Props> = ({
  heading,
  leftButtonText,
  //   leftButtonOnPress,
  buttonText,
  onButtonPress,
  helperText,
  onSlotsAdd,
  onSlotUpdate,
  onSlotsDelete,
  slots,
  duration,
  onSlotSet,
}) => {
  //   const [isOpen, setIsOpen] = useState<boolean>(false);

  // useEffect(() => {
  // if (slots.length === 0) {
  // onSlotsAdd(new Date().toISOString());
  // }
  // }, [slots, onSlotsAdd]);

  // console.log("slots", slots);

  return (
    <EditorLayout
      heading={heading}
      // leftButtonOnPress={() => onSlotsAdd(new Date().toISOString())}
      helperText={helperText}
      buttonText={buttonText}
      onButtonPress={onButtonPress}
      leftButtonText={leftButtonText}
    >
      <div>
        <div>
          <div className="flex items-center">
            <Checkbox
              color="primary"
              checked={slots.length === 0}
              onChange={() =>
                slots.length === 0
                  ? onSlotsAdd(new Date().toISOString())
                  : onSlotSet([])
              }
            />
            <p className="text-gray-700 text-xl">Can join anytime</p>
          </div>

          <div className="pt-4 pb-4 flex items-center">
            <div className="w-1/2">
              <Divider />
            </div>
            <p className="pl-4 pr-4 text-gray-700">Or</p>
            <div className="w-1/2">
              <Divider />
            </div>
          </div>

          <div className="pb-8 flex justify-center">
            <Button
              appearance="control"
              onClick={() => onSlotsAdd(new Date().toISOString())}
            >
              <div className="pl-2 pr-2">
                <p className="capitalize text-gray-700 font-medium">
                  {leftButtonText}
                </p>
              </div>
            </Button>
          </div>
        </div>
      </div>

      <div>
        {slots.map((item, index) => {
          return (
            <div
              key={`slot-${item}-${index}`}
              className="flex items-center pb-4"
            >
              <div className="w-1/3">
                {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <TimePicker
                    label="Start time"
                    value={new Date(item)}
                    onChange={(newValue: any) => {
                      if (newValue)
                        onSlotUpdate(newValue?.toISOString(), index);
                    }}
                    renderInput={(params: any) => <TextField {...params} />}
                  />
                </LocalizationProvider> */}
              </div>
              <div className="px-4">
                <p className="text-lg text-gray-500">
                  {`+ ${duration ? duration : "30"}mins`}
                </p>
              </div>
              <div className="pl-2">
                <IconButton onClick={() => onSlotsDelete(index)} />
              </div>
            </div>
          );
        })}
      </div>
    </EditorLayout>
  );
};

export default SlotSelector;
