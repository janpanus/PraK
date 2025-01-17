import React from "react"
import { withRouter } from 'react-router-dom'
import { withSnackbar } from 'notistack'
import {
	TextField,
	Button,
	Paper,
	Tooltip,
} from '@material-ui/core'
import {
	HelpOutline
} from '@material-ui/icons'

import {
	CorporationComboBox,
	CreationComboBox,
	GeographicComboBox,
	KeywordComboBox,
	PersonComboBox,
	SubjectComboBox,
	FamilyComboBox,
	StaticComboBox,
	SubmitterComboBox,
} from '../comboBoxes'
import DateField from '../validationTextFields/DateField'
import RegExpField from '../validationTextFields/RegExpField'
import IndexParent from "./indexParent"
import styles from './parent.module.scss'
import typeDefinitionFile from './personTypes.json'
import Multiplier from '../Multiplier'
import LabeledCheckbox from "../LabeledCheckbox"
import MetadataComboBox from "components/comboBoxes/MetadataComboBox"
import FoldablePaper from "../../components/FoldablePaper"
import UploadFile from "../../components/UploadFile"

class Person extends IndexParent {
	constructor(props){
		super(props)

		this.state = {
			helpersVisible: false,
		}

		this.indexURL = "person"
	}

	getTypeDefinition = fieldName => typeDefinitionFile.properties[fieldName]

