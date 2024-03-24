const express = require('express')
const router = express.Router()
const VirtualMachine = require('../models/VirtualMachine')
const placementManager = require('../utils/placementManager')
const Server = require('../models/Server')

router.post('/', async (req, res) => {
	try {
		const placementResult = await placementManager.placeVM(req.body)
		res.json(placementResult)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
})

router.post('/servers', async (req, res) => {
	try {
		const { totalMemory } = req.body
		const newServer = new Server({
			totalMemory,
			usedMemory: 0,
			freeMemory: totalMemory,
			vms: [],
		})

		await newServer.save()
		res.status(201).json(newServer)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
})
module.exports = router
