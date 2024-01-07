// import Button from "@components/button";
import Divider from "@components/divider/Divider";
import HolidayingLogo from "@components/logo";
import { Popover } from "@headlessui/react";
import clsx from "clsx";
import { formLabelValues, pinValues } from "./constants";
import { DrawerElement } from "./Drawer";
import DrawerItem from "./DrawerItem";
import TopButton from "./TopButton";

interface Props {
  elements: DrawerElement[];
  pin: pinValues;
  noLogo?: boolean;
  onElementClick: (val: formLabelValues, divId?: string) => void;
  // onPinnedClick: (val: any) => void;
  selectedValue: formLabelValues;
  onTopButtonClick?: () => void;
  topButtonText?: string;
  // elementsVisible: boolean;
  popover: boolean;
}

const MainDrawer: React.FC<Props> = ({
  elements,
  selectedValue,
  onElementClick,
  pin,
  noLogo,
  onTopButtonClick,
  topButtonText,
  // elementsVisible,
  popover,
  // pinnedElements,
}) => {
  // console.log("elements", elements);

  return (
    <div
      className={clsx(
        // "h-screen w-60 bg-gradient-to-b from-gray-50 to-gray-50",
        "h-screen pb-10  w-60",
        // "min-h-screen",
        // "hover:shadow-2xl border-gray-100 border",
        "flex flex-col"
      )}
    >
      {!noLogo ? (
        <>
          <div className="p-4">
            <HolidayingLogo text={true} size="small" link="/dashboard" />
          </div>
          <div className="pl-4 pr-4 pb-2">
            <Divider />
          </div>
        </>
      ) : null}

      {topButtonText && onTopButtonClick ? (
        <div className="pt-4 pl-4 pr-4 flex-none">
          {popover ? (
            <div className="flex">
              <Popover.Button>
                {/* <Button appearance="contained" onClick={onTopButtonClick}> */}
                <TopButton
                  topButtonText={topButtonText}
                  onTopButtonClick={onTopButtonClick}
                />
                {/* </Button> */}
              </Popover.Button>
            </div>
          ) : (
            <div className="flex">
              <TopButton
                topButtonText={topButtonText}
                onTopButtonClick={onTopButtonClick}
              />
            </div>
          )}
        </div>
      ) : null}

      {/* {pinnedElements.map((item) => {
        if (popover) {
          return (
            <Popover.Button key={item.text}>
              <DrawerItem
                element={item}
                selectedValue={selectedValue}
                onElementClick={onPinnedClick}
              />
            </Popover.Button>
          );
        } else {
          return (
            <DrawerItem
              key={item.text}
              element={item}
              selectedValue={selectedValue}
              onElementClick={onPinnedClick}
            />
          );
        }
      })} */}

      {elements.map((item) => {
        if (popover) {
          return (
            <div key={item.text}>
              <Popover.Button>
                <DrawerItem
                  element={item}
                  selectedValue={selectedValue}
                  onElementClick={onElementClick}
                />
              </Popover.Button>
              {item.subElements
                ? item.subElements.map((subItem) => {
                    if (subItem.visibleKey === pin) {
                      return (
                        <div key={subItem.text}>
                          <Popover.Button>
                            <DrawerItem
                              element={subItem}
                              selectedValue={selectedValue}
                              onElementClick={onElementClick}
                            />
                          </Popover.Button>
                        </div>
                      );
                    }
                  })
                : null}
            </div>
          );
        } else {
          return (
            <div key={item.text}>
              <DrawerItem
                element={item}
                selectedValue={selectedValue}
                onElementClick={onElementClick}
              />
              {item.subElements
                ? item.subElements.map((subItem) => {
                    if (subItem.visibleKey === pin)
                      return (
                        <DrawerItem
                          key={subItem.text}
                          element={subItem}
                          selectedValue={selectedValue}
                          onElementClick={onElementClick}
                        />
                      );
                  })
                : null}
            </div>
          );
        }
      })}

      <div className="p-10 bg-white">
        <p className="text-white text-7xl text-center">SB</p>
      </div>
    </div>
  );
};

export default MainDrawer;
