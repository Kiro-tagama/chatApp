import { config } from '@gluestack-ui/config';
import { GluestackUIProvider } from '@gluestack-ui/themed';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ContextArea, ContextProvider } from './src/context/context';
import { Login } from './src/screens/Login';
import { Home } from './src/screens/Home';
import { Chat } from './src/screens/Chat';
import { useContext } from 'react';

const Stack = createNativeStackNavigator();

export default function App() {
  const {userData} = useContext(ContextArea)
  
  const Screens= (
    <Stack.Navigator initialRouteName="home" screenOptions={{headerShown:false}}>
      {userData === null ?
        <Stack.Screen name="login" component={Login} /> :
        <>
          <Stack.Screen name="home" component={Home} />
          <Stack.Screen name="chat" component={Chat} />
        </>
      }
    </Stack.Navigator>
  )

  return (
    <GluestackUIProvider config={config}>
      <ContextProvider>
      <NavigationContainer>
        {Screens}
      </NavigationContainer>
      </ContextProvider>
    </GluestackUIProvider>
  );
}

