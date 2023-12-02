import { Alert, Pressable, Text, View } from "react-native";
import { styles } from "./styles";
import { ArrowLeft } from "phosphor-react-native";
import theme from "@theme/index";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigatorRoutesProp } from "@routes/app.routes";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { useEffect, useState } from "react";
import { useMeal } from "@hooks/useMeal";
import { MealDTO } from "@dtos/Meal";

type RouteParamsProps = {
  id: string;
};

type FormDataProps = {
  name: string;
  description: string;
  date: string;
  hour: string;
  onDiet?: boolean;
};

const createMealSchema = yup.object({
  name: yup.string().required("Campo obrigatório."),
  description: yup.string().required("Campo obrigatório"),
  date: yup.string().required("Campo obrigatório"),
  hour: yup.string().required("Campo obrigatório"),
});


export function UpdateMeal() {
  const [meal, setMeal] = useState({} as MealDTO);
  const { control, handleSubmit, formState: { errors }, setValue } = useForm<FormDataProps>({
    resolver: yupResolver(createMealSchema),
  });

  const navigation = useNavigation<AppNavigatorRoutesProp>();
  const route = useRoute();
  const { id } = route.params as RouteParamsProps;
  const { findMealById, updateMealById } = useMeal();

  const [onDiet, setOnDiet] = useState<boolean | null>(null);

  function handleGoBack(): void {
    navigation.goBack();
  }

  function handleUpdateMeal(data: FormDataProps): void {
    updateMealById(id, {...data, onDiet: !!onDiet});
    navigation.navigate('meal', { id });
  }

  useEffect(() => {
    const meal = findMealById(id) as MealDTO;
    setMeal(meal);
    setOnDiet(meal.onDiet);
    if (meal) {
      setValue('name', meal.name);
      setValue('description', meal.description);
      setValue('date', meal.date);
      setValue('hour', meal.hour);
    }
  }, [])

  function toggleSelected(onDiet: boolean): void {
    setOnDiet(onDiet);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={{ position: 'absolute', top: 56, left: 24 }} onPress={handleGoBack}>
          <ArrowLeft color={theme.colors.base.gray_200} />
        </Pressable>
        <Text
          style={{
            fontFamily: theme.font_family.bold,
            fontSize: 18,
          }}
        >Editar refeição</Text>
      </View>
      <View style={styles.section}>

        <View style={{ flex: 1, gap: 24 }}>
          <Controller 
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <Input
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.name?.message}
                  label="Nome"
                  placeholder="Nome da refeição"
                  placeholderTextColor={theme.colors.base.gray_400}
                />
              )}
            />

            <Controller 
              control={control}
              name="description"
              render={({ field: { onChange, value } }) => (
                <Input
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.description?.message}
                  type="textarea"
                  multiline
                  numberOfLines={4}
                  label="Descrição"
                  placeholder="Descrição da refeição"
                  placeholderTextColor={theme.colors.base.gray_400}
                />
              )}
            />

            <View style={{ flexDirection: 'row', gap: 20 }}>
              <Controller 
                  control={control}
                  name="date"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      onChangeText={onChange}
                      value={value}
                      errorMessage={errors.date?.message}
                      customStyle={{ flex: 1 }}
                      label="Data"
                      placeholder="28/11/2023"
                      placeholderTextColor={theme.colors.base.gray_400}
                  />
                  )}
                />

              <Controller 
                control={control}
                name="hour"
                render={({ field: { onChange, value } }) => (
                  <Input
                    value={value}
                    onChangeText={onChange}
                    errorMessage={errors.hour?.message}
                    customStyle={{ flex: 1 }}
                    label="Hora"
                    placeholder="12:00"
                    placeholderTextColor={theme.colors.base.gray_400}
                />
                )}
              />
            </View>

            <Text
              style={{
                fontFamily: theme.font_family.bold,
                fontSize: theme.font_size.body.sm,
                color: theme.colors.base.gray_200
              }}
            >Está dentro da dieta?</Text>
            <View style={{ flexDirection: 'row', gap: 20 }}>
              <Pressable
                onPress={() => toggleSelected(true)}
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  padding: 16,
                  borderRadius: 6,
                  borderColor: onDiet ? theme.colors.brand.green_dark : 'transparent',
                  borderWidth: 1,
                  backgroundColor: onDiet ? theme.colors.brand.green_light : theme.colors.base.gray_600,
                }}
              >
                <View style={{
                  height: 8,
                  width: 8,
                  backgroundColor: theme.colors.brand.green_dark,
                  borderRadius: 9999
                  }}
                />
                <Text
                  style={{
                    color: theme.colors.base.gray_200,
                    fontSize: theme.font_size.body.sm,
                    fontFamily: theme.font_family.bold
                  }}
                >Sim</Text>
              </Pressable>
              <Pressable
                onPress={() => toggleSelected(false)}
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  padding: 16,
                  borderRadius: 6,
                  borderColor: !onDiet && onDiet !== null ? theme.colors.brand.red_dark : 'transparent',
                  borderWidth: 1,
                  backgroundColor: !onDiet && onDiet !== null ? theme.colors.brand.red_light : theme.colors.base.gray_600,
                }}
              >
                <View style={{
                  height: 8,
                  width: 8,
                  backgroundColor: theme.colors.brand.red_dark,
                  borderRadius: 9999
                  }}
                />
                <Text
                  style={{
                    color: theme.colors.base.gray_200,
                    fontSize: theme.font_size.body.sm,
                    fontFamily: theme.font_family.bold
                  }}
                >Não</Text>
              </Pressable>
            </View>
        </View>

        <Button onPress={handleSubmit(handleUpdateMeal)}>
          <Text 
            style={{
              fontFamily: theme.font_family.bold,
              fontSize: theme.font_size.body.sm,
              color: theme.colors.base.white
            }}
          >Salvar Alterações</Text>
        </Button>
      </View>
    </View>
  )
}