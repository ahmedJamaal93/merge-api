const jsSHA = require("jssha");
const axios = require('axios');

export function FawryPayAtFawry() {
    let merchantCode = "1tSa6uxz2nTwlaAmt38enA==";
    let merchantRefNum = "99900642041";
    let merchant_cust_prof_id = "458626698";
    let payment_method = "PAYATFAWRY";
    let amount = "580.55";
    let merchant_sec_key = "259af31fc2f74453b3a55739b21ae9ef";
    let signature_body = merchantCode.concat(merchantCode, merchantRefNum, merchant_cust_prof_id, payment_method, amount, merchant_sec_key);
    let sha256 = new jsSHA('SHA-256', 'TEXT');
    sha256.update(signature_body);
    let hash_signature = sha256.getHash("HEX");
    axios.post('https://atfawry.fawrystaging.com/ECommerceWeb/Fawry/payments/charge', {
            'merchantCode': merchantCode,
            'merchantRefNum': merchantRefNum,
            'customerName': 'Ahmed Ali',
            'customerMobile': '01234567891',
            'customerEmail': 'example@gmail.com',
            'customerProfileId': '777777',
            'amount': '580.55',
            'paymentExpiry': '1631138400000',
            'currencyCode': 'EGP',
            'language': 'en-gb',
            'chargeItems': {
                'itemId': '897fa8e81be26df25db592e81c31c',
                'description': 'Item Description',
                'price': '580.55',
                'quantity': '1'
            },
            'signature': hash_signature,
            'payment_method': payment_method,
            'description': 'example description'
        })
        .then(response => {
            // Get Response Contents
            console.log(response);
            let type = response.data.type;
            let paymentStatus = response.data.paymentStatus;
            //
            return response;
        })
        .catch(error => {
            console.log(error.response.data)
        })
}