import Markdown from "react-native-markdown-display";
import { StyleSheet } from "react-native";
const MarkdownWrapper: React.FC<{
  children: string;
  style: StyleSheet.NamedStyles<any>;
}> = ({ children, style }) => {
  return (
    // @ts-ignore
    <Markdown style={style}>{children}</Markdown>
  );
};

export const markdownStylesAssistant: StyleSheet.NamedStyles<any> = {
  body: {
    color: "#232136",
    fontSize: 14,
    textAlign: "left",
  },
};
export const markdownStylesUser: StyleSheet.NamedStyles<any> = {
  body: {
    color: "#232136",
    fontSize: 14,
    textAlign: "right",
  },
};
export const markdownStylesGeneral: StyleSheet.NamedStyles<any> = {
  body: {
    color: "#ffffff",
    fontSize: 12,
    textAlign: "center",
  },
};

export default MarkdownWrapper;
