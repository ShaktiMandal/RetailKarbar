const mongoose = require('mongoose');
const schema  = mongoose.Schema;

const PaymentSchema =  new schema({

    CustomerId:{
        type: String,
        required: true
    },

    PaymentOrders: {
        type: Array,
        required: true
    }
});

module.exports = PaymentModel = mongoose.model('Payment', PaymentSchema);
