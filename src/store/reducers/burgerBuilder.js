import * as actionsTypes from '../actions/actionTypes'

const initState = {
	ingredients: null,
	totalPrice: 4,
	error: false
}

const INGREDIENT_PRICES = {
	salad: 0.5,
	bacon: 1.2,
	cheese: 0.7,
	meat: 1.5

}


const reducer = (state = initState, action) => {
	switch (action.type) {
		case actionsTypes.ADD_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredientName]: state.ingredients[action.ingredientName] + 1
				},
				totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
			}
		case actionsTypes.REMOVE_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredientName]: state.ingredients[action.ingredientName] - 1
				},
				totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
			}

		default:
			return state
	}
}

export default reducer;