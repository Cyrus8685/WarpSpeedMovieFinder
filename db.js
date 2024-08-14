const { mongoose, Collection } = require('mongoose');

mongoose.connect(`"${process.env.DB_URL}"`, {
  useUnifiedTopology: "true"
})

module.exports = mongoose;