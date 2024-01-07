import { ChevronLeftIcon } from "@heroicons/react/solid";
import { format } from "date-fns";
import { useRouter } from "next/router";

const curr = new Date();

const ConsultationHeader = () => {
  const router = useRouter();
  const goBack = () => {
    router.back();
  };

  return (
    <div className="flex flex-1 items-center justify-between py-4">
      <div onClick={goBack} className="cursor-pointer">
        <ChevronLeftIcon className="w-8 h-8" color="#23262F" />
      </div>

      <p className="text-[#23262F] text-base font-popSB flex-1 px-4 md:text-center">
        Health Report
      </p>

      <p className="text-[#23262F]/70 text-end text-sm font-popM">
        {format(curr, "do MMMM yyyy")}
      </p>
    </div>
  );
};

export default ConsultationHeader;
