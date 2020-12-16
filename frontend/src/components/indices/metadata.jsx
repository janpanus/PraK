import React from "react"
import { withRouter } from 'react-router-dom'
import { withSnackbar } from 'notistack'
import {
	Paper,
	Select,
	TextField,
	Button,
	InputLabel,
	MenuItem,
	FormControl,
} from '@material-ui/core'
import {
	MetadataComboBox,
	CorporationComboBox,
//	CreationComboBox,
//	FamilyComboBox,
	GeographicComboBox,
	KeywordComboBox,
	PersonComboBox,
//	SubjectComboBox,
	StaticOpenComboBox,
	StaticComboBox,
	FormStaticComboBox,
} from '../comboBoxes'
import ISBNField from '../validationTextFields/ISBNField'
import DateField from '../validationTextFields/DateField'
import RegExpField from '../validationTextFields/RegExpField'
import Multiplier from '../Multiplier'
import IndexParent from "./indexParent"
import styles from './parent.module.scss'
import typeDefinitionFile from './metadataTypes.json'
import LabeledCheckbox from "../LabeledCheckbox"

class Metadata extends IndexParent {
	constructor(props){
		super(props)

		this.formData.documentType = this.props.defaults ? this.props.defaults.documentType : 0
		
		this.state = {
			documentType: this.formData.documentType,
		}

		this.indexURL = "metadata"
	}

	conditionalField = fieldName => this.getTypeDefinition(fieldName).fields[this.state.documentType] === 1

	getTypeDefinition = fieldName => typeDefinitionFile.properties[fieldName]

