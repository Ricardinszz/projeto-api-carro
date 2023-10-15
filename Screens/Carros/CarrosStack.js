import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import Carros from './Carros';

const Stack = createNativeStackNavigator();

const CarrosStack = () => {
    return (
        <>
            <Stack.Navigator>
                <Stack.Screen name='Carros' component={Carros} options={{ title: 'Carros' }} />
                
            </Stack.Navigator>
        </>
    )
}

export default CarrosStack