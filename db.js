const { mongoose } = require('mongoose');

mongoose.connect(`mongodb+srv://Cyrus:39sRx9dFzpDX8PB5@warpspeed.6bimxtn.mongodb.net/?retryWrites=true&w=majority&appName=WarpSpeed`, {
  useUnifiedTopology: "true"
})

module.exports = mongoose;