import clsx from "clsx";

interface Props {
  heading: string;
  text: string;
  img?: string;
  selected: boolean;
  paddingString?: string;
  roundedString?: string;
}

const ImgButton: React.FC<Props> = ({
  heading,
  text,
  img,
  selected,
  paddingString,
  roundedString,
}) => {
  return (
    <div
      className={clsx(
        selected ? "border-blue-500" : "",
        "border-2  shadow-md",
        paddingString ? paddingString : "p-4",
        roundedString ? roundedString : "rounded-xl"
      )}
    >
      <div>
        <p>{heading}</p>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default ImgButton;
