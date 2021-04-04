const { default: axios } = require("axios");
const QRCode = require('qrcode');
const { REQUIRED_VALUE_EMPTY } = require("../../helpers/error");
const { xenditHeaders } = require("../../helpers/headers");

exports.createQrCode = (req, res) => {
    const { external_id, type, callback_url, amount } = req.body;
    if (!external_id) {
        REQUIRED_VALUE_EMPTY.error_at = 'field external_id';
        return res.status(400).send(REQUIRED_VALUE_EMPTY);
    }
    if (!type) {
        REQUIRED_VALUE_EMPTY.error_at = 'field type';
        return res.status(400).send(REQUIRED_VALUE_EMPTY);
    }
    if (!callback_url) {
        REQUIRED_VALUE_EMPTY.error_at = 'field callback_url';
        return res.status(400).send(REQUIRED_VALUE_EMPTY);
    }
    if (!amount) {
        REQUIRED_VALUE_EMPTY.error_at = 'field amount';
        return res.status(400).send(REQUIRED_VALUE_EMPTY);
    }
    const payload = {
        external_id: external_id,
        type: type,
        callback_url: callback_url,
        amount: amount
    }
    axios({
        method: 'POST',
        url: 'https://api.xendit.co/qr_codes',
        headers: xenditHeaders,
        data: JSON.stringify(payload)
    }).then(response => {
        return res.send(response.data);
    }).catch(err => {
        return res.send(err);   
    })
}

exports.getQrCode = (req, res) => {
    const { external_id } = req.params;
    if (!external_id) {
        REQUIRED_VALUE_EMPTY.error = 'external_id not found';
        return res.status(400).send(REQUIRED_VALUE_EMPTY);
    }
    axios({
        method: 'GET',
        url: 'https://api.xendit.co/qr_codes/'+external_id,
        headers: xenditHeaders
    }).then(response => {
        return res.send(response.data);
    }).catch(err => {
        return res.send(err);   
    })
}

exports.testQrisPreview = async (req, res) => {
    const { external_id } = req.params;
    if (!external_id) {
        REQUIRED_VALUE_EMPTY.error = 'external_id not found';
        return res.status(400).send(REQUIRED_VALUE_EMPTY);
    }
    try {
        const response = await axios({
            method: 'GET',
            url: 'https://api.xendit.co/qr_codes/'+external_id,
            headers: xenditHeaders
        });
        QRCode.toDataURL(response.data.qr_string, function (err, url) {
            const html = `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Test QR</title>
            </head>
            <body>
                <div id="app">
                    <img src=${url} alt="Apa Aja"/>
                </div>
            </body>
            </html>`;
            return res.send(html);
        })
    } catch (error) {
        
    }
    
}