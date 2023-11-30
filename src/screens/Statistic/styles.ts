import theme from "@theme/index";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.brand.green_light,
    paddingTop: 56,
  },
  header: {
    paddingHorizontal: 24
  },
  card: {
    width: '100%',
    alignItems: 'center',
    padding: 20,
    borderRadius: 8,
    gap: 2,
    paddingBottom: 32,
  },
  section: {
    flex: 1,
    backgroundColor: theme.colors.base.gray_700,
    paddingHorizontal: 24,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    alignItems: 'center',
    shadowColor: theme.colors.base.gray_100,
    shadowOpacity: 0.1,
    shadowRadius: 30,
  },
  bento: {
    width: '100%',
    gap: 12,
  }
});