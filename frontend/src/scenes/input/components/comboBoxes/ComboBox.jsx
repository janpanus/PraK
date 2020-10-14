import React from "react"

import { 
	TextField,
	MenuList,
	MenuItem,
	LinearProgress,
	InputAdornment,
} from '@material-ui/core'
import {
	Check
} from '@material-ui/icons';


class ComboBox extends React.Component {
	constructor(props){
		super(props)
		
		this.state = {
			value: "",
			name: "",
			ID: "",
			menuList: [],
			loading: false,
		}
	}

	getFetchURL = () => {throw new Error("Calling abstract function")}

	generateObjectForMongooseFind = value => {throw new Error("Calling abstract function")}
	
	parseReturnedObjectFromMongooseFind = element => {throw new Error("Calling abstract function")}

	handleChange = event => {
		this.setState({
			value: event.target.value,
			ID: ""
		})
		if(this.props.onChange) this.props.onChange({target:{value:undefined}})

		if(event.target.value.length > 2){
			this.setState({loading: true})
			fetch(this.getFetchURL(),{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(this.generateObjectForMongooseFind(event.target.value))
			})
			.then(response => response.json())
			.then(data => {
				const tempList = []
				data.forEach(element => {
					tempList.push({
						key: element._id,
						text: this.parseReturnedObjectFromMongooseFind(element),
					})
				})
				this.setState({menuList: tempList})
			})
			.catch((error) => {
				console.error('Error:', error);
			})
			.finally(() => {
				this.setState({loading: false})
			})
		}
	}

	handleMenuItemClick = value => {
		this.setState({
			value: value.text,
			name: value.text,
			ID: value.key,
			menuList: [],
		})
		if(this.props.onChange) this.props.onChange({target:{value:value.key}})
	}

	openNewFieldWindow = () => {
		console.log("here")
	}

	render(){
		return(
			<div>
				<TextField
					name={this.props.name}
					label={this.props.label}
					required={this.props.required}
					onChange={this.handleChange}
					value={this.state.value}
					style={{width: "100%"}}
					InputProps={{
						realvalue:this.state.ID,
						startAdornment: this.state.ID ? (
							<InputAdornment position="start">
								<Check />
							</InputAdornment>) : ""
					  }}
				/>
				{this.state.loading && <LinearProgress />}
				<MenuList style={{"paddingTop": 0, "paddingBottom": 0, "boxShadow": "rgba(0, 0, 0, 0.2) 0px 2px 3px 0px"}}>
					{this.state.menuList.map(value=>(
						<MenuItem key={value.key} onClick={() => this.handleMenuItemClick(value)}>
							{value.text}
						</MenuItem>
					))}
					{ this.state.menuList.length === 0 && this.state.value.length >= 3 && (!this.state.loading) && this.state.ID === "" &&
						<MenuItem key="add_new_field" onClick={this.openNewFieldWindow} style={{background: "#a9dc39"}}>
							+ Přidat nový záznam
						</MenuItem>
					}
				</MenuList>
			</div>
		)
	}
}

export default ComboBox