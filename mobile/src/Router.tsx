import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ContextArea } from './context/context';
import { useContext } from 'react';

import { Login } from './screens/Login';
import { Home } from './screens/Home';
import { Chat } from './screens/Chat';

const Stack = createNativeStackNavigator();

export function Router(){
  const {userData} = useContext(ContextArea)

  return (
    <Stack.Navigator 
      initialRouteName="home" 
      screenOptions={{headerShown:false}}
    >
    {
      userData == null ?
      <Stack.Screen name="login" component={Login} /> :
      <>
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="chat" component={Chat} />
      </>
    }
    </Stack.Navigator>
  )
}