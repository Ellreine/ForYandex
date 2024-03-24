const mongoose = require('mongoose')

const VMSchema = new mongoose.Schema({
	size: Number,
	task: String,
	server: { type: mongoose.Schema.Types.ObjectId, ref: 'Server' },
})

module.exports = mongoose.model('VirtualMachine', VMSchema)
