import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Feeds from './screens/Feeds';
import ExpensForm from './screens/ExpensForm';

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const theme = {
	...DefaultTheme,
	colors : {
		...DefaultTheme.colors,
		primary : 'black',
		accent  : '#ccc',
	},
};

export default function App (){
	return (
		<PaperProvider theme={theme}>
			<NavigationContainer>
				<Stack.Navigator
					mode='modal'
					initialRouteName='Feeds'
					screenOptions={{
						gestureEnabled : true,
					}}>
					<Stack.Screen name='Feeds' component={Feeds} options={{ headerShown: false }} />
					<Stack.Screen name='ExpensForm' component={ExpensForm} options={{ headerShown: false }} />
				</Stack.Navigator>
			</NavigationContainer>
			<StatusBar style='auto' />
		</PaperProvider>
	);
}
