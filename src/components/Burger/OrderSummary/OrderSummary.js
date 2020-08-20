import React from 'react';
import Aux from '../../../hoc/Aux'
import Button from '../../UI/Button/Button'

const OrderSummary = (props) => {
	const ingredientSummary = Object.keys(props.ingredients)
		.map(igKey => {
			return <li key={igKey}><span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {props.ingredients[igKey]}</li>
		})

	return (
		<Aux>
			<h3>Your order</h3>
			<p>Delicios burger with the following ingredients</p>
			<ul>
				{ingredientSummary}
			</ul>
			<p><strong>Total Price: {props.orderPrice.toFixed(2)} $</strong></p>
			<p>Continue checkout</p>
			<Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
			<Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
		</Aux>
	)
}

export default OrderSummary;