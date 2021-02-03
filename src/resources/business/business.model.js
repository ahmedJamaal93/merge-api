import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const businessSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide Business Name'],
    },
    description: {
        type: String,
        required: [true, 'Please tell us your Business Description'],
        trim: true
    },
    address: { type: String },
    contactName: { type: String },
    phone: { type: String },
    isActive: {
        type: Boolean,
        default: true
    },

    credentials: {
        email: {
            type: String,
            unique: true,
            trim: true
        },
        password: {
            type: String,
        },


    },
    isActive: {
        type: Boolean,
        default: true
    },
    profilePicUrl: {
        type: String
    },

}, { collection: 'biz' }, { timestamps: true });

businessSchema.pre('save', function(next) {
    let pass = this.credentials.password;
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
businessSchema.pre('save', function(next) {

    if (!this.isModified('credentials.password') || this.isNew) return next();

    this.passwordChangedAt = Date.now() - 1000;
    next();
});

businessSchema.methods.checkPassword = function(password) {
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
export const Business = mongoose.model('Business', businessSchema);