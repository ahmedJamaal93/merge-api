import mongoose from 'mongoose';
const { User } = require('../../user/user.model');

const muteNotification = new mongoose.Schema({
    user_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true

    },
    chat_id: {
        type: String,

    },
    chat_type: {
        type: String,
        enum: ["single", "group", "channel"],
        default: "single"

    }

}, { collection: 'mutenotifications' }, { timestamps: true });

export const MuteNotification = mongoose.model('MuteNotification', muteNotification);