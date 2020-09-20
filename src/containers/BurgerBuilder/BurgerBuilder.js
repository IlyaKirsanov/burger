import React from 'react';
import ReactAux from '../../hoc/ReactAux/ReactAux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner'

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index.js'
import axios from '../../axios-orders'


export class BurgerBuilder extends React.Component {

	state = {
		purchasing: false,

	}

	componentDidMount() {
		this.props.onInitIngredients()
	}

	purchaseHandler = () => {
		if(this.props.isAuthentecated){
			this.setState({
				purchasing: true
			})
		}else{ 
			this.props.onSetAuthRedirectPath('/checkout')
			this.props.history.push('/auth')
		}
	}

	purchaseCancelHandler = () => {
		this.setState({ purchasing: false })
	}

	purchaseContinueHandlerse = () => {
		this.props.onInitPurchase()
		this.props.history.push('/checkout')
	}

	updatePurchaseState(ingredients) {
		const sum = Object.keys(ingredients)
			.map(igKey => {
				return ingredients[igKey]
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);

		return sum > 0;
	}

	render() {
		const disableInfo = {
			...this.props.ings
		};

		for (let key in disableInfo) {
			disableInfo[key] = disableInfo[key] <= 0
		}

		let orderSummary = null;

		let burger = this.props.error ? <p style={{ fontSize: '24px', color: 'red' }}>Ingredients can`t be loaded</p> : <Spinner />

		if (this.props.ings) {
			burger = (
				<ReactAux>
					<Burger ingredients={this.props.ings} />
					<BuildControls
						isAuth = {this.props.isAuthentecated}
						ingredientAdded={this.props.onIngredientAdded}
						ingredientRemoved={this.props.onIngredientRemoved}
						disabled={disableInfo}
						price={this.props.price}
						purchaseable={this.updatePurchaseState(this.props.ings)}
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
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		error: state.burgerBuilder.error,
		isAuthentecated: state.auth.token !== null
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdded: (ingName) => {
			dispatch(actions.addIngredient(ingName))
		},
		onIngredientRemoved: (ingName) => {
			dispatch(actions.removeIngredient(ingName))
		},
		onInitIngredients: () => dispatch(actions.initIngredients()),
		onInitPurchase: () => dispatch(actions.purchaseInit()),
		onSetAuthRedirectPath: (path) =>dispatch(actions.setAuthRedirectPath(path))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));