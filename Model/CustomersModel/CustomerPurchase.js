const mongoose = require('mongoose');
const schema  = mongoose.Schema;

const CustomerPurchaseSchema = new schema({

    CustomerId:{
        type: String,
        required: true
    },

    OrderId:{
        type: String,
        required: true
    },

    PaymentMethod:{
        type: String
    },

    TotalDueAmount: {
        type: Number,
        required: true
    },

    TotalPaidAmount: {
        type: Number,
        required: true
    },

    IsDealer: {
        type: Boolean,
        required: true
    }
});

module.exports = CustomerPurchaseModel = mongoose.model('CustomerPurchase', CustomerPurchaseSchema);