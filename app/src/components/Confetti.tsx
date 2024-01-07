import { memo, useEffect, useState } from "react";
import { Dimensions, View } from "react-native";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import {
  Canvas,
  Group,
  RoundedRect,
  runTiming,
  Skia,
  useComputedValue,
  useValue,
  vec,
} from "@shopify/react-native-skia";
import { processTransform3d, toMatrix3 } from "react-native-redash";

const CONFETTI_WIDTH = 20;
const CONFETTI_HEIGHT = 10;
const NUM_OF_CONFETTI = 40;
const ANIMATE_DURATION = 5000;

const colors = ["#6F97FF", "#9A4AFF"];

const { height, width } = Dimensions.get("window");

const relativeSin = (yPosition: number) =>
  Math.sin((yPosition - 300) * (Math.PI / 360));

interface ConfettiPieceProps {
  offsetId: string;
  startingXOffset: number;
  startingYOffset: number;
  color: string;
}

const ConfettiPiece: React.FC<ConfettiPieceProps> = ({
  startingXOffset,
  startingYOffset,
  color,
}) => {
  const seed = Math.random() * 4;

  const centerY = useValue(0);
  const yPosition = useValue(startingYOffset);

  const origin = useComputedValue(() => {
    centerY.current = yPosition.current + CONFETTI_HEIGHT / 2;
    const centerX = startingXOffset + CONFETTI_WIDTH / 2;
    return vec(centerX, centerY.current);
  }, [yPosition]);

  runTiming(yPosition, height + 200, {
    duration: ANIMATE_DURATION,
  });

  const matrix = useComputedValue(() => {
    const rotateZ = relativeSin(yPosition.current) * seed;
    const rotateY = relativeSin(yPosition.current) * seed;
    const rotateX = relativeSin(yPosition.current) * seed;
    const mat3 = toMatrix3(
      processTransform3d([
        { rotateY: rotateY },
        { rotateX: rotateX },
        { rotateZ: rotateZ },
        { skewY: 1 },
      ])
    );

    return Skia.Matrix(mat3);
  }, [yPosition]);

  return (
    <Group matrix={matrix} origin={origin}>
      <RoundedRect
        r={0}
        x={startingXOffset}
        y={yPosition}
        height={CONFETTI_WIDTH}
        width={CONFETTI_HEIGHT}
        color={color}
      />
    </Group>
  );
};

interface Props {
  customColor?: string[];
  callback?: () => void;
  hideDefaultColors?: boolean;
}

const Confetti: React.FC<Props> = ({
  customColor,
  callback,
  hideDefaultColors,
}) => {
  const [confettiPieces, setConfettiPieces] = useState<ConfettiPieceProps[]>(
    []
  );
  const targetColors = customColor
    ? hideDefaultColors
      ? customColor
      : [...colors, ...customColor]
    : colors;

  useEffect(() => {
    const pieces: ConfettiPieceProps[] = [];

    for (let i = 0; i < NUM_OF_CONFETTI; i++) {
      const color =
        targetColors[Math.round(Math.random() * (targetColors.length - 1))];
      const startingXOffset = Math.round(Math.random() * width);
      const startingYOffset = -Math.round(Math.random() * height);
      const id = uuidv4() + "";
      pieces.push({ offsetId: id, startingXOffset, startingYOffset, color });
    }

    setConfettiPieces(pieces);

    callback && setTimeout(callback, ANIMATE_DURATION);
  }, [customColor, callback]);

  return (
    <View
      className="absolute left-0 right-0 top-0 bottom-0 z-10"
      pointerEvents="none"
    >
      <Canvas style={{ flex: 1 }}>
        {confettiPieces.map((confettiPieceProps: ConfettiPieceProps) => {
          return (
            <ConfettiPiece
              key={confettiPieceProps.offsetId}
              {...confettiPieceProps}
            />
          );
        })}
      </Canvas>
    </View>
  );
};

export default memo(Confetti);
