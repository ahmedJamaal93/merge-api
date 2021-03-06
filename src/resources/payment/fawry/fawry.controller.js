import config from '../../../config';
const fawry = require('./init');

///const fawry = require('fawry-node');
const fawrySecureKey = config.payment.fawry.fawrySecureKey;
const merchantCode = config.payment.fawry.merchantCode;
const amount = '17.20';


const fawryClient = fawry.init({
    isSandbox: true,
    fawrySecureKey
});

export const payment = async(req, res) => {
    fawryClient.charge({
            merchantCode,
            merchantRefNum: 'io5jxf3jp27kfh8m719arcqgw7izo7db',
            customerProfileId: 'ocvsydvbu2gcp528wvl64i9z5srdalg5',
            customerMobile: '012345678901',
            paymentMethod: 'PAYATFAWRY',
            currencyCode: 'EGP',
            amount,
            description: 'the charge request description',
            chargeItems: [{
                itemId: 'fk3fn9flk8et9a5t9w3c5h3oc684ivho',
                description: 'desc',
                price: amount,
                quantity: 1
            }]
        })
        .then(({ data }) => {
            console.log(data);

            return Promise.all([
                fawryClient.refund({
                    merchantCode,
                    referenceNumber: data.referenceNumber,
                    refundAmount: amount,
                    reason: 'Paid manually'
                }),

                fawryClient.status({
                    merchantCode,
                    merchantRefNumber: data.merchantRefNumber
                })
            ]);
        })
        .then(([$refund, $status]) => {
            console.log($refund.data, $status.data);
        })
        .catch(error => {
            console.log(error.response.data);
        });
};