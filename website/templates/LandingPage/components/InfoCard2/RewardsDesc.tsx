import clsx from "clsx";

interface Props {
  text: string;
  size: "lg" | "md";
}

const RewardsDesc: React.FC<Props> = ({ text, size }) => {
  return (
    <div className=" relative">
      <p
        className={clsx(
          size === "lg" ? "text-2xl" : "text-xl",
          "font-mont text-white  pt-0 pb-2 text-center"
        )}
      >
        You Won
      </p>
      {[1, 2, 3, 4].map((item) => {
        return (
          <div key={`txt-${item}`}>
            <p
              className={clsx(
                size === "lg" ? "text-3xl leading-7" : "text-2xl leading-6",
                "font-montL  text-white",
                item === 1
                  ? "opacity-80"
                  : item === 2
                  ? "opacity-50"
                  : item === 3
                  ? "opacity-25"
                  : "opacity-5"
              )}
            >
              {text}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default RewardsDesc;
