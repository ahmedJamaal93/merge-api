'use strict';
import config from '../../../config';
const crypto = require('crypto');
const axios = require('axios');
const Joi = require('@hapi/joi');
const queryString = require('query-string');

const API_PATH = config.payment.fawry.API_PATH;
const BASE_URL = config.payment.fawry.BASE_URL;
const SANDBOX_BASE_URL = config.payment.fawry.SANDBOX_URL;
const fawrySecureKey = config.payment.fawry.fawrySecureKey;

const getUrl = isSandbox => (isSandbox ? SANDBOX_BASE_URL : BASE_URL) + API_PATH;
const getSignature = (...strings) => {
    return crypto
        .createHash('sha256')
        .update(strings.join(''))
        .digest('hex');
};

const validateCallbackParams = ({ fawrySecureKey, params } = {}) => {
    const signature = getSignature(
        params.fawryRefNumber,
        params.merchantRefNum,
        params.paymentAmount,
        params.orderAmount,
        params.orderStatus,
        params.paymentMethod,
        params.paymentRefrenceNumber,
        fawrySecureKey
    );

    const { error } = Joi.assert(
        signature,
        Joi.valid(params.messageSignature),
        'Invalid Signature'
    );

    if (error) {
        throw error;
    }
    console.log(params);
    return params;
};

const init = config => {
    const { fawrySecureKey, isSandbox = false } = config;

    const schema = require('./models/init');
    const { error } = schema.validate(config);

    if (error) {
        throw error;
    }

    const request = axios.create({
        baseURL: getUrl(isSandbox),
        paramsSerializer: params => queryString.stringify(params, { encode: false })
    });

    return {
        request,
        charge: (data = {}) => {
            const schema = require('./models/charge');
            const { error, value } = schema.validate(data);

            if (error) {
                throw error;
            }

            const signature = getSignature(
                value.merchantCode,
                value.merchantRefNum,
                value.customerProfileId,
                value.paymentMethod,
                value.amount,
                value.cardToken || '',
                fawrySecureKey
            );

            return request.post('charge', {
                ...value,
                signature
            });
        },

        refund: (data = {}) => {
            const schema = require('./models/refund');
            const { error, value } = schema.validate(data);

            if (error) {
                throw error;
            }

            const signature = getSignature(
                value.merchantCode,
                value.referenceNumber,
                value.refundAmount,
                value.reason,
                fawrySecureKey
            );

            return request.post('refund', {
                ...value,
                signature
            });
        },

        status: (params = {}) => {
            const schema = require('./models/status');
            const { error, value } = schema.validate(params);

            if (error) {
                throw error;
            }

            const signature = getSignature(
                value.merchantCode,
                value.merchantRefNumber,
                fawrySecureKey
            );

            return request.get('status', {
                params: {
                    ...value,
                    signature
                }
            });
        }
    };
};

module.exports = {
    init,
    validateCallbackParams
};