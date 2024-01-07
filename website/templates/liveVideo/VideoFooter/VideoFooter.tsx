import clsx from "clsx";

interface Props {}

const footerButtons = [
  {
    text: "Join live",
    img: "https://firebasestorage.googleapis.com/v0/b/holidaying-prod.appspot.com/o/socialboat%2FraiseHand.png?alt=media&token=a8b4aaac-6135-4678-ae3b-e98665521914",
  },

  {
    text: "Share",
    img: "https://firebasestorage.googleapis.com/v0/b/holidaying-prod.appspot.com/o/socialboat%2Fpost.png?alt=media&token=6b93ef7b-27f6-4088-9d88-5d91d37c6854",
  },
];

const VideoFooter: React.FC<Props> = ({}) => {
  return (
    <div className="bg-gray-50 shadow-xl p-2 flex justify-around">
      {footerButtons.map((item) => {
        return (
          <div
            key={item.text}
            className={clsx(
              "flex items-center",
              "p-2 pl-4 pr-4 rounded-md shadow-xl",
              "cursor-pointer",
              "hover:-translate-y-0.5 transition-transform transform hover:shadow-2xl"
            )}
          >
            <img className="w-8 h-8 object-cover" src={item.img} />
            <p className="text-gray-700 font-semibold">{item.text}</p>
          </div>
        );
      })}
    </div>
  );
};

export default VideoFooter;