	render(){
		return(
			<form
				onSubmit={this.handleSubmit}
				className={styles.main}
				onKeyPress={event => { if (event.which === 13) event.preventDefault() }}
			>
				<Paper className={styles.header}>
					{this.props.defaults
						? <h1>Editace záznamu v Rejstříku osob</h1>
						: <h1>Nový záznam do Rejstříku osob</h1>
					}
					<Tooltip title={"Zobrazit / Schovat nápovědy"}>
						<HelpOutline className={styles.allHelpers} onClick={()=>this.setState({helpersVisible: !this.state.helpersVisible}) }/>
					</Tooltip>
				</Paper>
				<div className={styles.body}>
					<FoldablePaper className={styles.dataBlock}> <h2>Preferované označení</h2>
						<TextField {...this.createFieldProps("name")}/>
						<TextField {...this.createFieldProps("surname")}/>
						<TextField {...this.createFieldProps("born_year")}/><LabeledCheckbox {...this.createFieldProps("born_year_notKnown")}/>
						<RegExpField {...this.createFieldProps("born_date")}/><LabeledCheckbox {...this.createFieldProps("born_date_notKnown")}/>
						<GeographicComboBox {...this.createFieldProps("born_place")}/>
						<TextField {...this.createFieldProps("death_year")}/><LabeledCheckbox {...this.createFieldProps("death_year_notKnown")}/>
						<RegExpField {...this.createFieldProps("death_date")}/><LabeledCheckbox {...this.createFieldProps("death_date_notKnown")}/>
						<GeographicComboBox {...this.createFieldProps("death_place")}/>
						<TextField {...this.createFieldProps("initials")}/>
						<TextField {...this.createFieldProps("roman_numerals")}/>
						<KeywordComboBox {...this.createFieldProps("general_complement")}/>
						<GeographicComboBox {...this.createFieldProps("geographical_complement")}/>
						<TextField {...this.createFieldProps("chronological_complement")}/>
					</FoldablePaper>
					<FoldablePaper className={styles.dataBlock}> <h2>Variantní označení</h2>
						<Multiplier>
							<StaticComboBox {...this.createFieldProps("variant_type")}/>
							<TextField {...this.createFieldProps("variant_value")}/>
							<KeywordComboBox {...this.createFieldProps("variant_general_complement")}/>
							<GeographicComboBox {...this.createFieldProps("variant_geographical_complement")}/>
							<TextField {...this.createFieldProps("variant_chronological_complement")}/>
						</Multiplier>
					</FoldablePaper>
					<FoldablePaper className={styles.dataBlock}> <h2>Tituly</h2>
						<Multiplier>
							<TextField {...this.createFieldProps("title")}/>
							<DateField {...this.createFieldProps("date")}/>
						</Multiplier>
					</FoldablePaper>
					<FoldablePaper className={styles.dataBlock}> <h2>Pohlaví</h2>
						<StaticComboBox {...this.createFieldProps("gender")}/>
					</FoldablePaper>
					<FoldablePaper className={styles.dataBlock}> <h2>Biografická poznámka</h2>
						<TextField {...this.createFieldProps("bibliographical_note")}/>
					</FoldablePaper>
					<FoldablePaper className={styles.dataBlock}> <h2>Životopis</h2>
						<TextField {...this.createFieldProps("cv")}/>
					</FoldablePaper>
					<FoldablePaper className={styles.dataBlock}> <h2>Obor působnosti</h2>
						<Multiplier><KeywordComboBox {...this.createFieldProps("domain_branch")}/></Multiplier>
					</FoldablePaper>
					<FoldablePaper className={styles.dataBlock}> <h2>Příslušnost k zemi</h2>
						<Multiplier><GeographicComboBox {...this.createFieldProps("related_country")}/></Multiplier>
					</FoldablePaper>
					<FoldablePaper className={styles.dataBlock}> <h2>Určení jazykové oblasti</h2>
						<Multiplier><StaticComboBox {...this.createFieldProps("language_country")}/></Multiplier>
					</FoldablePaper>
					<FoldablePaper className={styles.dataBlock}> <h2>Vztahy a události</h2>
						<Multiplier><PersonComboBox {...this.createFieldProps("parents")}/></Multiplier>
						<Multiplier><PersonComboBox {...this.createFieldProps("siblings")}/></Multiplier>
						<Multiplier><FamilyComboBox {...this.createFieldProps("family")}/></Multiplier>
						<Multiplier><CorporationComboBox {...this.createFieldProps("membreship")}/></Multiplier>
						<Multiplier><KeywordComboBox {...this.createFieldProps("employment")}/></Multiplier>
						<Multiplier><CorporationComboBox {...this.createFieldProps("affiliation")}/></Multiplier>
						<Multiplier><CreationComboBox {...this.createFieldProps("important_creation")}/></Multiplier>
						<Multiplier><SubjectComboBox {...this.createFieldProps("important_event")}/></Multiplier>
						<Multiplier>
							<TextField {...this.createFieldProps("marriage_start")}/>
							<TextField {...this.createFieldProps("marriage_end")}/>
						</Multiplier>
						<Multiplier><CorporationComboBox {...this.createFieldProps("study")}/></Multiplier>
					</FoldablePaper>
					<FoldablePaper className={styles.dataBlock}> <h2>Vyobrazení</h2>
						<Multiplier><MetadataComboBox {...this.createFieldProps("arm")}/></Multiplier>
						<Multiplier><MetadataComboBox {...this.createFieldProps("photo")}/></Multiplier>
					</FoldablePaper>
					<FoldablePaper className={styles.dataBlock}> <h2>Poznámky</h2>
						<Multiplier><TextField {...this.createFieldProps("public_note")}/></Multiplier>
						<Multiplier><TextField {...this.createFieldProps("nonpublic_note")}/></Multiplier>
					</FoldablePaper>
					<FoldablePaper className={styles.dataBlock}> <h2>Jiný zdroj</h2>
						<Multiplier>
							<TextField {...this.createFieldProps("other_source_name")}/>
							<TextField {...this.createFieldProps("other_source_id")}/>
							<TextField {...this.createFieldProps("other_source_identificator")}/>
						</Multiplier>
					</FoldablePaper>
					<FoldablePaper className={styles.dataBlock}> <h2>Zdroje o heslu</h2>
						<Multiplier><TextField {...this.createFieldProps("record_sources")}/></Multiplier>
						<Multiplier><TextField {...this.createFieldProps("editor_note")}/></Multiplier>
						<SubmitterComboBox  {...this.createFieldProps("submitter")}/>
					</FoldablePaper>
					<FoldablePaper className={styles.dataBlock}> <h2>Přílohy</h2>
						<Multiplier>
							<UploadFile {...this.createFieldProps("attachment_url")}/>
							<TextField {...this.createFieldProps("attachment_description")}/>
						</Multiplier>
					</FoldablePaper>
				</div>
				<Button className={styles.footer} type="submit" variant="contained" color="primary" onClick={this.send}>Nahrát</Button>
			</form>
		)
	}
}

export default withSnackbar(withRouter(Person))