const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL);

    const UserSchema =  new mongoose.Schema(
        {
            username: {
                type: String,
                allowNull: false,
                unique: true,
            },
            email: {
                type: String,
                allowNull: false,
                unique: true,
            },
            password: {
                type: String,
                allowNull: false,
                unique: true,
            },

            },
            {
                timestamps: false
            }
        );

        module.exports = User = mongoose.model('user', UserSchema,)
        



