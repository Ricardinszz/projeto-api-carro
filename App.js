import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import CarrosStack from './Screens/Carros/CarrosStack';
import FipeStack from './Screens/Fipe/FipeStack';
import CarteiraStack from './Screens/Carteira/CarteiraStack';


const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <>
      <PaperProvider >
        <NavigationContainer>

          <Tab.Navigator>
            <Tab.Screen
              name="Carros"
              component={CarrosStack}
              options={{
                tabBarIcon: () => (
                  <MaterialCommunityIcons name="book" size={26} />
                ),
              }}
            />

            <Tab.Screen
              name="Fipe"
              component={FipeStack}
              options={{
                tabBarIcon: () => (
                  <MaterialCommunityIcons name="book-open-page-variant" size={26} />
                ),
              }}
            />

            <Tab.Screen
              name="Carteira"
              component={CarteiraStack}
              options={{
                tabBarIcon: () => (
                  <MaterialCommunityIcons name="account" size={26} />
                ),
              }}
            />

          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </>
  );
}