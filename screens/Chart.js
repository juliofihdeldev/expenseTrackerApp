import React, { useState } from 'react';
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
import { Button } from 'react-native-paper';

import { LineChart, BarChart, PieChart, ProgressChart, ContributionGraph } from 'react-native-chart-kit';
let { width, height } = Dimensions.get('window');

export default function Chart ({ close }){
	return (
		<View>
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
				<Text style={{ fontSize: 21 }}> x</Text>
			</Button>

			<View
				style={{
					width          : width,
					flexDirection  : 'row',
					justifyContent : 'center',
					flexWrap       : 'wrap',
				}}>
				{[
					'Expense',
					'Income',
				].map((el) => (
					<TouchableOpacity style={styles.textCatContent}>
						<Text style={styles.textCat}> {el} </Text>
					</TouchableOpacity>
				))}
			</View>

			<LineChart
				data={{
					labels   : [
						'January',
						'February',
						'March',
						'April',
						'May',
						'June',
					],
					datasets : [
						{
							data : [
								Math.random() * 100,
								Math.random() * 100,
								Math.random() * 100,
								Math.random() * 100,
								Math.random() * 100,
								Math.random() * 100,
							],
						},
					],
				}}
				width={Dimensions.get('window').width} // from react-native
				height={220}
				chartConfig={{
					backgroundColor        : '#e26a00',
					backgroundGradientFrom : '#fb8c00',
					backgroundGradientTo   : '#ffa726',
					decimalPlaces          : 2, // optional, defaults to 2dp
					color                  : (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
					style                  : {
						borderRadius : 16,
					},
				}}
				bezier
				style={{
					marginVertical : 8,
					borderRadius   : 16,
				}}
			/>
		</View>
	);
}
const styles = StyleSheet.create({
	radioText      : {
		fontSize      : 14,
		color         : 'white',
		fontWeight    : 'bold',
		textTransform : 'uppercase',
	},
	textCatContent : {
		backgroundColor : '#eee',

		height          : 40,
		margin          : 4,
		borderRadius    : 20,
	},
	textCat        : {
		color        : '#333',
		height       : 40,
		padding      : 8,
		textAlign    : 'center',
		margin       : 4,
		borderRadius : 20,
	},
});
