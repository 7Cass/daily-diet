import { useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigatorRoutesProp } from "@routes/app.routes";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { styles } from "./styles";
import { ArrowLeft, Pencil, Trash } from "phosphor-react-native";
import theme from "@theme/index";
import { Button } from "@components/Button";
import { useEffect, useState } from "react";
import { Modal } from "@components/Modal";
import { useMeal } from "@hooks/useMeal";
import { MealDTO } from "@dtos/Meal";
import formatDateAndHour from "@utils/formatDateAndHour";

type RouteParamsProps = {
  id: string;
};

export function Meal() {
  const [isOpen, setIsOpen] = useState(false);
  const [meal, setMeal] = useState<MealDTO>({} as MealDTO);
  const route = useRoute();
  const navigation = useNavigation<AppNavigatorRoutesProp>();
  const { findMealById, deleteMealById, meals } = useMeal();
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
    deleteMealById(mealId);
    handleToggleModal();
    navigation.goBack();
  }

  useEffect(() => {
    const meal = findMealById(id) as MealDTO;
    setMeal(meal);
  }, [meals]);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: meal.onDiet ? theme.colors.brand.green_light : theme.colors.brand.red_light }
      ]}
    >
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
            >{meal.name}</Text>
            <Text
              style={{ fontSize: 16 }}
            >{meal.description}</Text>
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
            >{formatDateAndHour(meal.date, meal.hour, 'às')}</Text>
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
            <View style={{ backgroundColor: meal.onDiet ? theme.colors.brand.green_dark : theme.colors.brand.red_dark, width: 8, height: 8, borderRadius: 9999  }} />
            <Text>{ meal.onDiet ? 'dentro da dieta' : 'fora da dieta' }</Text>
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