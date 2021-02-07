import { merge } from 'lodash';
// const env = 'production';
const env = 'development';
//process.env.NODE_ENV || 'development';

const baseConfig = {
    env,
    isDev: env === 'development',
    isTest: env === 'testing',
    isProd: env == 'production',
    port: 8880,
    sslport: 2096,
    nossl: true,
    ssl: true,
    secret: "NanoTools@@@666",
    jwtSession: {
        session: false
    },
    redisPassword: "",
    secrets: {
        jwt: process.env.JWT_SECRET,
        jwtExp: '100d'
    }
};

let envConfig = {};

switch (env) {
    case 'dev':
    case 'development':
        envConfig = require('./dev').config;
        break;
    case 'prod':
    case 'production':
        envConfig = require('./prod').config;
        break;
    case 'test':
    case 'testing':
        envConfig = require('./testing').config;
        break;
    default:
        envConfig = require('./dev').config;
}

export default merge(baseConfig, envConfig);