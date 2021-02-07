import mongoose from 'mongoose';
//const { RolesKeyword } = require('../rolesKeyword / rolesKeyword.model ');
const { Business } = require('../business/business.model');
const { Agents } = require('../agents/agents.model');
const rolesSchema = new mongoose.Schema({
    roleName: {
        type: String,
        required: [true, 'Please provide Role Name'],
        enum: ["Agents", "Business", "Employee", "User", "Monitor"]
    },
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        refPath: 'roleName',
        required: [true, 'Please tell us your userId'],
        trim: true
    }
}, { timestamps: true });



export const Roles = mongoose.model('Roles', rolesSchema);