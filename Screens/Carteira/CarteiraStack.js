import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import Carteira from './Carteira';



const Stack = createNativeStackNavigator();

const CarteiraStack = () => {
    return (
        <>
            <Stack.Navigator>
                <Stack.Screen name='Carteira' component={Carteira} options={{ title: 'Carteira' }} />
                
            </Stack.Navigator>
        </>
    )
}

export default CarteiraStack