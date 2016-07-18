var mongoose = require('mongoose')

var KillSchema = new mongoose.Schema({
	killer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
	victim: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
	time: { type: Date, default: Date.now }
});

mongoose.model('Kill', KillSchema)