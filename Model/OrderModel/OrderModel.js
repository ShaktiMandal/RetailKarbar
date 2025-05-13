import mongoose from 'mongoose';

const schema = mongoose.Schema;

const OrderSchema = new schema({
    OrderId: {
        type: String,
        required: true
    },
    DueAmount: {
        type: Number,
        required: true
    },
    PaidAmount: {
        type: Number,
        required: true
    },
    Orders: {
        type: Array,
        required: true
    }
});

const OrderModel = mongoose.model('Orders', OrderSchema);
export default OrderModel;