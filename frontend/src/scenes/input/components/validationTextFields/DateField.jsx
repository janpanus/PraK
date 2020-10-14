import React from "react"

import { 
	TextField,
} from '@material-ui/core'


class DateField extends React.Component {
	constructor(props){
		super(props)
		
		this.state = {
			value: "",
			error: false,
		}	

		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(event){
		const regex = /^\d{1,2}[/,.]\d{1,2}[/,.]\d{2,4}$/

		this.setState({
			value: event.target.value,
			error: event.target.value.length !== 0 && !regex.test(event.target.value)
		})

		if(this.props.onChange) this.props.onChange(event)
	}	

	render(){
		return(
			<TextField
				name={ this.props.name }
				label={ this.props.label }
				required={ this.props.required }
				onChange={ this.handleChange }
				error={ this.state.error }
				helperText={ this.state.error ? this.props.errorMessage || "Invalid Date, use format ##.##.####" : "" }
			/>			
		)
	}
}

export default DateField