import React from "react"
import parse from 'html-react-parser'

import CircularProgress from '@material-ui/core/CircularProgress'

class LoadPageFromDB extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			html: "",
		}
	}

	componentDidUpdate(prevProps, prevState){
		if(prevProps.pageName !== this.props.pageName){
			this.loadPage(this.props.pageName)
		}
	}

	componentDidMount(){
		this.loadPage(this.props.pageName)
	}

	loadPage = (pageName) => {
		const url = `/prak/api/pages/cz/${pageName}`

		fetch(url, {
			method: 'GET',
		})
		.then(response => {
			if(!response.ok)
				throw response
			return response.json()
		})
		.then(response => {
			this.setState({html: response.cz || "--- Empty Page ---"})
		})
		.catch((error) => {
			console.info("%cPages loading unsuccesful\n", "background: #222; color: #bada55", error)
			this.setState({html: "Unable to load page"})
		})
	}

	render(){
		return(
			<div style={{ margin:"50px", padding:"20px" }}>
				{ this.state.html === "" 
					? <CircularProgress color="primary"/>
					: parse(this.state.html)
				}
			</div>
		)
	}
}

export default LoadPageFromDB