import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import Carteira from './Carteira';
import CarteiraForm from './CarteiraForm';



const Stack = createNativeStackNavigator();

const CarteiraStack = () => {
    return (
        <>
            <Stack.Navigator>
                <Stack.Screen name='Carteira' component={Carteira} options={{ title: 'Carteira' }} />
                <Stack.Screen name='Carteira-Form' component={CarteiraForm} options={{ title: 'Cadastro' }} />
            </Stack.Navigator>
        </>
    )
}

export default CarteiraStack