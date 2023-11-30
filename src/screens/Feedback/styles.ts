import theme from "@theme/index";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.base.gray_700,
    paddingHorizontal: 24,
    paddingTop: 56,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 48
  },
  content: {
    gap: 8
  },
  title: {
   fontFamily: theme.font_family.bold,
   fontSize: theme.font_size.body.md,
   textAlign: 'center'
  },
  text: {
    color: theme.colors.base.gray_100,
    fontSize: 16,
    textAlign: 'center'
  },
  bold: {
    fontFamily: theme.font_family.bold,
  }
});