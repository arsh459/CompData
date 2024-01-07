import clsx from "clsx";
import DrawerHeader from "./DrawerHeader";
import MainDrawer from "./MainDrawer";
import { Transition, Popover } from "@headlessui/react";
import { formLabelValues, pinValues } from "./constants";
// import { useRouter } from "next/dist/client/router";

interface Props {
  elements: DrawerElement[];
  pin: pinValues;
  onElementClick: (val: formLabelValues, divId?: string) => void;
  // onPinnedClick: (val: any) => void;
  onTopButtonClick: () => void;
  selectedValue: formLabelValues;
}

export interface DrawerElement {
  text: string;
  bulletLevel: 1 | 2 | 3 | 4;
  value: formLabelValues;
  style: "button" | "list";
  elementLabel?: "done" | "live" | "todo";
  subElements?: DrawerElement[];
  visibleKey?: formLabelValues;
  divId?: string;
}

const Drawer: React.FC<Props> = ({
  elements,
  selectedValue,
  onElementClick,
  onTopButtonClick,
  pin,
  // onPinnedClick,
  // pinnedElements,
  // elementsVisible,
}) => {
  //   const [isShowing, setIsShowing] = useState<boolean>(false);
  //   console.log("isShowing", isShowing);
  // console.log("elements", elements);
  return (
    <div className="overflow-y-auto bg-white border border-gray-100 hover:shadow-2xl">
      <Popover className="relative overflow-y-auto">
        {({ open }) => (
          <>
            <div
              className={clsx(
                "fixed top-0 left-0 right-0 z-50",
                "lg:hidden",
                "overflow-y-auto"
              )}
            >
              <DrawerHeader
                menuVisible={true}
                //   onClick={() => setIsShowing((prev) => !prev)}
              />
            </div>

            {/* <Popover.Overlay
              className={`${
                open ? "opacity-50 fixed inset-0 z-20" : "opacity-0"
              } bg-black`}
            /> */}

            <Transition
              className="overflow-y-auto"
              enter="transition-opacity duration-150 ease-linear"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-150 ease-linear"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Popover.Panel
                className="z-50 fixed top-0 left-0 overflow-y-auto bg-white border border-gray-100"
                // className="fixed left-0 top-0 z-50"
              >
                <MainDrawer
                  pin={pin}
                  topButtonText="Create event"
                  elements={elements}
                  // pinnedElements={pinnedElements}
                  // onPinnedClick={onPinnedClick}
                  onTopButtonClick={onTopButtonClick}
                  selectedValue={selectedValue}
                  onElementClick={onElementClick}
                  popover={true}
                />
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
      <div className="hidden lg:visible lg:flex">
        <MainDrawer
          // elementsVisible={elementsVisible}
          pin={pin}
          topButtonText="Create event"
          onTopButtonClick={onTopButtonClick}
          // onPinnedClick={onPinnedClick}
          elements={elements}
          selectedValue={selectedValue}
          onElementClick={onElementClick}
          popover={false}
        />
      </div>
    </div>
  );
};

export default Drawer;
