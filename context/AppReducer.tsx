import React, { createContext, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// AppReducer;
export default (state: any, action: any) => {
	switch (action.type) {
		case 'needHelp':
			return {
				...state,
				user: action.payload,
			};

		case 'SET_USER':
			return {
				...state,
				loading: false,
				user: action.payload,
			};

		case 'GET_ERROR':
			return {
				...state,
				loading: false,
				error: action.payload,
			};

		case 'SET_VIEW_INTRO':

			return {
				...state,
				loading: false,
				error: null,
				viewIntro: action.payload
			};
		case 'CLEAR_ERROR':
			return {
				...state,
				loading: false,
				error: null,
				viewIntro: action.payload
			};
		// Handle cart function
		case 'ADD_BUDGET':
			return {
				...state,
				loading: false,
				listBudget:
					[
						...state.listBudget,
						action.payload,
					],
			};

		// case 'UPDATE_PRODUCT_TO_CART':
		// 	const newCart = state.cart.map(
		// 		(item: any) =>

		// 				item.id === action.payload.id ? { ...state.cart, ...action.payload } :
		// 				item,
		// 	);
		// 	return {
		// 		...state,
		// 		loading: false,
		// 		cart: newCart,
		// 	};

		// case 'DELETE_PRODUCT_TO_CART':
		// 	return {
		// 		...state,
		// 		loading: false,
		// 		cart: state.cart.filter((el: any) => el.id != action.payload.id),
		// 	};

		case 'GET_BUDGET':
			// console.log('New card', action.payload);			
			return {
				...state,
				loading: false,
				listBudget: action.payload,
			};

		case 'MESSAGES_INFO':
			return {
				...state,
				messageAlert: action.payload,
			};

		case 'GET_MESSAGE':
			return {
				...state,
				messageAlert: action.payload,
			};

		default:
			return state;
	}
};
