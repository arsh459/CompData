import clsx from "clsx";

interface Props {}

const mediaIcons = [
  {
    name: "facebook",
    url: "https://firebasestorage.googleapis.com/v0/b/holidaying-prod.appspot.com/o/socialboat%2FFacebook-logo.png?alt=media&token=19f25e22-68cf-490e-858d-1079d83cbbfa",
  },
  {
    name: "YouTube",
    url: "https://firebasestorage.googleapis.com/v0/b/holidaying-prod.appspot.com/o/socialboat%2Fyoutube.png?alt=media&token=288c7976-8487-408c-8009-fb9f2237754b",
  },
  { name: "Save", url: "./images/download-outline.svg" },
];

const RecordingFooter: React.FC<Props> = ({}) => {
  return (
    <div className="bg-gray-50 shadow-xl p-2 pl-4 pr-4">
      <div className="flex">
        <p className="text-gray-700 font-semibold text-lg">Stream live to</p>
      </div>

      <div className="flex justify-around pt-1">
        {mediaIcons.map((item) => {
          return (
            <div
              key={item.name}
              className={clsx(
                "flex flex-col items-center",
                "cursor-pointer",
                "hover:-translate-y-0.5 transition-transform transform"
              )}
            >
              <img
                src={item.url}
                className="w-6 h-6 object-cover"
                alt={item.name}
              />
              <p className="text-gray-700 text-sm">{item.name}</p>
            </div>
          );
        })}
      </div>

      {/* <div className="flex justify-between">
        <p>Save</p>
        <p>Pause</p>
        <p>Finish</p>
      </div> */}
    </div>
  );
};

export default RecordingFooter;
