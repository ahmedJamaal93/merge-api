import mongoose from 'mongoose';

const webRtcSchema = new mongoose.Schema({
    opentok: {
        api_Key: String,
        api_Secret: String
    },

    quickBlocks: {
        APPLICATION_ID: String,

        AUTH_KEY: String,

        AUTH_SECRET: String,

        ACCOUNT_KEY: String
    }


}, { timestamps: true });

export const WebRtc = mongoose.model('WebRtc', webRtcSchema);