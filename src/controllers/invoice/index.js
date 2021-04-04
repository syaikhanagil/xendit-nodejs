const { default: axios } = require("axios");
const { REQUIRED_VALUE_EMPTY } = require("../../helpers/error");
const { xenditHeaders } = require("../../helpers/headers");

exports.createInvoice = (req, res) => {
    const { external_id, payer_email, description, amount } = req.body;
    if (!external_id) {
        REQUIRED_VALUE_EMPTY.error_at = 'field external_id';
        return res.status(400).send(REQUIRED_VALUE_EMPTY);
    }
    if (!payer_email) {
        REQUIRED_VALUE_EMPTY.error_at = 'field payer_email';
        return res.status(400).send(REQUIRED_VALUE_EMPTY);
    }
    if (!description) {
        REQUIRED_VALUE_EMPTY.error_at = 'field description';
        return res.status(400).send(REQUIRED_VALUE_EMPTY);
    }
    if (!amount) {
        REQUIRED_VALUE_EMPTY.error_at = 'field amount';
        return res.status(400).send(REQUIRED_VALUE_EMPTY);
    }
    const payload = {
        external_id: external_id,
        payer_email: payer_email,
        description: description,
        amount: amount
    };
    axios({
        method: 'POST',
        url: 'https://api.xendit.co/v2/invoices',
        headers: xenditHeaders,
        data: JSON.stringify(payload)
    }).then(response => {
        return res.send(response.data)
    }).catch(err => {
        console.log(err);
        return res.status(403).send(err);
    })
};

exports.getInvoice = (req, res) => {
    const { id } = req.params;
    if (!id) {
        REQUIRED_VALUE_EMPTY.error = 'id not found';
        return res.status(400).send(REQUIRED_VALUE_EMPTY);
    }
    axios({
        method: 'GET',
        url: 'https://api.xendit.co/v2/invoices/'+id,
        headers: xenditHeaders
    }).then(response => {
        return res.send(response.data)
    }).catch(err => {
        return res.status(403).send(err);
    })
};
