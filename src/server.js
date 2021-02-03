const path = require('path');
import express from 'express';
import { json, urlencoded } from 'body-parser';
import morgan from 'morgan';
const dotenv = require('dotenv');
const fileupload = require('express-fileupload');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const http = require('http');
const https = require('https');



const cookieParser = require('cookie-parser');
const compression = require('compression');
import config from './config';
import cors from 'cors';
import { connect } from './utils/db';
const winston = require('winston');
const methodOverride = require('method-override');
const SwaggerParser = require('swagger-parser');
const colors = require('colors');
var fs = require('fs');
const privateKey  = fs.readFileSync('./src/sslcert/server.key', 'utf8');
const certificate = fs.readFileSync('./src/sslcert/server.crt', 'utf8');
const credentials = {key: privateKey, cert: certificate};
export const app = express();

// Load env vars
dotenv.config({ path: './config/config.env' });
require('./startup/logging');
require('./startup/validation')();
app.disable('x-powered-by');
app.enable('trust proxy');
app.use(methodOverride('X-HTTP-Method-Override'));

app.use(cors());
app.options('*', cors());
app.use(helmet());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));

require('./startup/routes')(app);

const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(xss());
app.use(compression());
app.use(
    fileupload({
        createParentPath: true
    })
);

// Set static folder
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join('assets')));
console.log(path.join('assets'));

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

export const start = async() => {
    try {
        await connect();
       if(config.nossl){
            httpServer.listen(config.port, () =>
            winston.info(`Merge API on http://damg.ws:${config.port}`));            
        }
        if(config.ssl){
            httpsServer.listen(config.sslport, () =>
            winston.info(`Merge API on https://damg.ws:${config.sslport}`));             
        }

      /*  app.listen(config.port, () =>
            winston.info(`OpenTok Services API on http://localhost:${config.port}/`)
        );*/
    } catch (e) {
        console.error(e);
    }
};

!fs.existsSync(`./assets/uploads`) &&
    fs.mkdirSync(`./assets/uploads`, { recursive: true });