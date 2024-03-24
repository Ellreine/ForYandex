const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const vmRoutes = require('./routes/vmRoutes')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 9024

app.use(bodyParser.json())

mongoose
	.connect(process.env.MONGO_URL, {
		dbName: 'DBforYandexProfessional',
	})
	.then(() => {
		console.log(`MongoDB Connected: ${process.env.MONGO_URL}`)

		app.use('/api/vms', vmRoutes)

		app.use((error, req, res, next) => {
			res.status(error.status || 500).json({ message: error.message })
		})
	})
	.catch(err => console.log(`Database connection error: ${err}`))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
