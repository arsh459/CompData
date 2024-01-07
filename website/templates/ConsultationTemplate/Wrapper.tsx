import clsx from "clsx";

interface Props {
  color: string;
  selected: string;
  heading: string;
  classStr: string;
  paddingStr?: string;
}

const Wrapper: React.FC<Props> = ({
  children,
  color,
  selected,
  heading,
  classStr,
  paddingStr,
}) => {
  return (
    <div
      className={clsx(
        selected,
        classStr,
        "lg:block rounded-2xl overflow-hidden relative z-0"
      )}
    >
      <div
        className="absolute inset-0 -z-10 hidden lg:block"
        style={{ backgroundColor: `${color}1a` }}
      />
      <div
        className="px-4 py-2.5 font-popR text-base hidden lg:block"
        style={{ backgroundColor: `${color}26` }}
      >
        {heading}
      </div>
      <div className={paddingStr || "lg:p-4"}>{children}</div>
    </div>
  );
};

export default Wrapper;
