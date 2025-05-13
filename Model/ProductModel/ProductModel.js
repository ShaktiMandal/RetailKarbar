import mongoose from 'mongoose';

const schema = mongoose.Schema;

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

const ProductModel = mongoose.model("Products", ProductSchema);
export default ProductModel;