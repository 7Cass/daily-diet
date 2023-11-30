import { Pressable, ScrollView, Text, View } from "react-native";
import { styles } from "./styles";
import { ArrowLeft } from "phosphor-react-native";
import theme from "@theme/index";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProp } from "@routes/app.routes";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";

type FormDataProps = {
  name: string;
  description: string;
  date: string;
  hour: string;
  isOnDiet?: boolean;
};

const createMealSchema = yup.object({
  name: yup.string().required("Campo obrigatório."),
  description: yup.string().required("Campo obrigatório"),
  date: yup.string().required("Campo obrigatório"),
  hour: yup.string().required("Campo obrigatório"),
});

export function NewMeal() {
  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(createMealSchema)
  });

  const navigation = useNavigation<AppNavigatorRoutesProp>();

  const [isOnDiet, setIsOnDiet] = useState<boolean | null>(null);

  function handleGoBack(): void {
    navigation.goBack();
  }

  function handleCreateNewMeal(data: FormDataProps): void {
    try {
      data.isOnDiet = !!isOnDiet;
      navigation.navigate('feedback', { isOnDiet: !!isOnDiet });
    } catch (error) {
      // @Todo: Handle errors when api is implemented
    }
  }

  function toggleSelected(onDiet: boolean): void {
    setIsOnDiet(onDiet);
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
        >Nova refeição</Text>
      </View>
      <View style={styles.section}>

        <View style={{ flex: 1, gap: 24 }}>
          <Controller 
              control={control}
              name="name"
              render={({ field: { onChange } }) => (
                <Input
                  onChangeText={onChange}
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
              render={({ field: { onChange } }) => (
                <Input
                  onChangeText={onChange}
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
                  render={({ field: { onChange } }) => (
                    <Input
                      onChangeText={onChange}
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
                render={({ field: { onChange } }) => (
                  <Input
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
                  borderColor: isOnDiet ? theme.colors.brand.green_dark : 'transparent',
                  borderWidth: 1,
                  backgroundColor: isOnDiet ? theme.colors.brand.green_light : theme.colors.base.gray_600,
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
                  borderColor: !isOnDiet && isOnDiet !== null ? theme.colors.brand.red_dark : 'transparent',
                  borderWidth: 1,
                  backgroundColor: !isOnDiet && isOnDiet !== null ? theme.colors.brand.red_light : theme.colors.base.gray_600,
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

        <Button onPress={handleSubmit(handleCreateNewMeal)}>
          <Text 
            style={{
              fontFamily: theme.font_family.bold,
              fontSize: theme.font_size.body.sm,
              color: theme.colors.base.white
            }}
          >Cadastrar Refeição</Text>
        </Button>
      </View>
    </View>
  )
}