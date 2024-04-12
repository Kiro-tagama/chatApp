import { config } from '@gluestack-ui/config';
import { GluestackUIProvider, SafeAreaView } from '@gluestack-ui/themed';
import { ContextProvider } from './src/context/context';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';

import { Router } from './src/Router'
import { StatusBar } from 'react-native';


export default function App() {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white'
    },
    dark:false
  };

  return (
    <GluestackUIProvider config={config}>
      <NavigationContainer theme={MyTheme}>
      <SafeAreaView flex={1} paddingTop={StatusBar.currentHeight} >
      <ContextProvider>
        <Router/>
      </ContextProvider>
      </SafeAreaView>
      </NavigationContainer>
    </GluestackUIProvider>
  );
}

