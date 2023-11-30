import { useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigatorRoutesProp } from "@routes/app.routes";
import { Image, Text, View } from "react-native";
import { styles } from "./styles";
import { Button } from "@components/Button";
import theme from "@theme/index";

type RouteParamsProps = {
  isOnDiet: boolean;
};

export function Feedback() {
  const navigation = useNavigation<AppNavigatorRoutesProp>();
  const route = useRoute();

  const { isOnDiet } = route.params as RouteParamsProps;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text 
          style={
            [styles.title,
            { 
              color: isOnDiet ?
                theme.colors.brand.green_dark :
                theme.colors.brand.red_dark
            }]
          }
        >
          { isOnDiet ? 'Continue assim!' : 'Que pena!'}
        </Text> 

        { isOnDiet ? (
          <Text style={styles.text}>
            Você continua <Text style={styles.bold}>dentro da dieta</Text>. Muito bem!
          </Text>
        ) : (
          <Text style={styles.text}>
            Você <Text style={styles.bold}>saiu da dieta</Text> dessa vez, mas continue se esforçando e não desista!
          </Text>
        )} 
        
      </View>

      <Image source={isOnDiet ? require('@assets/happy.png') : require('@assets/sad.png')} />


      <Button onPress={() => navigation.navigate('home')}>
        <Text
          style={{
            fontFamily: theme.font_family.bold,
            fontSize: theme.font_size.body.sm,
            color: theme.colors.base.white
          }}
        >Ir para a página inicial</Text>
      </Button>
    </View> 
  )
}