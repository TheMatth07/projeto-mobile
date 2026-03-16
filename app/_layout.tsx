import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, Redirect } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

import { Provider } from "react-redux";
import { store } from "../src/store/store";

export default function RootLayout() {

  const colorScheme = useColorScheme();

  return (
    <Provider store={store}>

      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>

        {/* força abrir no login */}
        <Redirect href="/login" />

        <Stack>
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>

        <StatusBar style="auto" />

      </ThemeProvider>

    </Provider>
  );
}