import theme from "@theme/index";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 56,
    paddingBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    paddingHorizontal: 24,
    paddingVertical: 40,
    backgroundColor: theme.colors.base.gray_700,
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: theme.colors.base.gray_100,
    shadowOpacity: 0.1,
    shadowRadius: 30,
    justifyContent: 'space-between'
  },
  info: {
    gap: 24,
  }
});