import theme from "@theme/index";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  modal: {
    zIndex: 10,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  container: {
    width: '100%',
    backgroundColor: theme.colors.base.gray_700,
    borderRadius: 8,
    padding: 24,
    gap: 32,
  }
});