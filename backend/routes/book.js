const router = require('express').Router()

const Book = require('../models/book.model')

router.route('/').get((req, res) => {
	const response = {
		action: "get"
	}

	Book.find()
		.exec()
		.then(result => {
			res.status(200).json(result)
		})
		.catch(err => {
			console.log(err)
			res.status(500).json("something wrong")
		})
})




module.exports = router