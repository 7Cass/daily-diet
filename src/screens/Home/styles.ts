import theme from "@theme/index";
import { StyleSheet } from "react-native";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  padding-right: 24;
  padding-left: 24;
  padding-top: 64;
  gap: 32;
  background-color: ${({ theme }) => theme.colors.base.gray_700};
  align-items: center;
`;

export const Section = styled.View`
  flex: 1;
  width: 100%;
  justify-content: flex-start;
`;

export const styles = StyleSheet.create({
  card: {
    width: '100%',
    alignItems: 'center',
    padding: 20,
    borderRadius: 8,
    gap: 2
  },
  icon: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  sectionTitle: {
    fontSize: 16,
    paddingBottom: 8
  },
  buttonContent: {
    color: theme.colors.base.white,
    fontFamily: theme.font_family.bold,
    fontSize: theme.font_size.body.sm
  }
});

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.base.gray_100};
  font-size: ${({ theme }) => theme.font_size.body.lg};
  font-family: ${({ theme }) => theme.font_family.bold};
`;

export const Text = styled.Text`
  color: ${({ theme }) => theme.colors.base.gray_200};
`;