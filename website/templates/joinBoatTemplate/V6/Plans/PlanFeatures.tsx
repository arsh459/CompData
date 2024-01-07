import { listCardV2 } from "@templates/joinBoatTemplate/utils";

const PlanFeatures = () => {
  return (
    <div className="mx-4 py-12">
      <h1 className="text-white font-nunitoSB text-xl my-6">
        What will I Get?
      </h1>
      {listCardV2.map((plan, index) => (
        <div
          key={`${plan.heading}-${index}`}
          className="w-full flex items-center pb-4"
        >
          <img
            src={plan?.iconUri}
            className="w-1/6 aspect-1 rounded-full"
            alt={plan.heading}
          />

          <div className="w-4 aspect-1" />

          <div className="flex-1 flex flex-col">
            <h6 className="text-base font-popM pb-2">{plan.heading}</h6>

            <p className="text-xs text-white/70 font-popL">{plan.mainText}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlanFeatures;
