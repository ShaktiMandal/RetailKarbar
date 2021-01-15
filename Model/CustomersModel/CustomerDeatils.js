const mongoose = require('mongoose');
const schema   = mongoose.Schema;

const CustomerDetailsSchema = new schema({

    CustomerName:{
        type: String,
        required: true
    },

    PhoneNumber :{
        type: Number,
        required: true
    },

    CustomerId: {
        type: String,
        required: true
    }
});

module.exports = CustomerDetailsModel = mongoose.model('Customers', CustomerDetailsSchema);