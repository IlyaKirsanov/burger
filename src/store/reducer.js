import * as actionsTypes from './actions'

const initState = {
	ingredients: {
		salad: 0,
		bacon: 0,
		cheese:0,
		meat: 0
	},
	totalPrice: 4
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