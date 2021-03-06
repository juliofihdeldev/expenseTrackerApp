import React, { useState, useContext } from 'react';
import { Dimensions, StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { RadioButton } from 'react-native-paper';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { GlobalContext } from '../context/GlobalState';
let { width, height } = Dimensions.get('window');
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';
let start = new Date();

export default function ExpensForm ({ navigation, close }){
	let { user, addBudget, categories } = useContext(GlobalContext);

	const [
		text,
		setText,
	] = React.useState('');

	const [
		categoriesChoices,
		setCategorySelection,
	] = React.useState(categories);

	const [
		motif,
		setMotif,
	] = React.useState('');

	const [
		amount,
		setAmount,
	] = React.useState('');

	const [
		theDate,
		setDate,
	] = useState(`${start}`.slice(4, 15));

	const [
		mode,
		setMode,
	] = useState('date');
	const [
		show,
		setShow,
	] = useState(false);

	const showMode = (currentMode) => {
		setShow(true);
		setMode(currentMode);
	};

	let handleMutilteSelect = (item) => {
		categoriesChoices.map((el) => {
			if (el.category_name == item.category_name) {
				el['select'] = !el.select;
			}
		});
		setCategorySelection([
			...categoriesChoices,
		]);
	};

	const [
		checked,
		setChecked,
	] = React.useState('depense');

	return (
		<Container style={styles.container}>
			<Content>
				<Form>
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
							<Text style={styles.radioText}> Income</Text>
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
							<Text style={styles.radioText}> Expense</Text>
							<RadioButton
								color='white'
								value='depense'
								status={

										checked === 'depense' ? 'checked' :
										'unchecked'
								}
							/>
						</TouchableOpacity>
						{/* <View style={{ position: 'absolute', marginLeft: width - 180, width: 140 }}>
							<DateTimePicker
								testID='dateTimePicker'
								value={date}
								mode={mode}
								is24Hour={true}
								display='default'
								onChange={onChange}
							/>
						</View> */}
					</View>
					<View
						style={{
							width         : width,
							margin        : 4,
							padding       : 8,
							flexDirection : 'row',
							flexWrap      : 'wrap',
						}}>
						{categoriesChoices.map((el) => (
							<TouchableOpacity
								style={[
									styles.textCatContent,
									{
										backgroundColor :
											el.select ? '#cce' :
											'#eee',
									},
								]}
								onPress={() => handleMutilteSelect(el)}>
								<Text style={styles.textCat}> {el.category_name} </Text>
							</TouchableOpacity>
						))}
					</View>

					<TextInput
						placeholder='Motif'
						style={{
							backgroundColor : '#eee',
							borderRadius    : 10,
							borderColor     : '#fff',
							borderWidth     : 1,
							margin          : 8,
							padding         : 12,
							fontSize        : 17,
							color           : '#444',
						}}
						value={motif}
						numberOfLines={1}
						onChangeText={(text) => setMotif(text)}
					/>
					<TextInput
						placeholder='Amount'
						style={{
							backgroundColor : '#eee',
							borderRadius    : 10,
							borderColor     : '#fff',
							borderWidth     : 1,
							margin          : 8,
							padding         : 12,
							fontSize        : 17,
							color           : '#444',
						}}
						value={amount}
						keyboardType='phone-pad'
						numberOfLines={1}
						onChangeText={(text) => setAmount(text)}
					/>
					<TextInput
						placeholder='More informations'
						multiline={true}
						style={{
							height          : 80,
							backgroundColor : '#eee',
							borderRadius    : 10,
							borderColor     : '#fff',
							borderWidth     : 1,
							margin          : 8,
							padding         : 12,
							fontSize        : 17,
							color           : '#444',
						}}
						value={text}
						keyboardType='twitter'
						numberOfLines={4}
						onChangeText={(text) => setText(text)}
					/>

					<View
						style={{
							width          : width - 40,
							padding        : 8,
							justifyContent : 'space-between',
							flexDirection  : 'row',
							alignItems     : 'center',
						}}>
						<Button
							style={{
								width           : width / 2.3,
								backgroundColor : '#eee',
								padding         : 4,
							}}
							onPress={() => close()}>
							<Text style={{ fontSize: 17, color: '#ccc' }}> Cancel </Text>
						</Button>
						<Button
							style={{
								width           : width / 2,
								backgroundColor : 'blue',
								padding         : 4,
							}}
							onPress={() => {
								Alert.alert(
									'Confirmations',
									'Are you sure ? ',
									[
										{
											text    : 'Cancel',
											onPress : () => console.log('Cancel Pressed'),
											style   : 'cancel',
										},
										{
											text    : 'OK',
											onPress : () => {
												addBudget({
													type       : checked,
													motif      : motif,
													amount     :

															checked == 'depense' ? -amount :
															amount,
													details    : text,
													categories : categoriesChoices.filter((el) => el.select == true),
													date       : theDate,
												});
												close();
											},
										},
									],
									{ cancelable: false },
								);
							}}>
							<Text style={{ fontSize: 17 }}> Add</Text>
						</Button>
					</View>
				</Form>
			</Content>
		</Container>
	);
}

const styles = StyleSheet.create({
	container       : {
		marginTop       : 10,
		backgroundColor : '#fff',
		borderRadius    : 40,
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
		margin          : 16,
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
