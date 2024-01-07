import { Dispatch, SetStateAction, useState } from "react";
import { currency } from "../Plan";
import clsx from "clsx";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";

interface Props {
  currency: currency;
  setCurrency: Dispatch<SetStateAction<currency>>;
}

const CurrencyToggler: React.FC<Props> = ({ currency, setCurrency }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <Menu as="div" className="relative z-0 select-none sm:pb-2">
      <Menu.Items
        static
        className="focus:outline-none bg-white backdrop-blur rounded-lg"
      >
        <div
          className="py-1 flex justify-between mx-1 items-center cursor-pointer px-4"
          onClick={() => setIsDropdownOpen((p) => !p)}
        >
          <p className="truncate text-[#494949] text-sm sm:text-base font-nunitoM">
            {currency === "USD" ? "🇺🇸" : "🇮🇳" + " " + currency}
          </p>
          <div className="w-1 aspect-1" />
          <ChevronDownIcon
            className={clsx(
              "w-4 aspect-1 transition-all",
              isDropdownOpen ? "rotate-180" : "rotate-0"
            )}
            color="#000"
          />
        </div>
      </Menu.Items>

      <Transition
        show={isDropdownOpen}
        enter="transition duration-100"
        enterFrom="transform opacity-0 h-0"
        enterTo="transform opacity-100 h-max"
        leave="transition duration-100"
        leaveFrom="transform opacity-100 h-max"
        leaveTo="transform opacity-0 h-0"
        className="absolute left-0 right-0 top-0 -z-10 bg-white rounded-lg focus:outline-none"
      >
        <div className="opacity-0">
          <div className="h-7 sm:h-8" />
        </div>

        <Menu.Item>
          <p
            onClick={() => setCurrency("INR")}
            className={`whitespace-nowrap py-1 text-[#494949] text-sm px-4 text-center border-t font-nunitoM border-[#00000026] cursor-pointer`}
          >
            🇮🇳 INR
          </p>
        </Menu.Item>
        <Menu.Item>
          <p
            onClick={() => setCurrency("USD")}
            className={`whitespace-nowrap py-1 text-[#494949] text-sm text-center border-t font-nunitoM border-[#00000026] cursor-pointer`}
          >
            🇺🇸 USD
          </p>
        </Menu.Item>
      </Transition>
    </Menu>
  );
};

export default CurrencyToggler;
