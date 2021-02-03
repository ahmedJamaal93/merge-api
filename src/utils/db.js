import mongoose from 'mongoose';
import options from '../config';
const winston = require('winston');
export const connect = (url = options.dbUrl, opts = {}) => {
  return mongoose.connect(url, {
    ...opts,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex:true,
    useUnifiedTopology: true

  }).then(() => winston.info('Connected to MongoDB...'));
};
