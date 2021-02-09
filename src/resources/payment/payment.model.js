import mongoose from 'mongoose';

const paymentGetwaySchema = new mongoose.Schema({
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

export const PaymentGetway = mongoose.model('paymentGetway', paymentGetwaySchema);