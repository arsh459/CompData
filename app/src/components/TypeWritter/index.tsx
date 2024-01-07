import { useRef, useState, useEffect } from "react";
import { Text } from "react-native";

interface Props {
  textArr: string[];
  textColor?: string;
  fontSize?: number;
}

type directionTypes = "forword" | "backword" | "next";

type timeoutTypes = {
  cursorTimeout?: NodeJS.Timeout; //number;
  typingTimeout?: NodeJS.Timeout; //number;
};

const TypeWritter: React.FC<Props> = ({ textArr, textColor, fontSize }) => {
  const arrLenth: number = textArr.length;
  const [text, setText] = useState<string>("");
  const [direction, setDirection] = useState<directionTypes>("forword");
  const [cursorColor, setCursorColor] = useState<string>("transparent");
  const [messageIndex, setMessageIndex] = useState<number>(0);
  const [textIndex, setTextIndex] = useState<number>(0);
  const [timeouts, setTimeouts] = useState<timeoutTypes>({});

  const textRef = useRef(text);
  textRef.current = text;

  const directionRef = useRef(direction);
  directionRef.current = direction;

  const cursorColorRef = useRef(cursorColor);
  cursorColorRef.current = cursorColor;

  const messageIndexRef = useRef(messageIndex);
  messageIndexRef.current = messageIndex;

  const textIndexRef = useRef(textIndex);
  textIndexRef.current = textIndex;

  const timeoutsRef = useRef(timeouts);
  timeoutsRef.current = timeouts;

  const typingAnimation = () => {
    const updatedTimeouts = { ...timeoutsRef.current };
    if (directionRef.current === "forword") {
      if (textIndexRef.current < textArr[messageIndexRef.current].length) {
        setText(
          textRef.current +
            textArr[messageIndexRef.current].charAt(textIndexRef.current)
        );
        setTextIndex(textIndexRef.current + 1);
        updatedTimeouts.typingTimeout = setTimeout(typingAnimation, 150);
      } else {
        setDirection("backword");
        updatedTimeouts.typingTimeout = setTimeout(typingAnimation, 500);
      }
    } else if (directionRef.current === "backword") {
      if (textIndexRef.current > 0) {
        setText(textRef.current.substring(0, textIndexRef.current - 1));
        setTextIndex(textIndexRef.current - 1);
        updatedTimeouts.typingTimeout = setTimeout(typingAnimation, 150);
      } else {
        setDirection("next");
        updatedTimeouts.typingTimeout = setTimeout(typingAnimation, 500);
      }
    } else {
      setMessageIndex((messageIndexRef.current + 1) % arrLenth);
      setTextIndex(0);
      setDirection("forword");
      updatedTimeouts.typingTimeout = setTimeout(typingAnimation, 500);
    }
    setTimeouts(updatedTimeouts);
  };

  const cursorAnimation = () => {
    if (cursorColorRef.current === "transparent") {
      setCursorColor(textColor ? textColor : "#000000");
    } else {
      setCursorColor("transparent");
    }
  };

  useEffect(() => {
    const updatedTimeouts = { ...timeoutsRef.current };
    updatedTimeouts.typingTimeout = setTimeout(typingAnimation, 500);
    updatedTimeouts.cursorTimeout = setInterval(cursorAnimation, 250);
    setTimeouts(updatedTimeouts);

    return () => {
      clearTimeout(timeoutsRef.current.typingTimeout);
      clearInterval(timeoutsRef.current.cursorTimeout);
    };
  }, []);

  return (
    <Text
      style={{
        color: textColor ? textColor : "#000000",
        fontSize: fontSize ? fontSize : 16,
      }}
    >
      {text}
      <Text
        style={{ color: cursorColor, fontSize: (fontSize ? fontSize : 16) + 4 }}
      >
        |
      </Text>
    </Text>
  );
};

export default TypeWritter;
