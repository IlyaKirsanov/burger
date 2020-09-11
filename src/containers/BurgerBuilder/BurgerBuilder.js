import React from 'react';
import ReactAux from '../../hoc/ReactAux/ReactAux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner'

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { connect } from 'react-redux'
import * as burgerBuilderActions from '../../store/actions/index.js'
import axios from '../../axios-orders'


class BurgerBuilder extends React.Component {

	state = {
		purchasing: false,

	}

	componentDidMount() {
	
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
		ings: state.ingredients,
		price: state.totalPrice
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdded: (ingName) => {
			dispatch(burgerBuilderActions.addIngredient(ingName))
		},
		onIngredientRemoved: (ingName) => {
			dispatch(burgerBuilderActions.removeIngredient(ingName))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));