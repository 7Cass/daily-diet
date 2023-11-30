import theme from "@theme/index";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
  label: {
    fontFamily: theme.font_family.bold,
    fontSize: theme.font_size.body.sm,
    color: theme.colors.base.gray_200
  },
  input: {
    borderWidth: 1,
    padding: 14,
    borderRadius: 6
  }
});