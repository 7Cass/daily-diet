import { Text, View } from "react-native";
import { styles } from "./styles";
import { Button } from "@components/Button";
import theme from "@theme/index";

type Props = {
  content: string;
  dismissible: true;
  onDismiss: () => void;
  onDelete?: () => void;
} | {
  content: string;
  dismissible: false;
  onDismiss?: () => void;
  onDelete?: () => void;
};

export function Modal({ content, dismissible, onDelete, onDismiss }: Props) {

  return (
    <View style={styles.modal}>
      <View style={styles.container}>
        <Text
          style={{
            fontFamily: theme.font_family.bold,
            fontSize: 18,
            textAlign: 'center',
            color: theme.colors.base.gray_200
          }}
        >{content}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 12,
          }}
        >
          { dismissible && (
            <Button onPress={onDismiss} customStyle={{ flex: 1 }} variant="secondary">
              <Text
                style={{
                  fontFamily: theme.font_family.bold,
                  fontSize: 14,
                  color: theme.colors.base.gray_100
                }}
              >Cancelar</Text>
            </Button>
          )}
          <Button onPress={onDelete} customStyle={{ flex: 1 }}>
            <Text
              style={{
                fontFamily: theme.font_family.bold,
                fontSize: 14,
                color: theme.colors.base.white
              }}
            >Sim, excluir</Text>
          </Button>
        </View>
      </View>
    </View>
  )

}