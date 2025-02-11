import mongoose from "mongoose";

const PriceSchema = new mongoose.Schema(
    {
        name: {
            type: String
        },
        price: {
            type: Number
        }
    }
)

const MenuItemSchema = new mongoose.Schema(
    {
        category: {
            type: mongoose.Types.ObjectId
        },
        itemName: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
        },
        image: {
            type: String
        },
        basePrice: {
            type: Number,
            required: true
        },
        sizes: {
            type: [PriceSchema]
        },
        ingredients: {
            type: [PriceSchema]
        }
    },
    { timestamps: true }
);

const MenuItem = mongoose.models.MenuItem || mongoose.model("MenuItem", MenuItemSchema);

export default MenuItem;
