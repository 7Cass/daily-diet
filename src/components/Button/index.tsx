import { Plus } from "phosphor-react-native";
import { StyleProp, Text, TouchableOpacity, TouchableOpacityProps, ViewStyle } from "react-native";
import { styles } from "./styles";
import theme from "@theme/index";
import { ReactNode } from "react";

type Props = TouchableOpacityProps & {
  variant?: 'primary' | 'secondary';
  children: ReactNode;
  customStyle?: StyleProp<ViewStyle>;
};

export function Button({customStyle, variant = 'primary', children, ...rest}: Props) {
  return (
    <TouchableOpacity
      style={
        [styles.button,
        { 
          backgroundColor: variant === 'primary' ? theme.colors.base.gray_200 : theme.colors.base.gray_700,
          borderColor: variant === 'primary' ? 'transparent' : theme.colors.base.gray_100,
          borderWidth: 1,
        },
        customStyle]
      }
      {...rest}
    >
      {children}
    </TouchableOpacity>
  )
}