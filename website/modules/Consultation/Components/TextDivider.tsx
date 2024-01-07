interface Props {
  text?: string;
  textColor?: string;
  dividerColor?: string;
}

const TextDivider: React.FC<Props> = ({ text, textColor, dividerColor }) => {
  return (
    <div className="flex items-center gap-4">
      {text ? (
        <span
          className="font-popM text-sm"
          style={{ color: textColor || "#000000" }}
        >
          {text}
        </span>
      ) : null}
      <div
        className="flex-1 h-px"
        style={{ backgroundColor: dividerColor || "rgba(0, 0, 0, 0.10)" }}
      />
    </div>
  );
};

export default TextDivider;
