import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    sessionID: {
        type: String,

    },
    userID: {
        type: String,
        required: [true, 'Please provide UserID'],

    },
    rating: {
        type: String,
        required: [true, 'Please provide Rating From 1 to 5'],


    },
    review: {
        type: String,

    },
    callType: {
        type: String
    }

}, { collation: 'merge_review' }, { timestamps: true });

export const Review = mongoose.model('merge_review', reviewSchema);