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
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Your Email'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Street'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			zipCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'ZIP Code'
				},
				value: '',
				validation: {
					required: true,
					minLength: 5,
					maxLength: 5,
				},
				valid: false,
				touched: false
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Country'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{ value: 'fastest', displayedValue: 'Fastest' },
						{ value: 'cheepest', displayedValue: 'Cheepest' },
					]
				},
				value: 'fastest',
				validation: {},
				valid: true,
			}
		},
		formIsValid: false,
		loading: false
	}

	orderHandler = (event) => {
		event.preventDefault();
		alert('You are continue!')
		this.setState({ loading: true })
		const formData = {};
		for (let formElementIdentifier in this.state.orderForm) {
			//name,email,street...
			formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
		}
		const price = +this.props.price;
		const order = {
			ingredients: this.props.ingredients,
			price: price.toFixed(2),
			orderData: formData
		}
		axios.post('/orders.json', order)
			.then(response => {
				this.setState({ loading: false })
				this.props.history.push('/')
			})
			.catch(error => this.setState({ loading: false }))
	}

	checkValidation(value,rules){
		let isValid = true;

		if(rules.required){
			isValid = value.trim() !== '' && isValid;
		}

		if(rules.minLength){
			isValid = value.length >= rules.minLength && isValid
		}

		if (rules.maxLength) {
			isValid = value.length <= rules.maxLength && isValid
		}
		return isValid;
	}

	inputChangedHandler = (event, inputIdentifier) => {
		const updateOrderForm = {
			...this.state.orderForm
		}
		const updatedFormElement = {
			...updateOrderForm[inputIdentifier]
		}
		updatedFormElement.value = event.target.value;
		updatedFormElement.valid = this.checkValidation(updatedFormElement.value, updatedFormElement.validation)
		updatedFormElement.touched = true;
		updateOrderForm[inputIdentifier] = updatedFormElement;

		let formIsValid = true;
		for(let inputIdentifier in updateOrderForm){
			formIsValid = updateOrderForm[inputIdentifier].valid && formIsValid
		}
		this.setState({ orderForm: updateOrderForm, formIsValid: formIsValid })
		
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
			<form onSubmit={this.orderHandler}>
				{formElementsArray.map(formElem => (
					<Input
						key={formElem.id}
						invalid={!formElem.config.valid}
						shouldValidate={formElem.config.validation}
						touched={formElem.config.touched}
						elementType={formElem.config.elementType}
						elementConfig={formElem.config.elementConfig}
						vlaue={formElem.config.value}
						changed={(event) => this.inputChangedHandler(event, formElem.id)} />
				))}
				<Button btnType="Success" disabled={this.state.formIsValid} clicked={this.orderHandler}>ORDER</Button>
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