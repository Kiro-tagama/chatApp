import { config } from '@gluestack-ui/config';
import { GluestackUIProvider } from '@gluestack-ui/themed';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ContextProvider } from './src/context/context';
import { Login } from './src/screens/Login';
import { Home } from './src/screens/Home';
import { Chat } from './src/screens/Chat';

const Stack = createNativeStackNavigator();

export default function App() {
  const user=true;
  const Screens= (
    <Stack.Navigator initialRouteName="home" screenOptions={{headerShown:false}}>
      {user == null ?
        <Stack.Screen name="login" component={Login} /> :
        <>
          <Stack.Screen name="home" component={Home} />
          <Stack.Screen name="chat" component={Chat} />
        </>
      }
    </Stack.Navigator>
  )

  return (
    <ContextProvider>
    <GluestackUIProvider config={config}>
      <NavigationContainer>
        {Screens}
      </NavigationContainer>
    </GluestackUIProvider>
    </ContextProvider>
  );
}

