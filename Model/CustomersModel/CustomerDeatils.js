import mongoose from 'mongoose';

const schema = mongoose.Schema;

const CustomerDetailsSchema = new schema({
    CustomerName: {
        type: String,
        required: true
    },
    PhoneNumber: {
        type: Number,
        required: true
    },
    CustomerId: {
        type: String,
        required: true
    }
});

const CustomerDetailsModel = mongoose.model('Customers', CustomerDetailsSchema);
export default CustomerDetailsModel;