import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Feeds from './screens/Feeds';
import ExpensForm from './screens/ExpensForm';
import AppIntro from './screens/AppIntro';

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GlobalProvider } from './context/GlobalState';
import Home from './component/Home';
const Stack = createStackNavigator();

const theme = {
	...DefaultTheme,
	colors : {
		...DefaultTheme.colors,
		primary : '#fff',
		accent  : '#eee',
	},
};

export default function App (){
	return (
		<PaperProvider theme={theme}>
			<GlobalProvider>
				<NavigationContainer>
					<Stack.Navigator
						mode='modal'
						initialRouteName='AppIntro'
						screenOptions={{
							gestureEnabled : true,
						}}>
						<Stack.Screen name='Feeds' component={Feeds} options={{ headerShown: false }} />
						<Stack.Screen name='AppIntro' component={AppIntro} options={{ headerShown: false }} />
						<Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
						<Stack.Screen name='ExpensForm' component={ExpensForm} options={{ headerShown: false }} />
					</Stack.Navigator>
				</NavigationContainer>
			</GlobalProvider>
			<StatusBar style='auto' />
		</PaperProvider>
	);
}
