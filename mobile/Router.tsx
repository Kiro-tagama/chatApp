import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ContextArea } from './src/context/context';
import { useContext } from 'react';

import { Login } from './src/screens/Login';
import { Home } from './src/screens/Home';
import { Chat } from './src/screens/Chat';

const Stack = createNativeStackNavigator();

export function Router(){
  const {userData} = useContext(ContextArea)

  return <Stack.Navigator initialRouteName="home" screenOptions={{headerShown:false}}>
  {
    userData == null ?
    <Stack.Screen name="login" component={Login} /> :
    <>
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="chat" component={Chat} />
    </>
  }
  </Stack.Navigator>
}