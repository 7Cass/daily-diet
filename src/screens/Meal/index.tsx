import { useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigatorRoutesProp } from "@routes/app.routes";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { styles } from "./styles";
import { ArrowLeft, Pencil, Trash } from "phosphor-react-native";
import theme from "@theme/index";
import { Button } from "@components/Button";
import { useState } from "react";
import { Modal } from "@components/Modal";

type RouteParamsProps = {
  id: string;
};

export function Meal() {
  const [isOpen, setIsOpen] = useState(false);
  const route = useRoute();
  const navigation = useNavigation<AppNavigatorRoutesProp>();
  const { id } = route.params as RouteParamsProps;

  function handleGoBack() {
    navigation.goBack();
  }

  function handleToggleModal() {
    setIsOpen(!isOpen);
  }

  function handleUpdateMeal(mealId: string) {
    navigation.navigate('update', { id: mealId });
  }

  function handleDeleteMeal(mealId: string) {
    handleToggleModal();
  }

  return (
    <View style={styles.container}>
      { 
        isOpen && 
        <Modal
          dismissible
          content="Deseja realmente excluir o registro da refeição?"
          onDismiss={handleToggleModal}
          onDelete={() => handleDeleteMeal(id)}
        />
      }

      <View style={styles.header}>
        <Pressable style={{ position: 'absolute', top: 56, left: 24 }} onPress={handleGoBack}>
          <ArrowLeft color={theme.colors.base.gray_200} />
        </Pressable>
        <Text
          style={{
            fontFamily: theme.font_family.bold,
            fontSize: 18,
          }}
        >Refeição</Text>
      </View>
      <View style={styles.section}>
        <View style={styles.info}>
          <View style={{ gap: 8 }}>
            <Text
              style={{
                fontFamily: theme.font_family.bold,
                fontSize: 20
              }}
            >Comida</Text>
            <Text
              style={{ fontSize: 16 }}
            >Sanduíche de pão integral com atum e salada de alface e tomate</Text>
          </View>

          <View style={{ gap: 8 }}>
            <Text
              style={{
                fontFamily: theme.font_family.bold,
                fontSize: 14
              }}
            >Data e hora</Text>
            <Text
              style={{ fontSize: 16 }}
            >12/08/2022 às 16:00</Text>
          </View>

          <View
            style={{
              alignSelf: 'flex-start',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 9999,
              backgroundColor: theme.colors.base.gray_600,
              paddingHorizontal: 16,
              paddingVertical: 8,
              gap: 8
            }}
          >
            <View style={{ backgroundColor: theme.colors.brand.green_dark, width: 8, height: 8, borderRadius: 9999  }} />
            <Text>dentro da dieta</Text>
          </View>
        </View>
        <View style={{ gap: 8 }}>
          <Button onPress={() => handleUpdateMeal(id)} >
            <Pencil color={theme.colors.base.white} />
            <Text
              style={{
                fontFamily: theme.font_family.bold,
                fontSize: theme.font_size.body.sm,
                color: theme.colors.base.white
              }}
            >Editar refeição</Text>
          </Button>
          <Button onPress={handleToggleModal} variant="secondary">
            <Trash color={theme.colors.base.gray_100} />
            <Text
              style={{
                fontFamily: theme.font_family.bold,
                fontSize: theme.font_size.body.sm,
                color: theme.colors.base.gray_100
              }}
            >Excluir refeição</Text>
          </Button>
        </View>
      </View>
    </View>
  )
}