const mongoose = require('mongoose');
const schema  = mongoose.Schema;

const ProductSchema = new schema({

    ProductName:
    {
        type: String,        
        required: true
    },
    Price:
    {
        type: Number,
        required: true
    },
    Stock:
    {
        type: Number, 
        required: true
    },
    Manufacturer:
    {
        type: String, 
        required: true
    },
    ExpairyDate:
    {
        type: Date, 
        required: true
    },
    IsFavourite:
    {
        type: Boolean,
        required: true
    }
});

ProductSchema.index({ProductName: 'text'});

module.exports = ProductModel = mongoose.model("Products", ProductSchema);