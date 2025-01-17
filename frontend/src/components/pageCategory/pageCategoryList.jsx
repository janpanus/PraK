import React from "react"
import { withTranslation } from 'react-i18next'

import styles from "./pageCategory.module.scss"
import { PageCategoryView } from "."

class PageCategoryList extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			pageCategory: []
		}
	}

	componentDidUpdate(prevProps, prevState){
		if(prevProps.pageCategoryName !== this.props.pageCategoryName){
			this.loadpageCategory(this.props.pageCategoryName)
		}
	}

	componentDidMount(){
		this.loadpageCategory(this.props.pageCategoryName)
	}

	/**
	 * Loads list of pages with specific category
	 * @param  {String} category Category name
	 */
	loadpageCategory = (category) => {
		const url = "/prak/api/pages"
		const body = { category, language: "cz" }

		fetch(url, {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify({ ...body, _limit: 50 })
		})
		.then(response => {
			if(!response.ok)
				throw response
			return response.json()
		})
		.then(response => {
			this.setState({ pageCategory: response })
		})
		.catch((error) => {
			console.info("%cPages loading unsuccesful\n", "background: #222; color: #bada55", error)
		})
	}

	render(){
		const { t } = this.props
		return(
			<div className={styles.PageCategoryList}>
				<h1><center>{t("pageCategory.category")} - {t(`pageCategory.${this.props.pageCategoryName}`)}</center></h1>
				{this.state.pageCategory.map((value, key) => (<PageCategoryView key={key} data={value}/>))}
			</div>
		)
	}
}

const WithHooks = withTranslation()(PageCategoryList)
export default function TranslatedComponent(props) { return (
	<React.Suspense fallback="">
		<WithHooks {...props}/>
	</React.Suspense>
)}