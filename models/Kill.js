var mongoose = require('mongoose')

var KillSchema = new mongoose.Schema({
	killer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
	victim: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
});

mongoose.model('Kill', KillSchema)