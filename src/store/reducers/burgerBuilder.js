import * as actionsTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

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
			const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
			const updatedIngredients = updateObject(state.ingredients, updatedIngredient)
			const updatedState = {
				ingredients: updatedIngredients,
				totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
			}
			return updateObject(state, updatedState)
			
		case actionsTypes.REMOVE_INGREDIENT:
			const updatedIng = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 }
			const updatedIngs = updateObject(state.ingredients, updatedIng)
			const updatedSt = {
				ingredients: updatedIngs,
				totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
			}
			return updateObject(state, updatedSt)

		case actionsTypes.SET_INGREDIENTS:
			return updateObject(state, {
				ingredients: action.ingredients,
				totalPrice: initState.totalPrice,
				error: false
			})

		case actionsTypes.FETCH_INGREDIENTS_FAIL:
			return updateObject(state, {error: true})

		default:
			return state
	}
}

export default reducer;