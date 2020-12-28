import React, { useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	Dimensions,
	Image,
	ScrollView,
	TouchableOpacity,
	TouchableHighlight,
	Alert,
	Modal,
} from 'react-native';
import { List } from 'react-native-paper';

import { FAB } from 'react-native-paper';

import { Appbar } from 'react-native-paper';
import ListCategory from '../component/ListCategory';
import ExpensForm from './ExpensForm';
let { width, height } = Dimensions.get('window');

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
	const _handleSearch = () => console.log('Searching');
	const [
		modalVisible,
		setModalVisible,
	] = useState(false);

	const _handleMore = () => console.log('Shown more');

	let close = () => {
		setModalVisible(!modalVisible);
	};
	return (
		<SafeAreaView style={styles.container}>
			<View
				style={{
					flexDirection  : 'row',
					alignItems     : 'flex-start',
					justifyContent : 'space-between',
				}}>
				<View>
					<Text style={styles.title}> G Morning, </Text>
					<Text style={styles.titleNAme}> Julio </Text>
				</View>

				<View style={styles.contentIcon}>
					<Appbar.Action icon='magnify' onPress={_handleSearch} />
					<Appbar.Action icon='dots-vertical' onPress={_handleMore} />
				</View>
			</View>
			<View>
				<List.Section>
					<List.Subheader> Janvier 2021 </List.Subheader>
					<View>
						<Text style={styles.titleNAme}> - 890 HTG </Text>
					</View>
					<ListCategory fromScreen='feeds' />
					<View style={styles.contentList}>
						<View>
							<Text style={styles.currentDay}> Today </Text>
						</View>
						<List.Item
							title='Transportation'
							description='Gaz nan machin'
							left={(props) => <List.Icon {...props} icon='folder' style={styles.iconColor} />}
							right={(props) => primeText('black', '500 HTG')}
						/>

						<View>
							<Text style={styles.currentDay}> 04 janvier </Text>
						</View>
						<List.Item
							title='Transportation'
							description='Gaz nan machin'
							left={(props) => <List.Icon {...props} icon='folder' style={styles.iconColor} />}
							right={(props) => primeText('black', '500 HTG')}
						/>
						<List.Item
							title='Food and drinks'
							description=' 5 coins restaurant '
							left={(props) => <List.Icon {...props} icon='folder' />}
							right={(props) => primeText('black', '100 HTG')}
						/>
					</View>
				</List.Section>
			</View>
			<FAB
				style={styles.fab}
				large
				icon='plus'
				// navigate to form but modal
				// onPress={() => navigation.navigate('ExpensForm')}
				onPress={() => setModalVisible(true)}
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
						<ExpensForm close={close} />
					</View>
				</View>
			</Modal>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container      : {
		flex  : 1,
		width : width,
	},
	fab            : {
		position : 'absolute',
		margin   : 32,
		right    : 0,
		bottom   : 0,
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
		backgroundColor : '#eee',
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
		flexDirection : 'row',
	},
	iconColor      : {
		color : '#fff',
	},
	title          : {
		fontSize : 42,
		color    : 'gray',
	},
	currentDay     : {
		fontSize  : 32,
		color     : '#ccc',
		marginTop : 16,
	},
	titleNAme      : {
		fontSize   : 42,
		color      : '#444',
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
