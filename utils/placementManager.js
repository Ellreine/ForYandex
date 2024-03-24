const Server = require('../models/Server')
const VirtualMachine = require('../models/VirtualMachine')

async function placeVM({ size, task }) {
	const server = await Server.findOne({
		freeMemory: { $gte: size },
	})
	console.log('Поиск сервера для размещения VM')
	if (!server) {
		console.log('Подходящий сервер на найден')
		return { result: 'NOT_OK' }
	} else {
		console.log('Сервер найден')
	}

	const newVM = new VirtualMachine({ size, task, server: server._id })
	await newVM.save()

	server.usedMemory += size
	server.freeMemory -= size
	server.vms.push(newVM._id)
	await server.save()

	return { result: 'OK', host_id: server._id.toString() }
}

module.exports = { placeVM }
