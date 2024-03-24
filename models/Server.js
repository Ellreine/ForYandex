const mongoose = require('mongoose')

const ServerSchema = new mongoose.Schema({
	totalMemory: Number,
	usedMemory: Number,
	freeMemory: Number,
	vms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'VirtualMachine' }],
})

module.exports = mongoose.model('Server', ServerSchema)
