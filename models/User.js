const mongoose = require('mongoose'); 
    const UserSchema = new mongoose.Schema(
        {
            username: {
                type: String,
                allowNull: false,
                unique: true
            },
            email: {
                type: String,
                allowNull: false,
                unique: true
            },
            password: {
                type: String,
                allowNull: false,
                unique: true
            },

            },
            {
                timestamps: false
            }
        );

        const User = mongoose.model('User', UserSchema);
        




