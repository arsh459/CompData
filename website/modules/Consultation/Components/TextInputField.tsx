import { InputAdornment, TextField, TextFieldProps } from "@mui/material";
import { CSSProperties } from "react";
import clsx from "clsx";

export interface TextInputFieldProps {
  label?: string;
  lableStyle?: CSSProperties;
  startAdornmentText?: string;
}

const TextInputField: React.FC<TextFieldProps & TextInputFieldProps> = (
  props
): JSX.Element => {
  const { label, lableStyle, startAdornmentText, ...restProps } = props;

  return (
    <div className="flex-1 flex flex-col">
      {label ? (
        <p
          style={{
            ...lableStyle,
            flex: lableStyle?.flex || 1,
            color: lableStyle?.color || "rgba(0, 0, 0, 0.70)",
            fontFamily: lableStyle?.fontFamily || "Poppins-Medium",
            fontSize: lableStyle?.fontSize || 14,
            paddingInline: lableStyle?.paddingInline || 8,
            paddingBottom: lableStyle?.paddingBottom || 8,
          }}
        >
          {label}
        </p>
      ) : null}
      <TextField
        {...restProps}
        style={{ ...restProps.style, flex: restProps.style?.flex || 1 }}
        InputProps={{
          style: {
            ...restProps.InputProps?.style,
            borderRadius: restProps.InputProps?.style?.borderRadius || "12px",
            backgroundColor:
              restProps.InputProps?.style?.backgroundColor ||
              "rgba(255, 255, 255, 0.25)",
            fontSize: restProps.InputProps?.style?.fontSize || 16,
          },
          startAdornment: restProps.InputProps?.startAdornment || (
            <InputAdornment position="start">
              <p style={{ color: "rgba(0, 0, 0, 0.80)" }}>
                {startAdornmentText}
              </p>
            </InputAdornment>
          ),
        }}
        className={clsx(restProps.className, "TextInputField")}
      />
    </div>
  );
};

export default TextInputField;
