import React from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'

import axios from '../../../axios-orders'

class ContactData extends React.Component {
	state = {
		orderForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Name'
				},
				value: ''
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Your Email'
				},
				value: ''
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Street'
				},
				value: ''
			},
			zipCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'ZIP Code'
				},
				value: ''
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Country'
				},
				value: ''
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{ value: 'fastest', displayedValue: 'Fastest' },
						{ value: 'cheepest', displayedValue: 'Cheepest' },
					]
				},
				value: ''
			}
		},
		loading: false
	}

	orderHandler = (event) => {
		event.preventDefault();

		alert('You are continue!')
		this.setState({ loading: true })
		const price = +this.props.price;
		const order = {
			ingredients: this.props.ingredients,
			price: price.toFixed(2),

		}
		console.log(this.props);
		axios.post('/orders.json', order)
			.then(response => {
				this.setState({ loading: false })
				this.props.history.push('/')
			})
			.catch(error => this.setState({ loading: false }))

	}

	render() {
		const formElementsArray = []
		for (let key in this.state.orderForm) {
			formElementsArray.push({
				id: key,
				config: this.state.orderForm[key]
			})
		}
		let form = (
			<form >

				{formElementsArray.map(formElem => (
					<Input
						key={formElem.id}
						elementType={formElem.config.elementType}
						elementConfig={formElem.config.elementConfig}
						vlaue={formElem.config.value} />
				))}
				<Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
			</form>);
		if (this.state.loading) {
			form = <Spinner />
		}

		return (
			<div className={classes.ContactData}>
				<h4>Enter your contact data</h4>
				{form}
			</div>
		)
	}

}

export default ContactData;