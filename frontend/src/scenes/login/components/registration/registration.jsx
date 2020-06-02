import React from "react"

import { 
	TextField,
	FormControlLabel,
	Switch,
	Button,
} from '@material-ui/core'

import { Pair } from '../../../../components/layout'

import styles from './registration.module.scss'

export default class registrationScene extends React.Component {
	constructor(props){
		super(props)
		
		this.state = { 
			username: "",
			email: "",
			firstName: "",
			secondName: "",
			password: "",
			passwordCheck: "",
			remember: false,
			loginErrors: "",
		}	

		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(event, type = "value"){
		this.setState({
			[event.target.name]: event.target[type]
		})
	}
	
	handleSubmit(event){
		const { username, password, remember } = this.state
		const url = "api/login"
		const data = {
			username,
			password,
			remember,
		}

		console.log("Submit:", data)

		fetch(url, {
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			//mode: 'cors', // no-cors, *cors, same-origin
			//cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			//credentials: 'same-origin', // include, *same-origin, omit
			headers: {
			  'Content-Type': 'application/json'
			},
			//redirect: 'follow', // manual, *follow, error
			//referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
			body: JSON.stringify(data) // body data type must match "Content-Type" header
		})
		.then(response => {
			console.log(response)
		})	

		event.preventDefault()		
	}



	render(){ return(
		<div className={styles.registration}>
			<form onSubmit={this.handleSubmit}>
				<Pair>
					<TextField
					name="username"
					label="username"
					variant="outlined"
					onChange={this.handleChange}
					/>						
					<TextField
						name="email"
						label="email"
						type="email"
						variant="outlined"
						onChange={this.handleChange}
					/>
				</Pair>
				
				<Pair>
					<TextField
						name="firstName"
						label="First name"
						variant="outlined"
						onChange={this.handleChange}
					/>
					<TextField
						name="secondName"
						label="Second name"
						variant="outlined"
						onChange={this.handleChange}
					/>
				</Pair>

				<Pair>
					<TextField
						name="password"
						label="password"
						type="password"
						variant="outlined"
						onChange={this.handleChange}
					/>				
					<TextField
						name="passwordCheck"
						label="password again"
						type="password"
						variant="outlined"
						error={this.state.password !== this.state.passwordCheck}
						helperText={this.state.password !== this.state.passwordCheck ? "passwords are not matching" : ""}
						onChange={this.handleChange}
					/>
				</Pair>
				<Pair>
					<FormControlLabel
						control={
							<Switch
								name="remember"
								checked={this.state.remember}
								onChange={(event)=>{this.handleChange(event, "checked")}}
							/>
						}
						label="remember me"
					/>
					<a href="https://www.authormedia.com/how-to-never-forget-a-password-again/">Forgot password?</a>
				</Pair>
				<Button 
					variant="contained" 
					color="primary" 
					type="submit"
				>
					Register
				</Button>
			</form>
		</div>
	)}
}