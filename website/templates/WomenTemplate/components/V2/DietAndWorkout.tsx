// import MediaCard from "@components/MediaCard";
import { DietAndWorkoutType } from "@templates/DietAndWorkout";
import { FlameWaveBgV2 } from "./FlameWaveBg";

const data = [
  {
    id: "1",
    img: "https://ik.imagekit.io/socialboat/tr:h-400,c-maintain_ratio,fo-auto/unsplash_4_jhDO54BYg_YdB1jUCiV.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676882132799",
    text: "Customised diet plan",
  },
  {
    id: "2",
    img: "https://ik.imagekit.io/socialboat/tr:h-400,c-maintain_ratio,fo-auto/398-posts_1_VJ8naqD4u.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676882132189",
    text: "Interactive Live Workouts",
  },
  {
    id: "3",
    img: "https://ik.imagekit.io/socialboat/tr:h-400,c-maintain_ratio,fo-auto/shutterstock_318286301-1080x675_1_H_4JFCf_m.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676882132190",
    text: "24x7 Health Coach",
  },
];

interface Props {
  dietAndWorkout?: DietAndWorkoutType[];
}

const DietAndWorkout: React.FC<Props> = ({ dietAndWorkout }) => {
  return (
    <div className="w-full relative z-0">
      <div className="w-full max-w-screen-lg mx-auto h-screen flex flex-col justify-center items-center p-5">
        <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl  font-nunitoSB">
          A diet & workout regime to make you{" "}
          <span className="text-[#FF33A1] font-nunitoEB">Healthier</span>
        </h2>
        <div className="w-full grid lg:grid-flow-col auto-cols-fr gap-5 py-8">
          {(dietAndWorkout || data).map((each, index) => (
            <div key={each.id} className="flex lg:flex-col items-center gap-5">
              {typeof each.img === "string" ? (
                <img
                  src={each.img}
                  alt={each.text}
                  className="w-3/5 lg:w-full"
                />
              ) : (
                <img
                  src={`https://ik.imagekit.io/socialboat/tr:h-400,c-maintain_ratio/${each.img?.path}`}
                  // src={each.img?.url}
                  alt={each.text}
                  className="w-3/5 lg:w-full rounded-2xl"
                />
                // <MediaCard media={each.img} widthString="w-3/5 lg:w-full" />
              )}
              <h4 className="text-base sm:text-xl lg:text-2xl font-nunitoM">
                {each.text}
              </h4>
            </div>
          ))}
        </div>
      </div>
      <FlameWaveBgV2 clsStr="absolute left-0 right-0 bottom-0 lg:-bottom-12 object-contain -z-20 opacity-50" />
    </div>
  );
};

export default DietAndWorkout;
