import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
        },
        password: {
            type: String,
            required: true,
        },
        image: {
            type: String
        },
        city: {
            type: String
        },
        country: {
            type: String
        },
        address: {
            type: String
        },
        postalCode: {
            type: String
        },
        phone: {
            type: String
        },
        isAdmin: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
