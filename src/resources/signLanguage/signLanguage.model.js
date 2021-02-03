import mongoose from 'mongoose';

const signLanguageSchema = new mongoose.Schema({
    ar_name: {
        type: String,
        required: [true, 'Please provide Arabic signLanguage Name'],

    },
    en_name: {
        type: String,
        required: [true, 'Please provide English signLanguage Name'],

    },
    isActive: {
        type: Boolean,
        default: true
    },


}, { timestamps: true });

export const SignLanguage = mongoose.model('SignLanguage', signLanguageSchema);