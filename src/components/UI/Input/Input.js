import React from 'react'
import classes from './Input.module.css'

const Input = (props) => {
	let inputElement = null;

	switch (props.elementType) {
		case ('input'):
			inputElement = <input
				{...props.elementConfig}
				value={props.value}
				className={classes.InputElement} />
			break;
		case ('textarea'):
			inputElement = <textarea
				{...props.elementConfig}
				value={props.value}
				className={classes.InputElement} />
			break;
		case ('select'):
			inputElement= (
				<select 
					className={classes.InputElement}
					value = {props.value}>
						{props.elementConfig.options.map(option =>(
							<option key={option.value} value={option.value}>{option.displayedValue}</option> 
						))}
				</select>
			);
			break;
		default:
			inputElement = <input
				{...props.elementConfig}
				value={props.value}
				className={classes.InputElement} />
	}

	return (
		<div className={classes.Input}>
			<label className={classes.Label}>{props.label}</label>
			{inputElement}
		</div>
	)
}

export default Input;

