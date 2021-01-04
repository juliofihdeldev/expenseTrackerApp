import React, { createContext, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppReducer from './AppReducer';
let categories = [
	{
		id             : 1,
		category_name  : 'Food & drink',
	},
	{
		id             : 2,
		category_name  : 'Transportation',
	},
	{
		id             : 3,
		category_name  : 'Home',
	},
	{
		id             : 4,
		category_name  : 'School',
	},
	{
		id             : 5,
		category_name  : 'Communication',
	},
	{
		id             : 6,
		category_name  : 'Works',
	},
	{
		id             : 7,
		category_name  : 'Autres',
	},
];


 const initialState = {
	user: {},
	error: null,
	laoding: false,
	categories: categories,
	listBudget: [],
	viewIntro: true
};

export const GlobalContext = createContext(initialState);
// Create provider

export const GlobalProvider = ({ children }: any) => {
	const [
		state,
		dispatch,
	] = useReducer(AppReducer, initialState);

	// action
	function needHelp (data: any){
		dispatch({
			type: 'needHelp',
			payload: data,
		});
	}
	async function setViewIntro (){

		dispatch({
			type: 'SET_VIEW_INTRO',
			payload: true,
		});
	}

	// action
	async function setUser (){
		let userData = await AsyncStorage.getItem('userLocalData');
		userData = JSON.parse(userData);
		dispatch({
			type: 'SET_USER',
			payload: userData,
		});
	}

	async function addBudget(data: any) {
		let dataLocal = [...state.listBudget,data ]
		await AsyncStorage.setItem('userLocalData',JSON.stringify(dataLocal));
		dispatch({
			type: 'ADD_BUDGET',
			payload: data	
		});	
	}

	async function getBudget() {
		let userData = await AsyncStorage.getItem('userLocalData');
		userData = JSON.parse(userData) || [];
			dispatch({
				type: 'GET_BUDGET',
				payload: userData
			});
	}

	return (
		<GlobalContext.Provider
			value={{
				user: state.user,
				error: state.error,
				categories:state.categories,
				listBudget: state.listBudget,
				messageAlert: state.messageAlert,	
				viewIntro:state.viewIntro,
				needHelp,
				setUser,
				addBudget,
				getBudget,
				setViewIntro
			}}>
			{children}
		</GlobalContext.Provider>
	);
};
