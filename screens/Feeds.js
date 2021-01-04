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
import { List } from 'react-native-paper';
import { FAB } from 'react-native-paper';

import ListCategory from '../component/ListCategory';
import HeadersApps from '../component/HeaderApps';
import ExpensForm from './ExpensForm';
import Chart from './Chart';
let { width, height } = Dimensions.get('window');
import { GlobalContext } from '../context/GlobalState';
import { Ionicons } from '@expo/vector-icons';
import AppLoading from 'expo-app-loading';

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
import Menu from '../component/Menu';
import Home from '../component/Home';
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

export default function Feeds ({ navigation }){
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

	let { user, listBudget, getBudget } = useContext(GlobalContext);

	const _handleSearch = () => console.log('Searching');
	const [
		modalVisible,
		setModalVisible,
	] = useState(false);

	const [
		showChart,
		setShowChart,
	] = useState(false);

	const [
		menuSelect,
		setMenuSelect,
	] = useState(1);

	let close = () => {
		setModalVisible(!modalVisible);
	};
	useEffect(() => {
		return () => {
			getBudget();
		};
	}, []);

	if (!fontsLoaded) {
		return <AppLoading />;
	}
	else {
		return (
			<SafeAreaView style={styles.container}>
				<View>
					<HeadersApps />
					{
						menuSelect == 1 ? <Home /> :
						<Home />}
				</View>

				<FAB
					style={styles.fab}
					small
					icon='plus'
					// navigate to form but modal
					// onPress={() => navigation.navigate('ExpensForm')}
					onPress={() => {
						setModalVisible(true);
						setShowChart(false);
					}}
				/>

				<Modal
					animationType='slide'
					transparent={true}
					visible={modalVisible}
					onRequestClose={() => {
						Alert.alert('Modal has been closed.');
					}}>
					<View style={styles.centeredView}>
						<View style={styles.modalView}>
							{
								showChart == true ? <Chart close={close} /> :
								<ExpensForm close={close} />}
						</View>
					</View>
				</Modal>

				<Menu menuSelect={menuSelect} setMenuSelect={setMenuSelect} />
			</SafeAreaView>
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
		justifyContent : 'flex-start',
		alignItems     : 'center',
		margin         : 2,
		paddingTop     : 0,
		paddingLeft    : 4,
		paddingRight   : 16,
		borderRadius   : 30,
	},
	itemMenu       : {
		color      : '#fff',
		fontSize   : 17,
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
