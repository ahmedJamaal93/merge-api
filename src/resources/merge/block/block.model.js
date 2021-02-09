import mongoose from 'mongoose';
const { User } = require('../../user/user.model');

const blockSchema = new mongoose.Schema({

    userId: {

        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true

    },
    blockUserId: {

        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true

    }
}, { collection: 'blocks' }, { timestamps: true });

export const Block = mongoose.model('Block', blockSchema);