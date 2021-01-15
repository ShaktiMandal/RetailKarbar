const mongoose = require("mongoose");
const Schema  = mongoose.Schema;

const UserSchema = new Schema({

    UserId:
    {
        type: Number,
        required: true
    }, 
    Passcode:
    {
        type: String,
        required: true
    },
    ConfPasscode:
    {
        type: String,
        required: true
    }
});

module.exports = UserModel = mongoose.model('Users', UserSchema);