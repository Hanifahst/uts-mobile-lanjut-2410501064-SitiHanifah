import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabNavigator from './src/navigations/TabNavigator';
import DetailScreen from './src/screens/DetailScreen';
import { FavoritesProvider } from './src/context/FavoritesContext';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <FavoritesProvider>
        <NavigationContainer>
            <Stack.Navigator>
            <Stack.Screen
                name="MainTabs"
                component={TabNavigator}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="Detail"
                component={DetailScreen}
            />
            </Stack.Navigator>
        </NavigationContainer>
        </FavoritesProvider>
    );
}