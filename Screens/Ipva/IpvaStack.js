import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import Ipva from './Ipva';


const Stack = createNativeStackNavigator();

const IpvaStack = () => {
    return (
        <>
            <Stack.Navigator>
                <Stack.Screen name='Ipva' component={Ipva} options={{ title: 'IPVA' }} />
                
            </Stack.Navigator>
        </>
    )
}

export default IpvaStack