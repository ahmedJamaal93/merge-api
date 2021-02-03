import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const { SignLanguage } = require('../signLanguage/signLanguage.model');
const { Categories } = require('../categories/categories.model');
const { Level } = require('../level/level.model');

const agentSchema = new mongoose.Schema({

    fullName: {
        type: String,
        required: true

    },
    address: {
        type: String,

    },
    phone: {
        type: String,
        required: true

    },
    categoryId: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Categories'
    }],

    levelId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Level'
    },
    signLanguageId: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'SignLanguage'
    }],

    credentials: {
        email: {
            type: String,
            trim: true,
            unique: true,

        },
        password: {
            type: String,
        }
    },
    isActive: {
        type: Boolean,
        default: false
    },
    uid: {
        type: String
    },
    profilePicUrl: {
        type: String
    },
    status: { type: String },
    language: { type: String },
    speakingLang: [{ type: String }]


}, { collection: 'ag_agents' }, { timestamps: true });

agentSchema.pre('save', function(next) {
    let pass = this.credentials.password;
    console.log(pass);
    if (!this.isModified('credentials.password')) {
        return next();
    }
    bcrypt.hash(this.credentials.password, 8, (err, hash) => {
        if (err) {
            return next(err);
        }
        this.credentials.password = hash;
        next();
    });

});
agentSchema.pre('save', function(next) {

    if (!this.isModified('credentials.password') || this.isNew) return next();

    this.passwordChangedAt = Date.now() - 1000;
    next();
});

agentSchema.methods.checkPassword = function(password) {
    console.log(this.credentials);
    const passwordHash = this.credentials.password;
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, passwordHash, (err, same) => {
            if (err) {
                console.log('error -->' + err);
                return reject(err);
            }

            resolve(same);
        });
    });
};

export const Agents = mongoose.model('Agents', agentSchema);