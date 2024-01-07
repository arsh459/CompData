import clsx from "clsx";
import Link from "next/link";

interface Props {
  onClick?: () => void;
  bgColor?: string;
  textColor?: string;
  textSize?: string;
  styleStr?: string;
  text: string;
  icon?: string;
  link?: string;
  width?: string;
}

const CTA: React.FC<Props> = ({
  onClick,
  bgColor,
  textColor,
  textSize,
  styleStr,
  text,
  icon,
  width,
  link,
}) => {
  return link ? (
    <Link
      href={link}
      // style={{ textDecoration: "none" }}
      passHref
    >
      <a>
        <button
          onClick={onClick}
          className={clsx(
            bgColor,
            textColor,
            textSize,
            width,
            "flex justify-center items-center py-3 px-4",
            styleStr ? styleStr : "font-bold font-baiSb rounded-md"
          )}
        >
          {icon ? (
            <img
              src={icon}
              alt="icon"
              className="h-6 aspect-1 object-contain mr-4"
            />
          ) : null}
          <span className="text-center">{text}</span>
        </button>
      </a>
    </Link>
  ) : (
    <button
      onClick={onClick}
      className={clsx(
        bgColor,
        textColor,
        textSize,
        width,
        "flex justify-center items-center py-3 px-4",
        styleStr ? styleStr : "font-bold font-baiSb rounded-md"
      )}
    >
      {icon ? (
        <img
          src={icon}
          alt="icon"
          className="h-6 aspect-1 object-contain mr-4"
        />
      ) : null}
      <span className="text-center">{text}</span>
    </button>
  );
};

export default CTA;
