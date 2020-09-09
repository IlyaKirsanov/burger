import React from 'react';
import ReactAux from '../../hoc/ReactAux/ReactAux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { connect } from 'react-redux'
import * as actionsTypes from '../../store/actions'


class BurgerBuilder extends React.Component {

	state = {
		purchaseable: false,
		purchasing: false,
		loading: false,
		error: false
	}

	componentDidMount() {
		// axios.get('/ingredients.json')
		// 	.then(response => {
		// 		this.setState({ ingredients: response.data })
		// 	})
		// 	.catch(error =>{
		// 		this.setState({error: true})
		// 	})
	}

	purchaseHandler = () => {
		this.setState({
			purchasing: true
		})
	}

	purchaseCancelHandler = () => {
		this.setState({ purchasing: false })
	}

	purchaseContinueHandlerse = () => {
		const queryParams = []
		queryParams.push('price=' + this.props.price)
		for (let ing in this.state.ingredients) {
			queryParams.push(encodeURIComponent(ing) + '=' + encodeURIComponent(this.state.ingredients[ing]))
		}

		const queryString = queryParams.join('&')

		this.props.history.push({
			pathname: 'checkout',
			search: queryString
		})
	}

	updatePurchaseState(ingredients) {
		const sum = Object.keys(ingredients)
			.map(igKey => {
				return ingredients[igKey]
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);

		this.setState({
			purchaseable: sum > 0
		})
	}

	render() {
		const disableInfo = {
			...this.props.ings
		};

		for (let key in disableInfo) {
			disableInfo[key] = disableInfo[key] <= 0
		}

		let orderSummary = null;

		let burger = this.state.error ? <p style={{ fontSize: '24px', color: 'red' }}>Ingredients can`t be loaded</p> : <Spinner />

		if (this.props.ings) {
			burger = (
				<ReactAux>
					<Burger ingredients={this.props.ings} />
					<BuildControls
						ingredientAdded={this.props.onIngredientAdded}
						ingredientRemoved={this.props.onIngredientRemoved}
						disabled={disableInfo}
						price={this.props.price}
						purchaseable={this.state.purchaseable}
						ordered={this.purchaseHandler}

					/>
				</ReactAux>
			)
			orderSummary = <OrderSummary
				orderPrice={this.props.price}
				ingredients={this.props.ings}
				purchaseCancelled={this.purchaseCancelHandler}
				purchaseContinued={this.purchaseContinueHandlerse}
			/>
		}


		if (this.state.loading) {
			orderSummary = <Spinner />
		}

		return (
			<ReactAux>
				<Modal modalClosed={this.purchaseCancelHandler} show={this.state.purchasing}>
					{orderSummary}
				</Modal>
				{burger}
			</ReactAux>
		)
	}
}
const mapStateToProps = state => {
	return {
		ings: state.ingredients,
		price: state.totalPrice
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdded: (ingName) => {
			dispatch({ type: actionsTypes.ADD_INGREDIENT, ingredientName: ingName })
		},
		onIngredientRemoved: (ingName) => {
			dispatch({ type: actionsTypes.REMOVE_INGREDIENT, ingredientName: ingName })
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));