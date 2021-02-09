import mongoose from 'mongoose';

const CallHistorySchema = new mongoose.Schema({
    Accepted: { type: Boolean },
    Agent_ID: { type: String },
    Agent_Name: { type: String },
    Agent_isJoined: { type: Boolean },
    Api_Key: { type: String },
    Business_ID: { type: String },
    Business_Name: { type: String },
    Business_isJoined: { type: Boolean },
    EndSession: { type: Boolean },
    Mointor_Name: { type: String },
    Mointor_isJoined: { type: Boolean },
    SessionID: { type: String },
    Time_Of_End: { type: String },
    Time_Of_Start: { type: String },
    Token: { type: String },
    UrgentState: { type: Boolean },
    User_ID: { type: String },
    User_Name: { type: String },
    User_isJoined: { type: Boolean },
    isScanned: { type: Boolean }

}, { collection: 'ag-cc-history' }, { timestamps: true });

export const CallHistory = mongoose.model('CallHistory', CallHistorySchema);