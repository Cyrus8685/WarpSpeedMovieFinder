const { mongoose } = require('mongoose');

mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:<${process.env.DB_PW}>${process.env.DB_URL}${process.env.DB_NAME}`, {
  useUnifiedTopology: "true"
})

module.exports = mongoose;