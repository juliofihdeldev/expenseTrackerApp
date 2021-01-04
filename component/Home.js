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
import ListCategory from '../component/ListCategory';
let { width, height } = Dimensions.get('window');
import { GlobalContext } from '../context/GlobalState';
import AppLoading from 'expo-app-loading';

let currentMonth = new Date();

function currentFormat (amount){
	return Number(amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
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
import moment from 'moment';
moment().format();

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
function groupingBydata (data){
	if (data == null) return [];
	let group = [];
	data.forEach((el) => {
		if (!group[el.date]) {
			group[el.date] = {
				day  : el.date,
				data : [],
			};
		}
		group[el.date].data.push(el);
	});
	console.log(Object.values(group));
	return Object.values(group);
}

export default function Home ({ navigation }){
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
	let amount = listBudget.map((el) => parseFloat(el.amount)).reduce((el, acc) => el + acc, 0);

	const [
		donnees,
		setData,
	] = React.useState([]);

	useEffect(() => {
		async function fetchData (){
			getBudget();
		}
		fetchData();
	}, []);

	const [
		selectCategory,
		setCategorySelect,
	] = React.useState(1);

	//Filter list categories
	function filterListByCat (array, key){
		let resultArray = [];
		array.forEach((el) => {
			let fr = el.result.filter((da) => da.categories.includes(key));
			if (fr.length > 0) {
				resultArray.push(el);
			}
		});
		return resultArray;
	}

	const renderItem = ({ item }) => (
		<View
			style={{
				flexDirection   : 'row',
				alignItems      : 'center',
				justifyContent  : 'space-between',
				backgroundColor : '#444',
				padding         : 8,
				borderRadius    : 40,
				margin          : 8,
			}}>
			<View
				style={{
					flexDirection  : 'row',
					alignItems     : 'center',
					justifyContent : 'space-between',
				}}>
				<View
					style={{
						backgroundColor :

								item.type != 'depense' ? 'green' :
								'red',
						height          : 50,
						width           : 50,
						borderRadius    : 25,
						textAlign       : 'center',
						justifyContent  : 'center',
						alignItems      : 'center',
					}}>
					<Text style={{ fontWeight: 'bold', color: 'white' }}> {item.motif.slice(0, 2)}</Text>
				</View>

				<View style={{ marginLeft: 12 }}>
					<Text
						numberOfLines={1}
						ellipsizeMode='tail'
						style={{ fontWeight: 'bold', color: 'white', fontSize: 15, width: width / 2.8 }}>
						{' '}
						{item.motif}
					</Text>
					<Text
						numberOfLines={2}
						style={{
							color : 'white',
							width : width / 2.8,
						}}>
						{' '}
						{item.details}
					</Text>
				</View>
			</View>
			<View>
				<Text>
					{' '}
					{primeText(

							item.type != 'depense' ? 'green' :
							'red',

							item.type != 'depense' ? `+ ${currentFormat(item.amount)} HTG` :
							` ${currentFormat(item.amount)} HTG`,
					)}
				</Text>
			</View>
		</View>
	);

	if (!fontsLoaded) {
		return <AppLoading />;
	}
	else {
		return (
			<View>
				<List.Section>
					<View>
						<List.Subheader style={{ color: '#eee' }}> {`${currentMonth}`.slice(4, 15)} </List.Subheader>

						<Text style={styles.titleNAme}> {currentFormat(amount)} HTG </Text>
					</View>
					<ListCategory
						fromScreen='feeds'
						selectCategory={selectCategory}
						setCategorySelect={setCategorySelect}
					/>

					<View style={styles.contentList}>
						<View>
							<View>
								{groupingBydata(listBudget).map((el, index) => {
									return (
										<View>
											<Text style={styles.currentDay}>{el.day}</Text>
											<FlatList
												data={el.data}
												renderItem={renderItem}
												keyExtractor={(item) => item.id}
											/>
										</View>
									);
								})}
								{
									listBudget.length == 0 ? <View>
										<Text
											style={{
												textAlign : 'center',
												marginTop : 40,
												fontSize  : 22,
												color     : '#fff',
											}}>
											Start track your money now !
										</Text>
									</View> :
									null}
							</View>
						</View>
					</View>
				</List.Section>
			</View>
		);
	}
}

const styles = StyleSheet.create({
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
