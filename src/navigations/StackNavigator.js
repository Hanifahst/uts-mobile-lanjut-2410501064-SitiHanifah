import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';

const Stack = createNativeStackNavigator();

export default function createNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Main Home" 
                component={HomeScreen} 
                options={{ title: 'Home' }} />
            <Stack.Screen 
                name="Detail" 
                component={DetailScreen} />
        </Stack.Navigator>
    );
}