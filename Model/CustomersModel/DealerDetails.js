import mongoose from 'mongoose';

const schema = mongoose.Schema;

const DealerSchema = new schema({

    DealerId:{
        type: String,
        required: true
    },

    OrderId:{
        type: String,
        required: true
    },

    CompanyName:
    {
        type: String,
        required: true
    },
    DealerName:
    {
        type: String,
        required: true
    },
    PhoneNumber:
    {
        type: Number,
        required: true
    }
})

const DealersModel = mongoose.model('Dealers', DealerSchema);

export default DealersModel;
