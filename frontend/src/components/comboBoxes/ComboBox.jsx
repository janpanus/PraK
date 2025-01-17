import React from "react"
import { Trans } from 'react-i18next'
import { 
	TextField,
	MenuList,
	MenuItem,
	LinearProgress,
	InputAdornment,
	Tooltip,
} from '@material-ui/core'
import {
	Check, 
	SyncDisabled,
} from '@material-ui/icons';

import styles from "./ComboBox.module.scss"

/**
 * TextField that realtime shows seach search results in menu and user cas click on them
 */
class ComboBox extends React.Component {
	constructor(props){
		super(props)

		this.request_v = 0
		this.newestRequest_v = 0
	}

	handleKeyUp = (e) => {
		if(e.key === "Escape"){
			this.setState({value: "", menuList:[]})
		}
	}

	// Abstract functions definitions
	getFetchURL = () => {throw new Error("Calling abstract function")}
	getNewFieldURL = () => {throw new Error("Calling abstract function")}
	labelPostfix = () => ""
	generateObjectForMongooseFind = value => {throw new Error("Calling abstract function")}
	parseReturnedObjectFromMongooseFind = element => {throw new Error("Calling abstract function")}

	/**
	 * Send request to db and show results
	 * @param	{Event}	event 	
	 */
	handleChange = event => {
		this.setState({
			value: event.target.value,
			ID: ""
		})

		if(this.props.onChange) this.props.onChange({target:{value:undefined}})

		this.setState({loading: true})

		const thisRequestVesion = this.request_v++
		fetch(this.getFetchURL(),{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(this.generateObjectForMongooseFind(event.target.value))
		})
		.then(response => {
			if(thisRequestVesion < this.newestRequest_v)
				Promise.reject(`Old request version: ${thisRequestVesion}`)
			this.newestRequest_v = thisRequestVesion
			return response.json()
		})
		.then(data => {
			const tempList = []
			data.forEach(element => {
				tempList.push({
					key: element._id,
					text: this.parseReturnedObjectFromMongooseFind(element),
				})
			})
			this.setState({menuList: tempList, loading: false})
		})
		.catch((error) => {
			console.error('Error:', error);
		})
	
	}

	/**
	 * Save internal state by ID of clicked item
	 * @param	{Object}	value 	
	 */
	handleMenuItemClick = value => {
		this.setState({
			value: value.text,
			name: value.text,
			ID: value.key,
			menuList: [],
		})
		if(this.props.onChange) this.props.onChange({target:{value:value.key}})
	}

	/**
	 * Opens new window for user to create new record
	 * @param	{Object}	value 	
	 */
	openNewFieldWindow = () => {
		const url = this.getNewFieldURL()
		console.info("%cOpening new window\n", "background: #222; color: #bada55", url)
		window.open(url)
	}

	render(){
		const {defaultValue, ...config} = this.props
		return(
			<div>
				<TextField {...config}
					label={this.props.label && this.props.label.length !== 0 ? this.props.label[0].toUpperCase() + this.props.label.slice(1) + this.labelPostfix() : ""}
					onChange={this.handleChange}
					value={this.state.value}
					style={{width: "100%"}}
					inputProps={{
						dbnotsynced: this.state.ID && this.state.value !== "" ? "false" : "true",
					}}
					InputProps={{
						startAdornment: this.state.ID ? (
							<InputAdornment position="start">
								<Tooltip title={(<Trans>comboBoxes.syncedWithDB</Trans>)}>
									<Check style={{color: "#090", fontSize: 20, cursor: "help"}}/>
								</Tooltip>
							</InputAdornment>) : this.state.value !== "" ? (
								<InputAdornment position="start">
									<Tooltip title={(<Trans>comboBoxes.notSyncedWithDB</Trans>)}>
										<SyncDisabled style={{color: "#d00", fontSize: 20, cursor: "help"}}/>
									</Tooltip>
								</InputAdornment>
							) : "",
						...this.props.InputProps
					}}
					onKeyUp={this.handleKeyUp}
				/>
				{this.state.loading && <LinearProgress />}
				<MenuList style={{"paddingTop": 0, "paddingBottom": 0, "boxShadow": "rgba(0, 0, 0, 0.2) 0px 2px 3px 0px"}}>
					{this.state.menuList.map(value=>(
						<MenuItem key={value.key} onClick={() => this.handleMenuItemClick(value)} className={ [styles.menuItem, styles.minimalisticScrollbar].join(" ") }>
							{value.text}
						</MenuItem>
					))}
					{ 	this.state.menuList.length === 0 &&
						this.state.value.length >= 3 &&
						(!this.state.loading)&&
						this.state.ID === "" &&
						<MenuItem key="add_new_field" onClick={this.openNewFieldWindow} style={{background: "#a9dc39"}}>
							<Trans>comboBoxes.addNewRecord</Trans>
						</MenuItem>
					}
				</MenuList>
			</div>
		)
	}
}

export default ComboBox