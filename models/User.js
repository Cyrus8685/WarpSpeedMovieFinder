const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://Cyrus:zqnzhVk0O3v8QrTG@warpspeed.6bimxtn.mongodb.net/?retryWrites=true&w=majority&appName=WarpSpeed");

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
        



