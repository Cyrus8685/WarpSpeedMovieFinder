const mongoose = require('mongoose');

db = mongoose.connect("mongodb+srv://Cyrus:zqnzhVk0O3v8QrTG@warpspeed.6bimxtn.mongodb.net/?retryWrites=true&w=majority&appName=WarpSpeed");

module.exports = db;