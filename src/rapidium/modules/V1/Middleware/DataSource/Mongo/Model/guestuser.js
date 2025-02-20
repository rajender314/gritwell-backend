var mongoose = require('mongoose'),
	modelName = 'guestuser',
	schemaDefinition = require('../Schema/' + modelName),
	schemaInstance = mongoose.Schema(schemaDefinition),
	modelInstance = mongoose.model(modelName, schemaInstance);

module.exports = modelInstance;
