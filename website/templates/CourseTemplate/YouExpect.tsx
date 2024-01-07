import MediaCard from "@components/MediaCard";
import { TextAndImgType } from "@models/Prizes/PrizeV2";

// const courseExpectation = [
//   {
//     icon: "https://ik.imagekit.io/socialboat/tr:w-200,c-maintain_ratio,fo-auto/Group_1203_EEl04ZTdn.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676099951069",
//     text: "Better Mood",
//   },
//   {
//     icon: "https://ik.imagekit.io/socialboat/tr:w-200,c-maintain_ratio,fo-auto/Group_1204_E5IkHlL1kv.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676099951000",
//     text: "Weight loss for PCOS",
//   },
//   {
//     icon: "https://ik.imagekit.io/socialboat/tr:w-200,c-maintain_ratio,fo-auto/Group_1185_gy2qdCzu8O.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676099951123",
//     text: "Regularise your Cycle",
//   },
//   {
//     icon: "https://ik.imagekit.io/socialboat/tr:w-200,c-maintain_ratio,fo-auto/Group_1206_PO7AXVB9G.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676099950717",
//     text: "Reduction in PCOS fatigue",
//   },
//   {
//     icon: "https://ik.imagekit.io/socialboat/tr:w-200,c-maintain_ratio,fo-auto/Group_1205_9r0rk6w2Ps.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676099950969",
//     text: "Sound Sleep",
//   },
// ];

interface Props {
  youExpect?: TextAndImgType[];
}

const YouExpect: React.FC<Props> = ({ youExpect }) => {
  return youExpect ? (
    <div className="w-screen h-screen max-w-screen-lg mx-auto flex flex-col justify-center items-center">
      <h2 className="w-full sm:text-center text-white text-3xl sm:text-4xl lg:text-5xl px-5 font-qsSB">
        What you can expect
      </h2>
      <div className="w-12 aspect-1" />
      <div className="w-full max-w-xl flex flex-col sm:flex-row sm:flex-wrap justify-center gap-5 px-5">
        {youExpect.map((each, index) => (
          <div
            key={`${each.text}-${index}`}
            className="sm:w-36 flex sm:flex-col items-center gap-4 sm:gap-2"
          >
            {/* <img
              src={each.icon}
              alt={each.text}
              className="w-20 sm:w-full aspect-1 object-contain"
            /> */}
            <MediaCard
              media={each.icon}
              HWClassStr="w-20 sm:w-full aspect-1"
              objectString="object-contain"
            />
            <p className="text-center text-base  text-white/80 font-popR">
              {each.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  ) : null;
};

export default YouExpect;
