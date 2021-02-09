import mongoose from 'mongoose';
const { User } = require('../../user/user.model');

const userDeviceSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    device_token: {
        type: String,
        required: true
    },
    apns_token: {
        type: String,

    },
    device_type: {
        type: Number,
        required: true,
        enum: [1, 2],
        default: 1
    },
    device_id: {
        type: String,
        unique: true,
        required: true,
    },
    device_mode: {
        type: String,
    },
    unread_count: {
        type: Number,
    },
    notified_at: {
        type: String,
    },
    lang_type: {
        type: String,
    },
}, { collection: 'userdevices' }, { timestamps: true });

export const UserDevice = mongoose.model('UserDevice', userDeviceSchema);