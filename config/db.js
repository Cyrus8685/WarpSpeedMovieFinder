const mongoose = require('mongoose');

db = mongoose.connect(process.env.DB_URL);

module.exports = db;