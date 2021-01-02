import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Dimensions, Image, ScrollView, TouchableOpacity } from 'react-native';
let { width, height } = Dimensions.get('window');
import { GlobalContext } from '../context/GlobalState';

export default function ListCategory (){
	let { user, addBudget, categories } = useContext(GlobalContext);

	let filterCat = (item) => {
		setCategorySelect(item.id);
	};
	const [
		selectCategory,
		setCategorySelect,
	] = React.useState(1);

	return (
		<ScrollView horizontal={true} style={{ marginTop: 10 }} showsHorizontalScrollIndicator={false}>
			<View style={styles.viewButtons}>
				{categories.map((item) => (
					<TouchableOpacity onPress={() => filterCat(item)} key={item.id}>
						<View
							style={[
								styles.selectedButton,
								{
									backgroundColor :

											item.id == selectCategory ? 'blue' :
											'#fff',
								},
							]}>
							<View
								style={[
									styles.contenCategory,
								]}>
								{/* <Image
									source={{ uri: item.category_image }}
									style={{
										width       : 20,
										height      : 20,
										marginRight : 6,
									}}
								/> */}
								<Text
									style={[
										styles.textButton,
										{
											fontWeight : 'bold',
											color      :

													item.id == selectCategory ? 'white' :
													'#000',
										},
									]}>
									{item.category_name}
								</Text>
							</View>
						</View>
					</TouchableOpacity>
				))}
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container      : {
		flex  : 1,
		width : width,
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

	contenCategory : {
		flex           : 1,
		flexDirection  : 'row',
		justifyContent : 'center',
		alignItems     : 'center',
	},
});
