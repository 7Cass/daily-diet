import { Header } from "@components/Header";
import { Container, Title, Text, Section, styles } from "./styles";
import { SectionList, TouchableOpacity, View } from "react-native";
import { ArrowUpRight, Circle, Plus } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProp } from "@routes/app.routes";
import { Button } from "@components/Button";
import theme from "@theme/index";
import { useState } from "react";
import { useMeal } from "@hooks/useMeal";
import CalculateDietPercentage from "@utils/calculateDietPercentage";

export function Home() {
  const { meals, dietPercentage } = useMeal();
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
        <TouchableOpacity
          onPress={handleOpenStatistic}
          style={[
            styles.card,
            { backgroundColor: dietPercentage >= 50 ? theme.colors.brand.green_light : theme.colors.brand.red_light }
          ]}
          >
            <Title>{dietPercentage}%</Title>
            <Text>das refeições dentro da dieta</Text>
            <ArrowUpRight
              color={dietPercentage >= 50 ? theme.colors.brand.green_dark : theme.colors.brand.red_dark}
              style={styles.icon}
            />
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
                <Text numberOfLines={1} style={{ flex: 1 }}>{item.name}</Text>
                <Circle size={18} weight="fill" color={item.onDiet ? theme.colors.brand.green_mid : theme.colors.brand.red_mid} />
              </TouchableOpacity>
            )}
            renderSectionHeader={({ section }) => (
              <View style={{ backgroundColor: theme.colors.base.gray_700, paddingTop: 32 }}>
                <Text style={{ fontSize: 18, fontFamily: theme.font_family.bold }}>{section.title}</Text>
              </View>
            )}
            ListEmptyComponent={() => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 48,
                }}
              >
                <Text
                  style={{
                    fontSize: theme.font_size.body.sm,
                    color: theme.colors.base.gray_300,
                    textAlign: 'center'
                  }}
                >Parece que você ainda não cadastrou nenhuma refeição.</Text>
              </View>
            )}
            contentContainerStyle={{ paddingBottom: 32 }}
            showsVerticalScrollIndicator={false}
          />
        </Section>
    </Container>
  )
}