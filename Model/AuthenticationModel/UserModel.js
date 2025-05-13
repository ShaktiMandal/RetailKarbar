import mongoose from 'mongoose';

const schema = mongoose.Schema;

const UserSchema = new schema({

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

const UserModel = mongoose.model('Users', UserSchema);
export default UserModel;