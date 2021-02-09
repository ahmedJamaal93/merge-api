import mongoose from 'mongoose';

const SpeakingLanguageSchema = new mongoose.Schema({
    name: { type: String },
    code: { type: String },


}, { collection: 'SpeakingLanguage' }, { timestamps: true });

export const SpeakingLanguage = mongoose.model('SpeakingLanguage', SpeakingLanguageSchema);