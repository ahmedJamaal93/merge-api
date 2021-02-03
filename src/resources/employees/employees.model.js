import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const employeeSchema = new mongoose.Schema({

    fullName: {
        type: String,
        required: [true, 'Please tell us your Full Name'],
        trim: true
    },

    credentials: {
        email: {
            type: String,
            required: [true, 'Please provide your email'],
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: [true, 'Please provide a password']
        },
        uid: {
            type: String,
            require: true
        },
    },
    isActive: {
        type: Boolean,
        default: true

    },

    phone: {
        type: String,

    },
    userType: {
        type: String,
        required: true,
        enum: ["monitor", "admin", "analysis"],
    },
    profilePicUrl: {
        type: String
    },

}, {  collection:   'mo' }, { timestamps: true });


employeeSchema.pre('save', function(next) {
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
    // Delete passwordConfirm field
    this.passwordConfirm = undefined;
});
employeeSchema.pre('save', function(next) {
    if (!this.isModified('credentials.password') || this.isNew) return next();

    this.passwordChangedAt = Date.now() - 1000;
    next();
});

employeeSchema.methods.checkPassword = function(password) {
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


export const Employees = mongoose.model('Employee', employeeSchema);