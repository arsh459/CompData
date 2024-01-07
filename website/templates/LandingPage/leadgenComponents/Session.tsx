import { leadgenTypes } from "@constants/leadgen";

interface Props {
  leadgen: leadgenTypes;
}

const Session: React.FC<Props> = ({ leadgen }) => {
  return (
    <div className="w-full relative z-0 py-20">
      <div className="absolute left-0 right-0 top-0 -z-10 h-3/5 bg-[#2A2745]" />
      <div className="w-full sm:w-2/3 xl:w-1/2 max-w-screen-xl mx-auto px-4 flex flex-col justify-around items-center">
        <h2 className="text-4xl md:text-5xl font-bold text-center">
          {leadgen.session.title}
        </h2>
        <p className="text-sm md:text-lg text-center my-20 mt-10">
          {leadgen.session.subTitle}
        </p>
      </div>
      <div className="w-full aspect-2 max-h-[60%] max-w-screen-xl mx-auto px-4 flex justify-center">
        <iframe
          src={leadgen.session.youtubeLink}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Fat burner Game"
          className="h-full aspect-[1.78] mx-auto"
          // width={leadgen.session.width}
          // height={leadgen.session.height}
        />
      </div>
    </div>
  );
};

export default Session;
