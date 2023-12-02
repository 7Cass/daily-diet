import { StatusBar } from 'expo-status-bar';
import { useFonts, NunitoSans_400Regular, NunitoSans_700Bold } from '@expo-google-fonts/nunito-sans';
import { SafeAreaView, View } from 'react-native';
import { ThemeProvider } from 'styled-components/native';

import theme from '@theme/index';
import { Loading } from '@components/Loading';
import { Routes } from '@routes/index';
import { MealContextProvider } from '@contexts/mealContext';

export default function App() {
  const [fontsLoaded] = useFonts({ NunitoSans_400Regular, NunitoSans_700Bold });

  return (
    <ThemeProvider theme={theme}>
      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.base.gray_700,
        }}
      >
        <StatusBar
          style="dark"
          backgroundColor="transparent"
          translucent
        />
        <MealContextProvider>
          { fontsLoaded ? <Routes /> : <Loading /> }
        </MealContextProvider>
      </View>
    </ThemeProvider>
  );
}
