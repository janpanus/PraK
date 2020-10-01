import ComboBox from "./ComboBox"

class CorporationComboBox extends ComboBox {
	getFetchURL = () => "/prak/api/CorporationIndex"

	generateObjectForMongooseFind = (value) => {
		return { name: `/${value}/` }
	}
	
	parseReturnedObjectFromMongooseFind = (element) => element.name
}

export default CorporationComboBox