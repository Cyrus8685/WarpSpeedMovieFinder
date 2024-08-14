const { mongoose, Collection } = require('mongoose');

mongoose.connect(process.env.DB_URL);

module.exports = mongoose;