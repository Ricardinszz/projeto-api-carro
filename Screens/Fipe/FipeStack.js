import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import Fipe from './Fipe';
import GeradorDeCarros from './GeradorDeCarros';
import FipeJogo from './FipeJogo';



const Stack = createNativeStackNavigator();

const FipeStack = () => {
    return (
        <>
            <Stack.Navigator>
                <Stack.Screen name='Fipe' component={Fipe} options={{ title: 'Fipe' }} />
                <Stack.Screen name='Fipe-Gerador' component={GeradorDeCarros} options={{ title: 'Gerador de Carros' }} />
                <Stack.Screen name='Fipe-Jogo' component={FipeJogo} options={{ title: 'Jogo' }} />

            </Stack.Navigator>
        </>
    )
}

export default FipeStack