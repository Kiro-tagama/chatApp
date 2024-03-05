import { config } from '@gluestack-ui/config';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from './src/screens/Login';
import { Home } from './src/screens/Home';
import { Chat } from './src/screens/Chat';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <NavigationContainer>
        <Stack.Navigator >
          <Stack.Screen name="/" component={Login} />
          <Stack.Screen name="/Home" component={Home} />
          <Stack.Screen name="/Chat" component={Chat} />
        </Stack.Navigator>
      </NavigationContainer>
    </GluestackUIProvider>
  );
}

