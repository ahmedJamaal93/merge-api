import mongoose from 'mongoose';

const levelSchema = new mongoose.Schema({
    ar_title: {
        type: String,
        required: [true, 'Please provide arabic Title'],
        unique: true,
    },
    en_title: {
        type: String,
        required: [true, 'Please provide english Title'],
        unique: true,
    }

}, { timestamps: true });

export const Level = mongoose.model('Level', levelSchema);