import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Dimensions, Image, ScrollView, TouchableOpacity } from 'react-native';
let { width, height } = Dimensions.get('window');

export default function ListCategory (){
	let filterCat = (item) => {
		setCategory(item.id);
	};
	const [
		selectCategory,
		setCategory,
	] = React.useState(1);

	let categories = [
		{
			id             : 1,
			category_image : 'https://cdn.iconscout.com/icon/free/png-256/fast-food-1851561-1569286.png',
			category_name  : 'Food & drink',
		},
		{
			id             : 2,
			category_image : 'https://cdn.iconscout.com/icon/free/png-256/fast-food-1851561-1569286.png',
			category_name  : 'Transportation',
		},
		{
			id             : 3,
			category_image : 'https://cdn.iconscout.com/icon/free/png-256/fast-food-1851561-1569286.png',
			category_name  : 'Electricity',
		},
	];
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

											item.id == selectCategory ? '#ccc' :
											'#fff',
								},
							]}>
							<View
								style={[
									styles.contenCategory,
								]}>
								<Image
									source={{ uri: item.category_image }}
									style={{
										width       : 20,
										height      : 20,
										marginRight : 6,
									}}
								/>
								<Text style={styles.textButton}>{item.category_name}</Text>
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
