import { Container } from "./styles";
import { Image } from 'react-native';

import Logo from '@assets/logo.svg';
import theme from "@theme/index";

export function Header() {
  return (
    <Container>
      <Logo />
      <Image
        width={40}
        height={40}
        source={{ uri: 'https://github.com/7cass.png' }}
        style={{
          borderRadius: 9999,
          borderColor: theme.colors.base.gray_200,
          borderWidth: 2
        }}
      />
    </Container>
  )
}