import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';
import { Feedback } from '@screens/Feedback';
import { Home } from '@screens/Home';
import { Meal } from '@screens/Meal';
import { NewMeal } from '@screens/NewMeal';
import { Statistic } from '@screens/Statistic';
import { UpdateMeal } from '@screens/UpdateMeal';

type AppRoutes = {
  home: undefined
  statistic: undefined
  register: undefined
  feedback: { isOnDiet  : boolean }
  meal: { id: string }
  update: { id: string }
};

export type AppNavigatorRoutesProp = NativeStackNavigationProp<AppRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AppRoutes>();

export function AppRoutes() {
  return (
    <Navigator 
      screenOptions={{
        headerShown: false
      }}
    >
      <Screen name="home" component={Home}/>
      <Screen name="statistic" component={Statistic}/>
      <Screen name="register" component={NewMeal}/>
      <Screen name="feedback" component={Feedback}/>
      <Screen name="meal" component={Meal}/>
      <Screen name="update" component={UpdateMeal}/>
    </Navigator>
  )
}