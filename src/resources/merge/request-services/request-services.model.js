import mongoose from 'mongoose';

const requestServiceSchema = new mongoose.Schema({

    userID: {
        type: String,
        required: [true, 'Please provide UserID'],

    },
    phone: {
        type: String,
        required: [true, 'Please provide phone'],
        min: 10,
        max: 10


    },
    country_code: {
        type: String,
        required: [true, 'Please provide country code'],


    },
    status: {
        type: String,
        default: 'pending'

    }

}, { collation: 'request_service' }, { timestamps: true });

export const requestService = mongoose.model('request_service', requestServiceSchema);