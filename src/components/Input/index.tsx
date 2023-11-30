import { StyleProp, Text, TextInput, TextInputProps, View, ViewStyle } from 'react-native';
import { styles } from './styles';
import theme from '@theme/index';

type Props = TextInputProps & {
  label: string;
  type?: 'input' | 'textarea',
  errorMessage?: string | null;
  customStyle?: StyleProp<ViewStyle>;
}

export function Input({ errorMessage = null, type = 'input', label, customStyle = {}, ...rest }: Props ) {
  return (
    <View style={[styles.container, customStyle]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          {
            borderColor: errorMessage ? theme.colors.brand.red_mid : theme.colors.base.gray_500,
            height: type === 'textarea' ? 120 : 'auto',
            paddingTop: 14
          }
        ]}
        {...rest}
      /> 
    </View>
  )
}