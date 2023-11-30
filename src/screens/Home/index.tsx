import { Header } from "@components/Header";
import { Container, Title, Text, Section, styles } from "./styles";
import { SectionList, TouchableOpacity, View } from "react-native";
import { ArrowUpRight, Circle, Plus } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProp } from "@routes/app.routes";
import { Button } from "@components/Button";
import theme from "@theme/index";
import { useState } from "react";

type Meal = {
  id: string;
  hour: string;
  meal: string;
  onDiet: boolean;
};

export type MealHistory = {
  title: string;
  data: Meal[];
};

export function Home() {
  const [meals, setMeals] = useState<MealHistory[]>([
    { title: '12.08.22', data: [
      { id: '22b43b0b-7d57-4d36-9d14-0948f46b4a1e', hour: '20:00', meal: 'X-tudo', onDiet: false },
      { id: '22b43b0b-7d57-4d36-9d14-0948f46b4a2a', hour: '17:20', meal: 'Salada', onDiet: true },
      { id: '22b43b0b-7d57-4d36-9d14-0948f46b4a3b', hour: '09:30', meal: 'Whey Protein com leite', onDiet: true },
      { id: '22b43b0b-7d57-4d36-9d14-0948f46b4a4c', hour: '13:45', meal: 'Vitamina de banana', onDiet: true }
    ]},
    { title: '13.08.22', data: [
      { id: '22b43b0b-7d57-4d36-9d14-0948f46b4a5e', hour: '22:00', meal: 'X-tudo', onDiet: false },
      { id: '22b43b0b-7d57-4d36-9d14-0948f46b4a6i', hour: '19:00', meal: 'Batata Frita', onDiet: false },
      { id: '22b43b0b-7d57-4d36-9d14-0948f46b4a7o', hour: '10:30', meal: 'Nuggets', onDiet: false }
    ]}
  ]);
  const navigation = useNavigation<AppNavigatorRoutesProp>();

  function handleOpenStatistic() {
    navigation.navigate('statistic');
  }

  function handleGoToMeal(mealId: string) {
    navigation.navigate('meal', { id: mealId });
  }

  function handleCreateNewMeal() {
    navigation.navigate('register');
  }

  return (
    <Container>
      <Header />
        <TouchableOpacity onPress={handleOpenStatistic} style={styles.card}>
            <Title>90,86%</Title>
            <Text>das refeições dentro da dieta</Text>
            <ArrowUpRight style={styles.icon} />
        </TouchableOpacity>

        <Section>
          <Text style={styles.sectionTitle}>Refeições</Text>

          <Button onPress={handleCreateNewMeal}>
            <Plus size={18} color={theme.colors.base.white} />
            <Text style={styles.buttonContent}>Nova refeição</Text>
          </Button>

          <SectionList
            sections={meals}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item, separators }) => (
              <TouchableOpacity
                onPress={() => handleGoToMeal(item.id)}
                style={{ 
                  flexDirection: 'row',
                  gap: 12,
                  padding: 12,
                  marginVertical: 4,
                  borderColor: theme.colors.base.gray_500,
                  borderWidth: 1,
                  borderRadius: 6
                }}>
                <Text>{item.hour}</Text>
                <Text numberOfLines={1} style={{ flex: 1 }}>{item.meal}</Text>
                <Circle size={18} weight="fill" color={item.onDiet ? theme.colors.brand.green_mid : theme.colors.brand.red_mid} />
              </TouchableOpacity>
            )}
            renderSectionHeader={({ section }) => (
              <View style={{ backgroundColor: theme.colors.base.gray_700, paddingTop: 32 }}>
                <Text style={{ fontSize: 18, fontFamily: theme.font_family.bold }}>{section.title}</Text>
              </View>
            )}
            contentContainerStyle={{ paddingBottom: 32 }}
            showsVerticalScrollIndicator={false}
          />
        </Section>
    </Container>
  )
}