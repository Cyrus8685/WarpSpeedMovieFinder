const { mongoose, Collection } = require('../db.js');

    const UserSchema = new mongoose.Schema(
        {
            username: {
                type: String,
                allowNull: false,
                unique: true,
                Collection: "users"
            },
            email: {
                type: String,
                allowNull: false,
                unique: true,
                Collection: "users"
            },
            password: {
                type: String,
                allowNull: false,
                unique: true,
                Collection: "users"
            },

            },
            {
                timestamps: false
            }
        );

        module.exports = User = mongoose.model('user', UserSchema,)
        



