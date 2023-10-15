import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import Fipe from './Fipe';



const Stack = createNativeStackNavigator();

const FipeStack = () => {
    return (
        <>
            <Stack.Navigator>
                <Stack.Screen name='Fipe' component={Fipe} options={{ title: 'Fipe' }} />

            </Stack.Navigator>
        </>
    )
}

export default FipeStack