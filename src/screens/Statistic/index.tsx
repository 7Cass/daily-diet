import { Pressable, Text, View } from "react-native";
import { styles } from "./styles";
import { ArrowLeft } from "phosphor-react-native";
import theme from "@theme/index";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProp } from "@routes/app.routes";

export function Statistic() {
  const navigation = useNavigation<AppNavigatorRoutesProp>();

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={handleGoBack}>
          <ArrowLeft color={theme.colors.brand.green_dark} />
        </Pressable>
        <View style={styles.card}>
            <Text
              style={{
                fontFamily: theme.font_family.bold,
                fontSize: theme.font_size.body.lg,
                color: theme.colors.base.gray_100
              }}
            >90,86%</Text>
            <Text
              style={{
                fontSize: theme.font_size.body.sm,
                color: theme.colors.base.gray_200
              }}
            >das refeições dentro da dieta</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text
          style={{
            paddingVertical: 24,
            fontFamily: theme.font_family.bold,
            fontSize: theme.font_size.body.sm,
          }}
        >Estatísticas gerais</Text>

        <View style={styles.bento}>
          <View
            style={{
              backgroundColor: theme.colors.base.gray_600,
              gap: 8,
              padding: 16,
              borderRadius: 8,
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontFamily: theme.font_family.bold,
                fontSize: theme.font_size.body.md,
                color: theme.colors.base.gray_100
              }}
            >22</Text>
            <Text
              style={{
                fontSize: theme.font_size.body.sm,
                color: theme.colors.base.gray_200
              }}
            >melhor sequencia de pratos dentro da dieta</Text>
          </View>

          <View
            style={{
              backgroundColor: theme.colors.base.gray_600,
              gap: 8,
              padding: 16,
              borderRadius: 8,
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontFamily: theme.font_family.bold,
                fontSize: theme.font_size.body.md,
                color: theme.colors.base.gray_100
              }}
            >109</Text>
            <Text
              style={{
                fontSize: theme.font_size.body.sm,
                color: theme.colors.base.gray_200
              }}
            >refeições registradas</Text>
          </View>
          <View
            style={{
                flexDirection: 'row',
                gap: 12
            }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: theme.colors.brand.green_light,
                gap: 8,
                padding: 16,
                borderRadius: 8,
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontFamily: theme.font_family.bold,
                  fontSize: theme.font_size.body.md,
                  color: theme.colors.base.gray_100
                }}
              >99</Text>
              <Text
                style={{
                  fontSize: theme.font_size.body.sm,
                  color: theme.colors.base.gray_200,
                  textAlign: 'center'
                }}
              >refeições dentro da dieta</Text>
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: theme.colors.brand.red_light,
                gap: 8,
                padding: 16,
                borderRadius: 8,
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontFamily: theme.font_family.bold,
                  fontSize: theme.font_size.body.md,
                  color: theme.colors.base.gray_100,
                }}
              >10</Text>
              <Text
                style={{
                  fontSize: theme.font_size.body.sm,
                  color: theme.colors.base.gray_200,
                  textAlign: 'center'
                }}
              >pratos fora da dieta</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}