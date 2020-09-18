import React from 'react'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.module.css'
import * as actions from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'
import { Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import { updateObject} from '../../shared/utility'

class Auth extends React.Component {

	state = {
		controls: {
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Mail Address'
				},
				value: '',
				validation: {
					required: true,
					isEmail: true
				},
				valid: false,
				touched: false
			},
			password: {
				elementType: 'input',
				elementConfig: {
					type: 'password',
					placeholder: 'Password'
				},
				value: '',
				validation: {
					required: true,
					minLength: 6
				},
				valid: false,
				touched: false
			}
		},
		isSignup: true
	}

	componentDidMount(){
		if (!this.props.buildingBurger && this.props.authRedirectPath !== '/'){
			this.props.onSetAuthRedirectPath();
		}
	}

	checkValidation(value, rules) {
		let isValid = true;
		if (!rules) {
			return true;
		}

		if (rules.required) {
			isValid = value.trim() !== '' && isValid;
		}

		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid
		}

		if (rules.maxLength) {
			isValid = value.length <= rules.maxLength && isValid
		}

		if (rules.isEmail) {
			const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
			isValid = pattern.test(value) && isValid
		}

		if (rules.isNumeric) {
			const pattern = /^\d+$/;
			isValid = pattern.test(value) && isValid
		}

		return isValid;
	}

	inputChangedHandler = (event,controlName) =>{
		const updatedControls = updateObject(this.state.controls,{
			[controlName]: {
				...this.state.controls[controlName],
				value: event.target.value,
				valid: this.checkValidation(event.target.value, this.state.controls[controlName].validation),
				touched: true,
			}
		})
		this.setState({controls: updatedControls})
	}

	submitHandler = (event) =>{
		event.preventDefault()
		this.props.onAuth(
			this.state.controls.email.value, 
			this.state.controls.password.value,
			this.state.isSignup)
	}

	switchAuthModeHandler = () =>{
		this.setState(prevState =>{
			return { isSignup: !prevState.isSignup}
		})
	}

	render() {
		const formElementsArray = []
		for (let key in this.state.controls) {
			formElementsArray.push({
				id: key,
				config: this.state.controls[key]
			})
		}
		let form = formElementsArray.map(formElem => {
			return <Input
				key={formElem.id}
				invalid={!formElem.config.valid}
				shouldValidate={formElem.config.validation}
				touched={formElem.config.touched}
				elementType={formElem.config.elementType}
				elementConfig={formElem.config.elementConfig}
				vlaue={formElem.config.value}
				changed={(event) => this.inputChangedHandler(event, formElem.id)}
			/>
		})

		if(this.props.loading){
			form = <Spinner/>
		}

		let errorMessage = null;

		if(this.props.error) {
			errorMessage = (
			<p>{this.props.error.message}</p>
			)
		}

		let authRedirect = null;

		if(this.props.isAuthentecated){
			authRedirect = <Redirect to={this.props.authRedirectPath}/>
		}

		return (
			<div className={classes.Auth}>
				{authRedirect}
				{errorMessage}
				<form onSubmit = {this.submitHandler}>
					{form}
					<Button btnType="Success">Submit</Button>
					
				</form>
				<Button 
					clicked={this.switchAuthModeHandler}
					btnType="Danger">Switch to {this.state.isSignup? 'SIGNIN' : 'SIGNUP'}</Button>
			</div>
		)
	}
}

const mapDispatchToProps = dispatch =>{
	return{
		onAuth: (email, password, isSignup) => { dispatch(actions.auth(email, password, isSignup))},
		onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
	}
}

const mapStateToProps = state => {
	return {
		loading: state.auth.loading,
		error: state.auth.error,
		isAuthentecated: state.auth.token !== null,
		burgerBuilder: state.burgerBuilder.building,
		authRedirectPath: state.auth.authRedirectPath
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth)