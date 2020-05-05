const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
	author: mongoose.Types.ObjectId,
	other_authors: mongoose.Types.ObjectId,
	name: {
		type: String,
		unique: true,
		required: true
	},
	other_names: String,
	language: String,
	publish_country: mongoose.Types.ObjectId,
	publish_place: mongoose.Types.ObjectId,
	publisher: mongoose.Types.ObjectId,
	publishing_date: [{
		date: {
			type: Number,
			required: true
		},
		note: String
	}],
	isbn: String,
	edition_order: String,
	edition: String,
	action_name: mongoose.Types.ObjectId,
	volume_content: mongoose.Types.ObjectId,
	publishing_year: [{
		from: Number,
		to: Number,
		note: String,
		periodicity: String
	}],
	issn: String,
	source_document_name: String,
	year: Number,
	volume: Number,
	number: Number,
	date: Date,
	corporation_name: mongoose.Types.ObjectId,
	location: [{
		institution: mongoose.Types.ObjectId,
		fund: String,
		access_conditions: String
	}],
	digitized_document_url: String,
	external_source: [{
		name: String,
		url: String,
		url_leading_to_document: String
	}],
	attachment: [{
		name: String,
		url: String
	}],
	previous_name: mongoose.Types.ObjectId,
	following_name: mongoose.Types.ObjectId,
	form: String,
	range: String,
	dimension: String,
	map_scale: String,
	format: String,
	processing_level: String,
	archival_aids: String,
	topic: mongoose.Types.ObjectId,
	corporation_content_specification: mongoose.Types.ObjectId,
	chronological_content_specification: String,
	geographical_content_specification: mongoose.Types.ObjectId,
	keywords: mongoose.Types.ObjectId,
	description: String,
	general_note: String,
	editor_note: String,
	submitter: {
		type: String,
		required: true
	}
});

const model = mongoose.model('metadata', bookSchema);

module.exports = model