	render(){
		return(
			<form
				onSubmit={this.handleSubmit}
				className={styles.main}
				onKeyPress={event => { if (event.which === 13) event.preventDefault()}}
			>
				<Paper className={styles.header}>
					{this.props.defaults
						? <h1>Editace záznamu v Rejstříku metadat</h1>
						: <h1>Nový záznam do Rejstříku metadat</h1>
					}
				</Paper>
				<div className={styles.body}>
				<Paper className={styles.dataBlock}>
					<FormControl>
						<InputLabel id="selectTypeLabel">Type</InputLabel>
						<Select
							labelId="selectTypeLabel"
							name="documentType"
							value={this.state.documentType}
							onChange={(e) => {
								this.setState({documentType: e.target.value})
								this.formData.documentType = e.target.value
							}}
						>
							{typeDefinitionFile.types.map((value, index) => {
								return <MenuItem key={index} value={index}>{value}</MenuItem>
							})}
						</Select>
					</FormControl>
				</Paper>
				<Paper className={styles.dataBlock}>
					{this.conditionalField("author") && <PersonComboBox {...this.createFieldProps("author")}/>}
					{this.conditionalField("author_role") && <StaticComboBox {...this.createFieldProps("author_role")}/>}
					<Multiplier>
						{this.conditionalField("other_authors") && <PersonComboBox {...this.createFieldProps("other_authors")}/>}
						{this.conditionalField("other_authors_role") && <StaticComboBox {...this.createFieldProps("other_authors_role")}/>}
					</Multiplier>
					{this.conditionalField("name") && <TextField {...this.createFieldProps("name")}/>}
					{this.conditionalField("author_responsibility") && <TextField {...this.createFieldProps("author_responsibility")}/>}
					<Multiplier>{this.conditionalField("other_names") && <TextField {...this.createFieldProps("other_names")}/>}</Multiplier>
					<Multiplier>{this.conditionalField("language") && <StaticComboBox {...this.createFieldProps("language")}/>}</Multiplier>
					<Multiplier>
						{this.conditionalField("publish_country") && <StaticComboBox {...this.createFieldProps("publish_country")}/>}
						{this.conditionalField("publish_place") && <GeographicComboBox {...this.createFieldProps("publish_place")}/>}
						{this.conditionalField("publisher") && <CorporationComboBox {...this.createFieldProps("publisher")}/>}
					</Multiplier>
					<Multiplier>
						{this.conditionalField("publishing_date") && <RegExpField {...this.createFieldProps("publishing_date")}/>}
						{this.conditionalField("publishing_date_note") && <TextField  {...this.createFieldProps("publishing_date_note")}/>}
						{this.conditionalField("publishing_date_notAccurate") && <LabeledCheckbox {...this.createFieldProps("publishing_date_notAccurate")}/>}
					</Multiplier>
				</Paper>
				<Paper className={styles.dataBlock}>
					<Multiplier>{this.conditionalField("isbn") && <ISBNField {...this.createFieldProps("isbn")}/>}</Multiplier>
					<Multiplier>{this.conditionalField("edition_order") && <TextField  {...this.createFieldProps("edition_order")}/>}</Multiplier>
					<Multiplier>{this.conditionalField("edition") && <TextField  {...this.createFieldProps("edition")}/>}</Multiplier>
					<Multiplier>{this.conditionalField("action_name") && <CorporationComboBox  {...this.createFieldProps("action_name")}/>}</Multiplier>
					<Multiplier>{this.conditionalField("volume_content") && <TextField  {...this.createFieldProps("volume_content")}/>}</Multiplier>
					<Multiplier>
						{this.conditionalField("publishing_year_from") && <TextField {...this.createFieldProps("publishing_year_from")}/>}
						{this.conditionalField("publishing_year_to") && <TextField  {...this.createFieldProps("publishing_year_to")}/>}
						{this.conditionalField("publishing_year_note") && <TextField  {...this.createFieldProps("publishing_year_note")}/>}
						{this.conditionalField("periodicity") && <StaticComboBox  {...this.createFieldProps("periodicity")}/>}
					</Multiplier>
					<Multiplier>{this.conditionalField("issn") && <RegExpField  {...this.createFieldProps("issn")}/>}</Multiplier>
					{this.conditionalField("source_document_name") && <MetadataComboBox {...this.createFieldProps("source_document_name")}/>}
					{this.conditionalField("year") && <TextField  {...this.createFieldProps("year")}/>}
					{this.conditionalField("volume") && <TextField  {...this.createFieldProps("volume")}/>}
					{this.conditionalField("number") && <TextField  {...this.createFieldProps("number")}/>}
					{this.conditionalField("date") && <DateField  {...this.createFieldProps("date")}/>}
					<Multiplier>
						{this.conditionalField("corporation_name") && <CorporationComboBox {...this.createFieldProps("corporation_name")}/>}
						{this.conditionalField("access_conditions") && <StaticComboBox  {...this.createFieldProps("access_conditions")}/>}
						{this.conditionalField("acces_note") && <TextField  {...this.createFieldProps("acces_note")}/>}
					</Multiplier>
				</Paper>
				<Paper className={styles.dataBlock}> <h2>Umístění</h2>
					<Multiplier>
						{this.conditionalField("location_in_institution") && <TextField {...this.createFieldProps("location_in_institution")}/>}
						{this.conditionalField("location_in_fund") && <TextField  {...this.createFieldProps("location_in_fund")}/>}
						{this.conditionalField("location_note") && <TextField  {...this.createFieldProps("location_note")}/>}
					</Multiplier>
					<Multiplier>{this.conditionalField("digitized_document_url") && <TextField  {...this.createFieldProps("digitized_document_url")}/>}</Multiplier>
					<Multiplier>
						{this.conditionalField("external_source_name") && <MetadataComboBox  {...this.createFieldProps("external_source_name")}/>}
						{this.conditionalField("external_source_url") && <TextField  {...this.createFieldProps("external_source_url")}/>}
						{this.conditionalField("url_leading_to_document") && <TextField  {...this.createFieldProps("url_leading_to_document")}/>}
					</Multiplier>
				</Paper>
				<Paper className={styles.dataBlock}>
					<Multiplier>
						{this.conditionalField("attachment_name") && <TextField  {...this.createFieldProps("attachment_name")}/>}
						{this.conditionalField("attachment_url") && <TextField  {...this.createFieldProps("attachment_url")}/>}
					</Multiplier>
					<Multiplier>{this.conditionalField("described_object_citation") && <MetadataComboBox  {...this.createFieldProps("described_object_citation")}/>}</Multiplier>
					{this.conditionalField("previous_name") && <MetadataComboBox  {...this.createFieldProps("previous_name")}/>}
					{this.conditionalField("following_name") && <MetadataComboBox  {...this.createFieldProps("following_name")}/>}
				</Paper>
				<Paper className={styles.dataBlock}>
					<Multiplier>{this.conditionalField("form") && <FormStaticComboBox  {...this.createFieldProps("form")}/>}</Multiplier>
					{this.conditionalField("range") && <TextField  {...this.createFieldProps("range")}/>}
					{this.conditionalField("dimension") && <TextField {...this.createFieldProps("dimension")}/>} 
					<Multiplier>{this.conditionalField("map_scale") && <TextField {...this.createFieldProps("map_scale")}/>}</Multiplier>
					{this.conditionalField("format") && <TextField  {...this.createFieldProps("format")}/>}
					{this.conditionalField("processing_level") && <StaticComboBox  {...this.createFieldProps("processing_level")}/>}
					{this.conditionalField("description_level") && <StaticComboBox  {...this.createFieldProps("description_level")}/>}
					<Multiplier>{this.conditionalField("archival_aids") && <MetadataComboBox {...this.createFieldProps("archival_aids")}/>}</Multiplier>
					<Multiplier>{this.conditionalField("source_citation") && <MetadataComboBox {...this.createFieldProps("source_citation")}/>}</Multiplier>
					<Multiplier>
						{this.conditionalField("multiple_placement") && <CorporationComboBox {...this.createFieldProps("multiple_placement")}/>} 
						{this.conditionalField("multiple_placement_url") && <TextField {...this.createFieldProps("multiple_placement_url")}/>} 
					</Multiplier>
					<Multiplier>{this.conditionalField("topic") && <KeywordComboBox {...this.createFieldProps("topic")}/>}</Multiplier>
					<Multiplier>{this.conditionalField("corporation_content_specification_person") && <PersonComboBox {...this.createFieldProps("corporation_content_specification_person")}/>}</Multiplier>
					<Multiplier>{this.conditionalField("corporation_content_specification_corporation") && <CorporationComboBox {...this.createFieldProps("corporation_content_specification_corporation")}/>}</Multiplier>
					<Multiplier>{this.conditionalField("chronological_content_specification_begin") && <TextField {...this.createFieldProps("chronological_content_specification_begin")}/>}</Multiplier>
					<Multiplier>{this.conditionalField("chronological_content_specification_end") && <TextField {...this.createFieldProps("chronological_content_specification_end")}/>}</Multiplier>
					<Multiplier>{this.conditionalField("geographical_content_specification") && <GeographicComboBox {...this.createFieldProps("geographical_content_specification")}/>}</Multiplier>
					<Multiplier>{this.conditionalField("keywords") && <KeywordComboBox  {...this.createFieldProps("keywords")}/>}</Multiplier>
					<Multiplier>{this.conditionalField("description") && <TextField  {...this.createFieldProps("description")}/>}</Multiplier>
				</Paper>
				<Paper className={styles.dataBlock}>
					<Multiplier>{this.conditionalField("general_note") && <TextField {...this.createFieldProps("general_note")}/>}</Multiplier>
					<Multiplier>{this.conditionalField("editor_note") && <TextField {...this.createFieldProps("editor_note")}/>}</Multiplier>
					{this.conditionalField("submitter") && <StaticOpenComboBox  {...this.createFieldProps("submitter")}/>}
				</Paper>
				</div>
				<Button className={styles.footer} type="submit" variant="contained" color="primary" onClick={this.send}>Nahrát</Button>
			</form>
		)
	}
}

export default withSnackbar(withRouter(Metadata))