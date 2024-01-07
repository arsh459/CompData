import { RegimeData } from "@templates/WomenTemplate/utils";
import RegimeCard from "./RegimeCard";

const Regime = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center ">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-popR text-center p-4 text-transparent bg-clip-text bg-gradient-to-br from-[#B269FF] via-[#E3C6FF] to-[#D45FFF]">
        Designed by Nutritionists, Trainers & Doctors
      </h2>
      <div className="w-full py-8 relative z-0 flex">
        <div className="mx-auto overflow-x-scroll scrollbar-hide grid grid-flow-col auto-cols-[250px] gap-6 px-6">
          {RegimeData.length > 4 ? <div className="hidden lg:block" /> : null}
          {RegimeData
            ? RegimeData.map((regime, index) => (
                <RegimeCard data={regime} key={`${regime.name}_${index}`} />
              ))
            : null}
          {RegimeData.length > 4 ? <div className="hidden lg:block" /> : null}
        </div>
      </div>
    </div>
  );
};

export default Regime;
