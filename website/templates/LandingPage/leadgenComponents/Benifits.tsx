import { leadgenTypes } from "@constants/leadgen";

interface Props {
  leadgen: leadgenTypes;
}

const Benifits: React.FC<Props> = ({ leadgen }) => {
  return (
    <div className="w-full max-w-screen-xl mx-auto p-4 my-20">
      <h2 className="text-4xl md:text-5xl font-bold text-center">Benefits</h2>
      <div className="h-12" />
      <div className="grid md:grid-cols-2 auto-cols-fr auto-rows-fr gap-12 md:gap-20">
        {leadgen.benifits.map((benifit, index) => (
          <div key={`benifit-${index + 1}`}>
            <div className="flex">
              <img src={benifit.icon} alt={`benifit ${index + 1} image`} />
              <h5 className="text-base md:text-xl font-bold capitalize ml-4">{`${benifit.heading}`}</h5>
            </div>
            <div className="flex pt-3">
              <img
                src={benifit.icon}
                alt={`benifit ${index + 1} image`}
                className="opacity-0"
              />
              <p className="text-xs md:text-base ml-4">{benifit.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Benifits;
