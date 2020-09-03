import React from 'react'

import CheckoutSummary from '../../components/Order/Checkout/CheckoutSummary'

class Checkout extends React.Component {

	state={
		ingredients: {
			salad: 1,
			bacon: 1,
			cheese: 1,
			meat: 1
		}
	}
	render(){
		return(
			<div className="">
				<CheckoutSummary ingredients={this.state.ingredients}/>
			</div>
		)
	}
}

export default Checkout;