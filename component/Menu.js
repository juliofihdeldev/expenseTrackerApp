import React, { useState, useContext, useEffect } from 'react';
import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	Dimensions,
	Alert,
	Modal,
	FlatList,
	TouchableOpacity,
} from 'react-native';

let { width, height } = Dimensions.get('window');
import { GlobalContext } from '../context/GlobalState';
import { Ionicons } from '@expo/vector-icons';
import AppLoading from 'expo-app-loading';
var _ = require('lodash');

import {
	useFonts,
	Jost_100Thin,
	Jost_200ExtraLight,
	Jost_300Light,
	Jost_400Regular,
	Jost_500Medium,
	Jost_600SemiBold,
	Jost_700Bold,
	Jost_800ExtraBold,
	Jost_900Black,
	Jost_100Thin_Italic,
	Jost_200ExtraLight_Italic,
	Jost_300Light_Italic,
	Jost_400Regular_Italic,
	Jost_500Medium_Italic,
	Jost_600SemiBold_Italic,
	Jost_700Bold_Italic,
	Jost_800ExtraBold_Italic,
	Jost_900Black_Italic,
} from '@expo-google-fonts/jost';
let primeText = (color, text = 'Some text ') => (
	<Text
		style={{
			color      : color,
			fontSize   : 17,
			fontWeight : 'bold',
		}}>
		{' '}
		{text}{' '}
	</Text>
);

export default function Menu ({ navigation, menuSelect, setMenuSelect }){
	let [
		fontsLoaded,
	] = useFonts({
		Jost_100Thin,
		Jost_200ExtraLight,
		Jost_300Light,
		Jost_400Regular,
		Jost_500Medium,
		Jost_600SemiBold,
		Jost_700Bold,
		Jost_800ExtraBold,
		Jost_900Black,
		Jost_100Thin_Italic,
		Jost_200ExtraLight_Italic,
		Jost_300Light_Italic,
		Jost_400Regular_Italic,
		Jost_500Medium_Italic,
		Jost_600SemiBold_Italic,
		Jost_700Bold_Italic,
		Jost_800ExtraBold_Italic,
		Jost_900Black_Italic,
	});

	if (!fontsLoaded) {
		return <AppLoading />;
	}
	else {
		return (
			<View
				style={{
					width          : width,
					position       : 'absolute',
					margin         : 4,
					bottom         : 4,
					padding        : 4,
					paddingBottom  : 4,
					flexDirection  : 'row',
					justifyContent : 'center',
					flexWrap       : 'wrap',
				}}>
				{[
					{ id: 1, icon: 'ios-home-outline', name: 'Home' },
					{ id: 2, icon: 'settings-outline', name: 'Profile' },
					{ id: 3, icon: 'newspaper-outline', name: 'Offers ' },
				].map((el) => (
					<TouchableOpacity
						onPress={() => {
							setMenuSelect(el.id);
						}}
						style={[
							styles.contentMenu,
							{
								backgroundColor :

										menuSelect == el.id ? '#fff' :
										'#333',
							},
						]}>
						<Ionicons
							name={el.icon}
							size={22}
							color={

									menuSelect == el.id ? '#333' :
									'#333'
							}
							style={{
								margin : 8,
							}}
						/>
						<Text
							style={[
								styles.itemMenu,
								{
									color :

											menuSelect == el.id ? '#333' :
											'#fff',
								},
							]}>
							{el.name}
						</Text>
					</TouchableOpacity>
				))}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container      : {
		flex            : 1,
		width           : width,
		backgroundColor : '#000',
	},
	contentMenu    : {
		flexDirection  : 'row',
		justifyContent : 'space-between',
		alignItems     : 'center',
		margin         : 2,
		paddingTop     : 0,
		paddingLeft    : 4,
		paddingRight   : 16,
		borderRadius   : 30,
	},
	itemMenu       : {
		color      : '#fff',
		fontSize   : 15,
		fontWeight : 'bold',
		fontFamily : 'Jost_600SemiBold',
	},
	fab            : {
		position : 'absolute',
		margin   : 16,
		right    : 0,
		bottom   : 42,
	},
	textCategory   : {
		color      : '#3A3A3A',
		fontFamily : 'Montserrat-Regular',
		fontWeight : '300',
		fontSize   : 17,
	},
	viewButtons    : {
		flex          : 1,
		flexDirection : 'row',
		padding       : 10,
		height        : 60,
	},
	categoryButton : {
		flex            : 1,
		borderColor     : '#3C5A99',
		borderRadius    : 5, // Rounded border
		marginRight     : 10,
		backgroundColor : '#A67F65',
		justifyContent  : 'center',
		width           : 150,
	},
	contentList    : {
		backgroundColor : '#333',
		borderRadius    : 30,
		padding         : 8,
		height          : height,
		elevation       : 10,
		marginTop       : 16,
	},
	selectedButton : {
		flex            : 1,
		paddingLeft     : 10,
		paddingRight    : 10,
		borderColor     : '#fff', // 3C5A99
		borderRadius    : 5, // Rounded border
		marginRight     : 10,
		backgroundColor : '#fff', // 2D4F5B
		justifyContent  : 'center',
	},
	contentIcon    : {
		flexDirection  : 'row',
		justifyContent : 'space-around',
	},
	iconColor      : {
		color : '#fff',
	},
	title          : {
		fontSize : 42,
		color    : '#fff',
	},
	currentDay     : {
		fontSize  : 32,
		color     : '#eee',
		marginTop : 16,
	},
	titleNAme      : {
		fontSize   : 32,
		color      : '#eee',
		fontWeight : 'bold',
	},
	colorText      : {
		color      : '#eee',
		fontWeight : 'bold',
	},
	top            : {
		top   : 0,
		left  : 0,
		right : 0,
	},
	contenCategory : {
		flex           : 1,
		flexDirection  : 'row',
		justifyContent : 'center',
		alignItems     : 'center',
	},

	centeredView   : {
		flex       : 2,
		alignItems : 'center',
		marginTop  : 140,
		width      : width,
	},
	modalView      : {
		backgroundColor : 'white',
		borderRadius    : 20,
		margin          : 10,
		alignItems      : 'center',
		shadowColor     : '#000',
		shadowOffset    : {
			width  : 0,
			height : 2,
		},
		shadowOpacity   : 0.25,
		shadowRadius    : 3.84,
		elevation       : 5,
		height          : height,
		width           : width,
		paddingBottom   : 200,
	},
	openButton     : {
		backgroundColor : '#F194FF',
		borderRadius    : 20,
		padding         : 10,
		elevation       : 2,
	},
	textStyle      : {
		color      : 'white',
		fontWeight : 'bold',
		textAlign  : 'center',
	},
	modalText      : {
		marginBottom : 15,
		textAlign    : 'center',
	},
});
