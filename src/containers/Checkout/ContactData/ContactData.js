import React from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import Spinner from '../../../components/UI/Spinner/Spinner'

import axios from '../../../axios-orders'

class ContactData extends React.Component {
	state = {
		name: '',
		email: '',
		address: {
			street: '',
			postalCode: ''
		},
		loading: false
	}

	orderHandler = (event) => {
		event.preventDefault();

		alert('You are continue!')
		this.setState({ loading: true })
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			customer: {
				name: 'Ilya',
				adress: {
					street: 'Teststreet',
					zipCode: '123456',
					country: 'Ukraine'
				},
				email: 'test@test.com'
			},
			deliveryMethod: 'fastest'
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
		let form = (
			<form >
				<input className={classes.Input} type="text" name="name" placeholder="Your name" id="" />
				<input className={classes.Input} type="email" name="email" placeholder="Your email" id="" />
				<input className={classes.Input} type="text" name="street" placeholder="Your street" id="" />
				<input className={classes.Input} type="text" name="postalCode" placeholder="Your postal code" id="" />
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