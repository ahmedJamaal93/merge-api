import mongoose from 'mongoose';

const categoriesSchema = new mongoose.Schema({
    ar_name: {
        type: String,
        required: [true, 'Please provide Arabic Category Name'],
        unique: true,
    },

    en_name: {
        type: String,
        required: [true, 'Please provide English Category Name'],
        unique: true,
    },
    isActive: {
        type: Boolean,
        default: true
    }

}, { timestamps: true });

export const Categories = mongoose.model('Categories', categoriesSchema);