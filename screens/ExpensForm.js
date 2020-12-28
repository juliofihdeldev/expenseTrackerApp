import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View, TextInput } from 'react-native';
import { Button } from 'react-native-paper';
import ListCategory from '../component/ListCategory';
import DateTimePicker from '@react-native-community/datetimepicker';
import { RadioButton } from 'react-native-paper';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

let { width, height } = Dimensions.get('window');
export default function ExpensForm ({ navigation, close }){
	const [
		text,
		setText,
	] = React.useState('');
	const [
		date,
		setDate,
	] = useState(new Date(1598051730000));
	const [
		mode,
		setMode,
	] = useState('date');
	const [
		show,
		setShow,
	] = useState(false);

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		setShow(Platform.OS === 'ios');
		setDate(currentDate);
	};

	const showMode = (currentMode) => {
		setShow(true);
		setMode(currentMode);
	};

	const showDatepicker = () => {
		showMode('date');
	};
	const [
		checked,
		setChecked,
	] = React.useState('depense');

	return (
		<ScrollView style={styles.container}>
			<ScrollView>
				<View style={styles.radioGroup}>
					<TouchableOpacity
						style={[
							styles.radioContent,
							{
								padding :

										checked === 'gagner' ? 2 :
										0,
							},
						]}
						onPress={() => setChecked('gagner')}>
						<Text style={styles.radioText}> Gagner</Text>
						<RadioButton
							color='white'
							value='gagner'
							status={

									checked === 'gagner' ? 'checked' :
									'unchecked'
							}
							onPress={() => setChecked('gagner')}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						style={[
							styles.radioContentRed,

							{
								padding :

										checked === 'depense' ? 2 :
										0,
							},
						]}
						onPress={() => setChecked('depense')}>
						<Text style={styles.radioText}> Depense</Text>
						<RadioButton
							color='white'
							value='depense'
							status={

									checked === 'depense' ? 'checked' :
									'unchecked'
							}
						/>
					</TouchableOpacity>
					<View style={{ position: 'absolute', marginLeft: width - 180, width: 140 }}>
						<DateTimePicker
							testID='dateTimePicker'
							value={date}
							mode={mode}
							is24Hour={true}
							display='default'
							onChange={onChange}
						/>
					</View>
				</View>
				<View
					style={{
						width         : width,
						flexDirection : 'row',
						flexWrap      : 'wrap',
					}}>
					{[
						'Food & drinks',
						'Transport',
						'Bitch',
						'LifeStyle',
						'Alcool',
						'Work',
						'Friends',
						'Family',
					].map((el) => (
						<TouchableOpacity style={styles.textCatContent}>
							<Text style={styles.textCat}> {el} </Text>
						</TouchableOpacity>
					))}
					<TouchableOpacity style={styles.textCatContent}>
						<Text style={styles.textCat}> Others </Text>
					</TouchableOpacity>
				</View>
				<TextInput
					placeholder='More informations'
					multiline={true}
					style={{
						height      : 120,
						borderColor : '#fff',
						borderWidth : 1,
						margin      : 12,
						fontSize    : 17,
						color       : '#444',
					}}
					value={text}
					keyboardType='twitter'
					numberOfLines={4}
					onChangeText={(text) => setText(text)}
				/>

				<Button
					style={{
						marginTop : 0,
						width     : 40,
						position  : 'absolute',
						right     : 0,
						fontSize  : 132,
						zIndex    : 12,
					}}
					onPress={() => close()}>
					<Text style={{ fontSize: 32 }}> X</Text>
				</Button>
			</ScrollView>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container       : {
		flex            : 1,
		marginTop       : 10,
		backgroundColor : '#fff',
	},
	radioContent    : {
		flexDirection   : 'row',
		justifyContent  : 'center',
		alignItems      : 'center',
		backgroundColor : 'green',
	},
	radioContentRed : {
		flexDirection   : 'row',
		justifyContent  : 'center',
		alignItems      : 'center',
		backgroundColor : 'red',
	},
	radioGroup      : {
		backgroundColor : 'white',
		flexDirection   : 'row',
		justifyContent  : 'flex-start',
		alignItems      : 'center',
		height          : 40,
		margin          : 10,
	},
	radioText       : {
		fontSize      : 14,
		color         : 'white',
		fontWeight    : 'bold',
		textTransform : 'uppercase',
	},
	textCatContent  : {
		backgroundColor : '#eee',

		height          : 40,
		margin          : 4,
		borderRadius    : 20,
	},
	textCat         : {
		color        : '#333',
		height       : 40,
		padding      : 8,
		textAlign    : 'center',
		margin       : 4,
		borderRadius : 20,
	},
});
