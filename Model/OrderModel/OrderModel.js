const mongoose = require('mongoose');
const schema   = mongoose.Schema;

const OrderDetails = new schema({

    OrderId:
    {
        type: String,
        required: true
    },

    DueAmount:
    {
        type:Number
    },

    PaidAmount:
    {
        type: Number
    },

    Orders:
    {
        type: Object,
        required: true
    }
})

module.exports = OrderDetailsModel = mongoose.model('OrderDetails', OrderDetails);