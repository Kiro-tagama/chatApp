import { config } from '@gluestack-ui/config';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { ContextProvider } from './src/context/context';
import { NavigationContainer } from '@react-navigation/native';

import { Router } from './Router.tsx';

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <ContextProvider>
      <NavigationContainer>
        <Router/>
      </NavigationContainer>
      </ContextProvider>
    </GluestackUIProvider>
  );
}

