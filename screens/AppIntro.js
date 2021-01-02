import React, { useState, useContext } from 'react';

import { StyleSheet, View, Image, Text } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import App from '../App';
import Feeds from './Feeds';
import { GlobalContext, viewIntro } from '../context/GlobalState';
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

const slides = [
	{
		key             : 'one',
		title           : 'Personal Finance Applications',
		text            :
			'Can help you track your budget, track your investments, use graphs and charts to show your progress, and keep your business and personal expenses separate.',
		image           : 'https://cdn.iconscout.com/icon/free/png-256/fast-food-1851561-1569286.png',
		backgroundColor : '#000',
	},
];

export default function AppIntro (){
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
	let { setViewIntro, viewIntro } = useContext(GlobalContext);

	const [
		realApp,
		showRealApp,
	] = useState(false);
	let _renderItem = ({ item }) => {
		return (
			<View
				style={[
					styles.slide,
					{ backgroundColor: item.backgroundColor },
				]}>
				<Text style={styles.title}>{item.title}</Text>
				<Text style={styles.text}>{item.text}</Text>
				{/* <Image
					source={{ uri: item.image }}
					style={{
						width  : '80%',
						height : '65%',
					}}
					resizeMode='contain'
				/> */}
			</View>
		);
	};
	let _onDone = () => {
		// User finished the introduction. Show real app through
		// navigation or simply by controlling state
		setViewIntro();
		showRealApp(true);
	};
	if (viewIntro) {
		return <Feeds />;
	}
	else {
		return <AppIntroSlider renderItem={_renderItem} data={slides} onDone={() => _onDone()} />;
	}
}

const styles = StyleSheet.create({
	slide : {
		flex       : 1,
		alignItems : 'center',
		// justifyContent : 'center',
	},
	image : {
		width          : 320,
		height         : 320,
		marginVertical : 32,
	},
	text  : {
		color      : 'rgba(255, 255, 255, 0.8)',
		textAlign  : 'left',
		fontSize   : 19,
		width      : '90%',
		fontFamily : 'Jost_600SemiBold',
	},
	title : {
		fontFamily   : 'Jost_800ExtraBold',
		width        : '90%',
		fontSize     : 17,
		fontSize     : 32,
		marginBottom : 12,
		color        : 'white',
		textAlign    : 'left',
		marginTop    : 40,
	},
});
